import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const handleCategoryClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (    <footer>        <ul className="footer__categories">
          <li><Link to="/posts/categories/Frontend" onClick={handleCategoryClick}>Frontend</Link></li>
          <li><Link to="/posts/categories/Backend" onClick={handleCategoryClick}>Backend</Link></li>
          <li><Link to="/posts/categories/Low-Level" onClick={handleCategoryClick}>Low-Level</Link></li>
          <li><Link to="/posts/categories/Full-Stack" onClick={handleCategoryClick}>Full-Stack</Link></li>
          <li><Link to="/posts/categories/AI" onClick={handleCategoryClick}>AI</Link></li>
          <li><Link to="/posts/categories/DevOps" onClick={handleCategoryClick}>DevOps</Link></li>
          <li><Link to="/posts/categories/Mobile" onClick={handleCategoryClick}>Mobile</Link></li>
          <li><Link to="/posts/categories/Web3" onClick={handleCategoryClick}>Web3</Link></li>
          <li><Link to="/posts/categories/Cloud" onClick={handleCategoryClick}>Cloud</Link></li>
          <li><Link to="/posts/categories/Security" onClick={handleCategoryClick}>Security</Link></li>
          <li><Link to="/posts/categories/Database" onClick={handleCategoryClick}>Database</Link></li>
        </ul>
        <div className="footer__copyright">
          <small>Made with 💚 by Matías Priguetti</small>
        </div>
    </footer>
  )
}

export default Footer
