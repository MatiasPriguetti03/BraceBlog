import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import Loader from '../components/Loader'
import DeletePost from './DeletePost'
import axios from 'axios'

const PostDetail = () => {
  const { id } = useParams();
  // const post = DUMMY_POSTS.find(post => post.id === id);

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        
        // Axios guarda los datos en response.data
        if (response.data) {
          setPost(response.data);
        } else {
          setError(new Error('No data received from server'));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        if (error.response) {
          // El servidor respondió con un código de error
          console.error('Error response:', error.response.data);
          setError(new Error(error.response.data.message || 'Failed to fetch post'));
        } else if (error.request) {
          // La petición se hizo pero no hubo respuesta
          console.error('No response received:', error.request);
          setError(new Error('No response from server'));
        } else {
          // Algo más salió mal
          console.error('Request error:', error.message);
          setError(new Error(error.message));
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <section className='post-detail center'>
        <div className="container post-detail__container">
          <h1>Error loading post</h1>
          <p className="error">{error.message}</p>
          <Link to="/" className="btn primary">Back to Home</Link>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className='post-detail center'>
        <div className="container post-detail__container">
          <h1>Post not found</h1>
          <Link to="/" className="btn primary">Back to Home</Link>
        </div>
      </section>
    );
  }
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
          {currentUser?.id === post?.creator && (
            <div className="post-detail__buttons">
              <Link to={`/posts/${id}/edit`} className="btn sm primary">
                Edit
              </Link>
              <DeletePost postID={id} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <div className="post-detail__thumbnail">
          <img
            src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`}
            alt={post.title}
          />
        </div>
        <div
          className="post-detail__content"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </div>
    </section>
  );
}

export default PostDetail