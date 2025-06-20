import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  

  // Avatar por defecto como imagen base64
  const defaultAvatar =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNlMmU4ZjAiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzk0YTNiOCIvPgo8cGF0aCBkPSJNMTAgNDBjMC04LjI4NCA2LjcxNi0xNSAxNS0xNXMxNSA2LjcxNiAxNSAxNSIgZmlsbD0iIzk0YTNiOCIvPgo8L3N2Zz4K";  // Función para obtener la URL del avatar
  const getAvatarUrl = (avatar) => {
    // Si no hay avatar o es el avatar por defecto, usar el SVG
    if (!avatar || avatar === "default-avatar.png" || avatar === "") {
      return defaultAvatar;
    }

    // Limpiar rutas incorrectas como "../uploads/" 
    const cleanAvatar = avatar.replace(/^\.\.\/uploads\//, '').replace(/^uploads\//, '');
    
    // Si después de limpiar queda "generic_avatar.png", usar el SVG por defecto
    if (cleanAvatar === "generic_avatar.png") {
      return defaultAvatar;
    }
    
    return `${import.meta.env.VITE_ASSETS_URL}/uploads/${cleanAvatar}`;
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users`
        );

        if (!response.data) {
          console.error("No data received from server");
          setAuthors([]);
        } else if (
          response.data.authors &&
          Array.isArray(response.data.authors)
        ) {
          // Backend returns { message, authors }
          setAuthors(response.data.authors);
        } else if (Array.isArray(response.data)) {
          // Fallback in case backend returns array directly
          setAuthors(response.data);
        } else {
          console.error("Invalid data format received:", response.data);
          setAuthors([]);
        }
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
      setIsLoading(false);
    };

    fetchAuthors();
  }, []);

  if (isLoading) {
    return <Loader message="Loading authors..." />;
  }

  if (error) {
    return (
      <section className="authors">
        <div className="container">
          <div className="error-container">
            <h2>Error Loading Authors</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="authors">
      <div className="container">
        <div className="authors-header">
          <h1>Meet Our Contributors</h1>
          <p>Passionate developers sharing knowledge and insights</p>
        </div>
        {authors.length > 0 ? (
          <div className="authors__container">
            {authors.map(({ _id: id, avatar, name, posts, specialty, bio }) => {
              return (
                <Link to={`/posts/users/${id}`} key={id} className="author">
                  <div className="author__avatar">
                    <img 
                      src={getAvatarUrl(avatar)} 
                      alt={`${name}'s profile`}
                      onError={(e) => {
                        e.target.src = defaultAvatar;
                      }}
                    />
                  </div>
                  <div className="author__info">
                    <h3>{name}</h3>
                    <span className="author__specialty">
                      {specialty || "Developer"}
                    </span>
                    <p className="author__bio">{bio || ""}</p>
                    <div className="author__stats">
                      <span className="author__posts">{posts} articles</span>
                      <span className="author__link">View Profile →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <h2 className="center">No authors found.</h2>
        )}
      </div>
    </section>
  );
}

export default Authors