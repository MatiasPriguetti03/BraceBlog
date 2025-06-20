import { useState } from 'react'
import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';



const DashBoard = () => {

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token || "";


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/users/${currentUser.id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
      setIsLoading(false);
    }
    fetchPosts();
  }, [token]);

  if (isLoading) {
    return <Loader message="Loading your posts..." />;
  }

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => (
            <article className="dashboard__post" key={post._id}>
              <div className="dashboard__post-info">
                <div className="dashboard__post-thumbnail">
                  <img
                    src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`}
                    alt=""
                  />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard__post-actions">
                <Link to={`/posts/${post._id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postID={post._id} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">No posts found.</h2>
      )}
    </section>
  );
}

export default DashBoard