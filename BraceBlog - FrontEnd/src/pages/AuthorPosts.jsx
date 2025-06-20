import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import PostItem from '../components/PostItem';
import { useEffect } from 'react';
import Loader from '../components/Loader';
import axios from 'axios';

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);   
  const { id } = useParams();

  useEffect(() => {
      const fetchPosts = async () => {
          setIsLoading(true);
          try {
              const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/users/${id}`);
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
    }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!posts) {
    return (
      <section className="post-detail center">
        <div className="container post-detail__container">
          <h1>Post not found</h1>
          <Link to="/" className="btn primary">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({
              _id: id,
              category,
              title,
              description,
              creator,
              thumbnail,
              createdAt,
            }) => (
              <PostItem
                key={id}
                id={id}
                thumbnail={thumbnail}
                category={category}
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

export default AuthorPosts