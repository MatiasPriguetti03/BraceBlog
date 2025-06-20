import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Comprehensive suppression of deprecated DOM APIs warnings
const originalError = console.error;
const originalWarn = console.warn;

// Filter error messages
console.error = (...args) => {
  const message = args[0]?.toString?.() || '';
  const suppressedMessages = [
    'findDOMNode is deprecated',
    'ReactDOM.findDOMNode',
    'DOMNodeInserted',
    'MutationObserver',
    'listener for DOMNodeInserted is deprecated'
  ];
  
  if (suppressedMessages.some(msg => message.includes(msg))) {
    return;
  }
  originalError.call(console, ...args);
};

// Filter warning messages
console.warn = (...args) => {
  const message = args[0]?.toString?.() || '';
  const suppressedMessages = [
    'DOMNodeInserted',
    'listener for DOMNodeInserted',
    'MutationObserver',
    'deprecated and will be removed'
  ];
  
  if (suppressedMessages.some(msg => message.includes(msg))) {
    return;
  }
  originalWarn.call(console, ...args);
};

// Additional DOM event listener override to prevent the warning at source
if (typeof window !== 'undefined') {
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'DOMNodeInserted') {
      // Skip deprecated DOMNodeInserted listeners
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
}


import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import PostDetail from './pages/PostDetail.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Authors from './pages/Authors.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import DashBoard from './pages/DashBoard.jsx'
import AuthorPosts from './pages/AuthorPosts.jsx'
import CategoryPosts from './pages/CategoryPosts.jsx'
import DeletePost from './pages/DeletePost.jsx'

import './styles/index.css'
import UserProvider from './context/userContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout /></UserProvider>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "profile/:id", element: <UserProfile /> },
      { path: "authors", element: <Authors /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "myposts/:id", element: <DashBoard /> },
      { path: "posts/users/:id", element: <AuthorPosts /> },
      { path: "posts/categories/:category", element: <CategoryPosts /> },
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
