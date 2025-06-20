import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({id, category, title, description, authorID, thumbnail, createdAt}) => {
    // Extract plain text from HTML for preview
    const getPlainText = (html) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const plainDescription = getPlainText(description);
    const shortDescription = plainDescription.length > 145 ? `${plainDescription.substring(0, 145)}...` : plainDescription;
    const postTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title;
    return (
      <article className="post">
        <Link to={`/posts/${id}`} className="post__link">
          <div className="post__thumbnail">
            <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
          </div>
          <div className="post__content">
            <h3>{postTitle}</h3>
            <p>{shortDescription}</p>
          </div>
        </Link>
        <div className="post__footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />          <Link to={`/posts/categories/${category}`} className="category-pill">
            {category}
          </Link>
        </div>
      </article>
    );
}

PostItem.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    authorID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    thumbnail: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
}

export default PostItem