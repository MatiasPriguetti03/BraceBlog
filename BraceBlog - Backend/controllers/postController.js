const Post = require('../models/postModel');
const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const path = require('path');
const fs = require('fs');
const {v4: uuid} = require('uuid');
const cloudinary = require('../config/cloudinary');





// =============================== CREATE POST
// POST : /api/posts/
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        const {title, description, category} = req.body;
        const creator = req.user.userId;

        if (!title || !description || !category || !req.files.thumbnail) {
            return next(new HttpError(422, 'All fields are required'));
        }

        const user = await User.findById(creator);
        if (!user) {
            return next(new HttpError(404, 'User not found'));
        }

        const {thumbnail} = req.files || {};

        if( thumbnail.size > 1024 * 1024 * 2) { // 2MB limit
            return next(new HttpError(422, 'Thumbnail size should be less than 2MB'));
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(thumbnail.tempFilePath, {
            folder: 'braceblog/posts',
            resource_type: 'auto',
            public_id: `post_${uuid()}`
        });

        const newPost = await Post.create({
            title,
            description,
            category,
            creator,
            thumbnail: uploadResult.secure_url
        });

        if (!newPost) {
            return next(new HttpError(422, 'Failed to create post'));
        }

        const userPostCount = user.posts + 1 || 1;
        await User.findByIdAndUpdate(creator, {posts: userPostCount}, {new: true});

        res.status(201).json({message: 'Post created successfully', post: newPost});
    } catch (error) {
        return next(new HttpError(error.message || 'Failed to create post', error.status || 500));
    }
}

// =============================== GET POSTs
// GET : /api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({updatedAt: -1});
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error.message || 'Failed to fetch posts', error.status || 500));
    }
}

// =============================== GET SINGLE POST
// GET : /api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError(404, 'Post not found'));
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error.message || 'Failed to fetch post', error.status || 500));
    }
}

// =============================== GET POSTS BY CATEGORY
// GET : /api/posts/categories/:category
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const {category} = req.params;
        const posts = await Post.find({category}).sort({updatedAt: -1});

        // Siempre devolver un array, incluso si está vacío
        res.status(200).json(posts);

    } catch (error) {
        console.error('Error in getCatPosts:', error);
        return next(new HttpError(error.message || 'Failed to fetch category posts', error.status || 500));
    }
}

// =============================== GET USER/AUTHOR POSTS
// GET : /api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        const {id} = req.params;
        const posts = await Post.find({creator: id}).sort({updatedAt: -1});
            
        // Siempre devolver un array, incluso si está vacío
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error in getUserPosts:', error);
        return next(new HttpError(error.message || 'Failed to fetch user posts', error.status || 500));
    }
}

// =============================== EDIT POST
// PATCH : /api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const creator = req.user.userId;
        const {title, description, category} = req.body;

        // ReactQuill has paragraph opening  and closing tag with a break tag in between so there are 11 characters in there already
        if (!title || description.length < 12 || !category) {
            return next(new HttpError(422, 'All fields are required'));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError(404, 'Post not found'));
        }

        if (post.creator.toString() !== creator) {
            return next(new HttpError(403, 'You are not authorized to edit this post'));
        }

        let thumbnail = post.thumbnail;
        if (req.files && req.files.thumbnail) {
            const {thumbnail: newThumbnail} = req.files;
            if (newThumbnail.size > 1024 * 1024 * 2) { // 2MB limit
                return next(new HttpError(422, 'Thumbnail size should be less than 2MB'));
            }

            // Extract public_id from current thumbnail URL to delete from Cloudinary
            if (post.thumbnail && post.thumbnail.includes('cloudinary.com')) {
                const publicId = post.thumbnail.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`braceblog/posts/${publicId}`);
            }

            // Upload new thumbnail to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(newThumbnail.tempFilePath, {
                folder: 'braceblog/posts',
                resource_type: 'auto',
                public_id: `post_${uuid()}`
            });

            thumbnail = uploadResult.secure_url;
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, {title, description, category, thumbnail}, {new: true});
        res.status(200).json({message: 'Post updated successfully', post: updatedPost});
    } catch (error) {
        return next(new HttpError(error.message || 'Failed to update post', error.status || 500));
    }
}

// =============================== DELETE POST
// DELETE : /api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const creator = req.user.userId;

        if (!postId) {
            return next(new HttpError(422, 'Post ID is required'));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError(404, 'Post not found'));
        }

        if (post.creator.toString() !== creator) {
            return next(new HttpError(403, 'You are not authorized to delete this post'));
        }       
        
        // Remove thumbnail from Cloudinary
        if (post.thumbnail && post.thumbnail.includes('cloudinary.com')) {
            const publicId = post.thumbnail.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`braceblog/posts/${publicId}`);
        }

        await Post.findByIdAndDelete(postId);

        const user = await User.findById(creator);
        if (user) {
            const userPostCount = user.posts - 1 || 0;
            await User.findByIdAndUpdate(creator, {posts: userPostCount}, {new: true});
        }

        res.status(200).json({message: 'Post deleted successfully'});
    } catch (error) {
        return next(new HttpError(error.message || 'Failed to delete post', error.status || 500));
    }
}

module.exports = {
    createPost,
    getPosts,
    getPost,
    getCatPosts,
    getUserPosts,
    editPost,
    deletePost
};