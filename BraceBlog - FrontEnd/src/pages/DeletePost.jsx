import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../context/userContext';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';
import Loader from '../components/Loader';




const DeletePost = ({ postID }) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token || "";
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const removePost = async ({postID: id}) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        if (location.pathname == `/myposts/${currentUser._id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader message="Deleting post..." />;
  }

  return (
    <Link className="btn sm danger" onClick={() => removePost({postID})}>
      Delete
    </Link>
  );
}
DeletePost.propTypes = {
  postID: PropTypes.string
};

export default DeletePost