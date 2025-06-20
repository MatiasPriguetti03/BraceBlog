const User = require('../models/userModel');
const HttpError = require('../models/errorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');
const cloudinary = require('../config/cloudinary');

// =============================== REGISTER A NEW USER
// POST : /api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword, bio, specialty } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return next(new HttpError(422, "All fields are required."));
        }

        if ((password.trim()).length < 6) {
            return next(new HttpError(422, "Password must be at least 6 characters long."));
        }

        if (password !== confirmPassword) {
            return next(new HttpError(422, "Passwords do not match."));
        }

        const lowerEmail = email.toLowerCase();

        const existingUser = await User.findOne({ email: lowerEmail });

        if (existingUser) {
            return next(new HttpError(422, "User with this email already exists."));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            name,
            email: lowerEmail,
            password: hashedPassword
        });

        res.status(201).json({
            message: `User ${newUser.email} registered successfully.`,
        });


    } catch (error) {
        return next(new HttpError(422, "User registration failed."));
    }
}

// =============================== LOGIN A REGISTERED USER
// POST : /api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HttpError(422, "Email and password are required."));
        }

        const lowerEmail = email.toLowerCase();
        const user = await User.findOne({ email: lowerEmail });

        if (!user) {
            return next(new HttpError(422, "User with this email does not exist."));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new HttpError(422, "Invalid password."));
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: `User ${user.email} logged in successfully.`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            },
        });
    } catch (error) {
        return next(new HttpError(422, "User login failed."));
        
    }
}

// =============================== USER PROFILE
// GET : /api/users/:id
// UNPROTECTED (for public author info)
const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return next(new HttpError(422, "User ID is required."));
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return next(new HttpError(404, "User not found."));
        }

        res.status(200).json({
            message: `User profile for ${user.email} retrieved successfully.`,
            user
        });
    } catch (error) {
        return next(new HttpError(422, "Failed to retrieve user profile."));
    }
}

// =============================== CHANGE USER AVATAR (profile picture)
// POST : /api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError(422, "Avatar file is required."));
        }

        // find user by ID from database
        const user = await User.findById(req.user.userId);
        if (!user) {
            return next(new HttpError(404, "User not found."));
        }        // delete old avatar if exists
        if (user.avatar && user.avatar.includes('cloudinary.com')) {
            const publicId = user.avatar.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`braceblog/avatars/${publicId}`);
        }

        // validate avatar file
        const { avatar } = req.files;
        if (avatar.size > 1024 * 1024) { // 1MB limit
            return next(new HttpError(422, "Avatar file size exceeds 1MB."));
        }

        // Upload avatar to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(avatar.tempFilePath, {
            folder: 'braceblog/avatars',
            resource_type: 'auto',
            public_id: `avatar_${uuid()}`
        });

        // update user avatar in database
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { avatar: uploadResult.secure_url },
            { new: true }
        );
        if (!updatedUser) {
            return next(new HttpError(404, "User not found."));
        }

        res.status(200).json({
            message: "Avatar changed successfully.",
            avatar: uploadResult.secure_url
        });
    } catch (error) {
        return next(new HttpError(error));
    }
}

// =============================== EDIT USER PROFILE (from profile)
// PATCH : /api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword, bio, specialty } = req.body;

        if (!name || !email || !currentPassword) {
            return next(new HttpError(422, "Name, email, and current password are required."));
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return next(new HttpError(404, "User not found."));
        }

        const emailExist = await User.findOne({ email: email.toLowerCase() });
        if (emailExist && emailExist._id.toString() !== req.user.userId) {
            return next(new HttpError(422, "User with this email already exists."));
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return next(new HttpError(422, "Current password is incorrect."));
        }

        if (newPassword && newPassword.length < 6) {
            return next(new HttpError(422, "New password must be at least 6 characters long."));
        }        if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
            return next(new HttpError(422, "New password and confirmation do not match."));
        }

        // Solo actualizar la contraseña si se proporciona una nueva
        let updateData = { name, email, bio, specialty };
        
        if (newPassword && newPassword.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            updateData.password = hashedPassword;
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true }
        );

        res.status(200).json({
            message: "User profile updated successfully.",
            user: updatedUser
        });
    } catch (error) {
        return next(new HttpError(500, "Failed to update user profile: " + error.message));
    }
}

// =============================== GET AUTHORS
// GET : /api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');

        if (authors.length === 0) {
            return next(new HttpError(404, "No authors found."));
        }

        res.status(200).json({
            message: "Authors retrieved successfully.",
            authors
        });
    } catch (error) {
        return next(new HttpError(422, "Failed to retrieve authors."));
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    changeAvatar,
    editUser,
    getAuthors
};