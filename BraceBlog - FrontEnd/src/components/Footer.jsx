import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (    <footer>        <ul className="footer__categories">
          <li><Link to="/posts/categories/Frontend">Frontend</Link></li>
          <li><Link to="/posts/categories/Backend">Backend</Link></li>
          <li><Link to="/posts/categories/Low-Level">Low-Level</Link></li>
          <li><Link to="/posts/categories/Full-Stack">Full-Stack</Link></li>
          <li><Link to="/posts/categories/AI">AI</Link></li>
          <li><Link to="/posts/categories/DevOps">DevOps</Link></li>
          <li><Link to="/posts/categories/Mobile">Mobile</Link></li>
          <li><Link to="/posts/categories/Web3">Web3</Link></li>
          <li><Link to="/posts/categories/Cloud">Cloud</Link></li>
          <li><Link to="/posts/categories/Security">Security</Link></li>
          <li><Link to="/posts/categories/Database">Database</Link></li>
        </ul>
        <div className="footer__copyright">
          <small>© 2025 CodeCraft Blog - Made with 💚 for developers worldwide</small>
        </div>
    </footer>
  )
}

export default Footer
