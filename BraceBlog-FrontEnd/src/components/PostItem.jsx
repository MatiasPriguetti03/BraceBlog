import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import { getImageUrl } from '../utils/imageUtils'
import { extractPlainText, truncateText } from '../utils/textUtils'

const PostItem = ({id, category, title, description, authorID, thumbnail, createdAt}) => {
    const plainDescription = extractPlainText(description);
    const shortDescription = truncateText(plainDescription, 145);
    const postTitle = title.length > 50 ? `${title.substring(0, 50)}...` : title;
    return (
      <article className="post">
        <Link to={`/posts/${id}`} className="post__link">
          <div className="post__thumbnail">
            <img src={getImageUrl(thumbnail)} alt={title} />
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