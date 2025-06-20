import React from "react";
import { useState } from "react";
import PostItem from "../components/PostItem";
import { useEffect } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`
        );
        if (!response.data || !Array.isArray(response.data)) {
          setPosts([]);
        } else {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(`Failed to fetch posts: ${error.message}`);
        setPosts([]);
      }
      setIsLoading(false);
    };

    if (category) {
      fetchPosts();
    }
  }, [category]);
  if (isLoading) {
    return (
      <section className="category-posts-page">
        <div className="container">
          <div className="loader-container">
            <Loader message="Loading category posts..." />
            <h2>Loading posts for &ldquo;{category}&rdquo;</h2>
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="category-posts-page">
        <div className="container">
          <div className="no-posts-container error-container">
            <div className="no-posts-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="no-posts-title">Oops! Something went wrong</h1>
            <p className="no-posts-description">
              {error}
            </p>
            <div className="no-posts-actions">
              <Link to="/" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Back to Home
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-secondary"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4V10H7M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (!posts || posts.length === 0) {
    return (
      <section className="category-posts-page">
        <div className="container">
          <div className="no-posts-container">
            <div className="no-posts-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor" opacity="0.3"/>
                <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="no-posts-title">No posts found in &ldquo;{category}&rdquo;</h1>
            <p className="no-posts-description">
              This category is waiting for its first post! Be the pioneer and share your knowledge with the community.
            </p>
            <div className="no-posts-actions">
              <Link to="/create" className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Create First Post
              </Link>
              <Link to="/" className="btn btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Browse All Posts
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="category-posts-page">
      <div className="container">        {/* Category Header */}
        <div className="category-header">
          <div className="category-header-content">
            <h1 className="category-title">
              Posts in &ldquo;{category}&rdquo;
            </h1>
            
            <div className="category-stats">
              <div className="stat-item">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-label">
                  post{posts.length !== 1 ? "s" : ""} found
                </span>
              </div>
              <div className="category-badge">
                {category}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="posts-section">
          <div className="posts__container">
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
        </div>
      </div>
    </section>
  );
};

export default CategoryPosts;
