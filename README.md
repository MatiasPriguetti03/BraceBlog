# BraceBlog

<div align="center">
  <img src="https://github.com/user-attachments/assets/e418763c-f028-42bb-84ac-8577cd86632e" alt="Description" width="600" height="500">
  <p><em>Your ultimate destination for modern programming topics, cutting-edge technologies, and software development best practices.</em></p>
</div>

## 🚀 Features
> **⚠️ Important Note on API Response Times:** This application uses Render's free tier for hosting the backend API. On the free plan, the server automatically goes into sleep mode after periods of inactivity. When you first access the application, you may experience a **delay of up to 30 seconds** while the server "wakes up" from this dormant state. This is normal behavior and not a bug in the application. After the initial request, subsequent interactions will function
### 📝 Post Management
- **Create posts** with rich text editor (ReactQuill)
- **Edit and delete** your own posts
- **Categorization** by technologies (Frontend, Backend, AI/ML, DevOps, etc.)
- **Image upload** for thumbnails
- **Content validation** with HTML sanitization
- **Post preview** before publishing

### 👤 User System
- **User registration and authentication**
- **Customizable profiles** with avatar and bio
- **Avatar upload** with preview
- **Profile editing** (name, email, password)
- **Personal dashboard** to manage your posts

### 🔍 Navigation and Filtering
- **Homepage** with hero section and latest posts
- **Filter by programming categories**
- **Author pages** with detailed information
- **Posts by individual authors**
- **Visual search** by thumbnails

### 🔒 Security
- **JWT authentication** with protection middleware
- **Form validation** on both frontend and backend
- **HTML sanitization** to prevent XSS
- **Protected routes** for sensitive actions
- **Centralized error handling**

### 📱 Technical Features
- **React 18** with modern Hooks
- **React Router** for SPA navigation
- **Axios** for API communication
- **Context API** for global state management
- **Express.js + MongoDB** backend
- **Cloudinary** for image storage
- **Validation with express-validator**

## 🌐 Project Structure

```
BraceBlog/
├── BraceBlog-Backend/
│   ├── config/           # Configuration (Cloudinary)
│   ├── controllers/      # Controller logic
│   ├── middleware/       # Middleware (auth, validation, errors)
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── uploads/         # Static files
│   └── utils/           # Utilities
└── BraceBlog-FrontEnd/
    ├── public/          # Public files
    └── src/
        ├── components/  # Reusable components
        ├── pages/       # Main pages
        ├── context/     # Context API
        ├── utils/       # Utility functions
        ├── styles/      # CSS styles
        └── assets/      # Static resources
```

## 📚 API Endpoints

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login
- `GET /api/users/:id` - Get user
- `GET /api/users/` - Get all authors
- `POST /api/users/change-avatar` - Change avatar
- `PATCH /api/users/edit-user` - Edit profile

### Posts
- `GET /api/posts/` - Get all posts
- `POST /api/posts/` - Create post (protected)
- `GET /api/posts/:id` - Get specific post
- `PATCH /api/posts/:id` - Edit post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts/categories/:category` - Posts by category
- `GET /api/posts/users/:id` - Posts by user

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 👨‍💻 Author

**Matías Priguetti**
- GitHub: [@MatiasPriguetti03](https://github.com/MatiasPriguetti03)
- LinkedIn: [Matías Priguetti](https://www.linkedin.com/in/mat%C3%ADas-priguetti/)
