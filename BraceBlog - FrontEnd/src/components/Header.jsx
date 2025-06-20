import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/blog_logo.png'
import { useState, useEffect, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

import { UserContext } from '../context/userContext';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  // Accessing the UserContext to get current user data
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 800;
      setIsMobile(mobile);
      if (!mobile) {
        setIsNavOpen(true);
      } else {
        setIsNavOpen(false);
      }
    };

    handleResize(); // Call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsNavOpen(false);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={handleLinkClick}>
          <img src={logo} alt="Navbar Logo" />
        </Link>
        {(isNavOpen || !isMobile) &&
          (currentUser?.id ? (
            <ul className="nav__menu">
              <li>
                <Link to={`/profile/${currentUser.id}`} onClick={handleLinkClick}>
                  {currentUser?.name}
                </Link>
              </li>
              <li>
                <Link to="/create" onClick={handleLinkClick}>
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/authors" onClick={handleLinkClick}>
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/logout" onClick={handleLinkClick}>
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav__menu">
              <li>
                <Link to="/authors" onClick={handleLinkClick}>
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  Login
                </Link>
              </li>
            </ul>
          ))}

        {isMobile && (
          <button
            className="nav__toggle-btn"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <AiOutlineClose className="nav__toggle-icon" />
            ) : (
              <FaBars className="nav__toggle-icon" />
            )}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header