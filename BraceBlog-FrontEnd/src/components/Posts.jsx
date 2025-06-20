import React from 'react'

import { useState } from 'react';
import PostItem from './PostItem';
import { useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);   
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
                if (!response.data || !Array.isArray(response.data)) {
                    setPosts([]);
                } else {
                    setPosts(response?.data);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } 
            setIsLoading(false);
        }
        fetchPosts();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
      <section className="posts">
        {posts.length > 0 ? (
          <div className="container posts__container">
            {posts.map(
              ({
                _id: id,
                thumbnail,
                category,
                title,
                description,
                creator,
                createdAt,
              }) => (
                <PostItem
                  key={id}
                  id={id}
                  thumbnail={thumbnail}
                  category={category || "Uncategorized"}
                  title={title}
                  description={description}
                  authorID={creator}
                  createdAt={createdAt}
                />
              )
            )}
          </div>
        ) : (
          <h2 className="center">No posts founds</h2>
        )}
      </section>
    );
}

export default Posts