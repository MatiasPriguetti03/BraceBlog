import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

// Load the locale for time ago
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({authorID, createdAt}) => {
  const [author, setAuthor] = React.useState({});
  const [imageError, setImageError] = React.useState(false);

  // Avatar por defecto como imagen base64
  const defaultAvatar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNlMmU4ZjAiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzk0YTNiOCIvPgo8cGF0aCBkPSJNMTAgNDBjMC04LjI4NCA2LjcxNi0xNSAxNS0xNXMxNSA2LjcxNiAxNSAxNSIgZmlsbD0iIzk0YTNiOCIvPgo8L3N2Zz4K";

  // Función para obtener la URL del avatar
  const getAvatarUrl = () => {
    if (imageError) {
      return defaultAvatar;
    }
    
    if (author?.avatar && author.avatar !== 'default-avatar.png') {
      return `${import.meta.env.VITE_ASSETS_URL}/uploads/${author.avatar}`;
    }
    
    return defaultAvatar;
  };

  const handleImageError = () => {
    setImageError(true);
  };
  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data?.user || response?.data);
      } catch (error) {
        console.error("Error fetching author data:", error);

      }
    };
    
    if (authorID) {
      fetchAuthorData();
    }
  }, [authorID]); 
  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
      <div 
        className="post__author-avatar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src={getAvatarUrl()}
          alt={author?.name || "Author"}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <div className="post__author-details">
        <h5>by: {author?.name || 'Unknown Author'}</h5>
        <small>
            <ReactTimeAgo date={new Date(createdAt)} locale='en-US'/>
        </small>
      </div>
    </Link>
  );
}

PostAuthor.propTypes = {
  authorID: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostAuthor

