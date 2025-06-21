import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the styles for React Quill
import { UserContext } from '../context/userContext'
import { validateDescription } from '../utils/textUtils'
import axios from 'axios'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Uncategorized')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token || ''

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);


const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  }


  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ]
  const POST_CATEGORIES = [
    "Uncategorized",
    "Frontend",
    "Backend",
    "Full-Stack",
    "AI",
    "Devops",
    "Mobile",
    "Web3",
    "Cloud",
    "Security",
    "Database",
    "Low-Level",
  ];

  const createPost = async (e) => {
    e.preventDefault();
    
    if (!title || !category || !description || !thumbnail) {
      setError("All fields are required");
      return;
    }
    
    // Validación mejorada para la descripción
    const descriptionValidation = validateDescription(description, 10);
    if (!descriptionValidation.valid) {
      setError(descriptionValidation.message);
      return;
    }
    
    const formData = new FormData();
    formData.set('title', title);
    formData.set('category', category);
    formData.set('description', description);
    formData.set('thumbnail', thumbnail);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts/`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate(`/posts/${response.data.post._id}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create post");
    }
  }


  return (
    <section className="create-post">
      <div className="container create-post__container">
        <h2>Create Post</h2>
        {error && <div className="form__error-message">{error}</div>}
        <form action="" className="form create-post__form" onSubmit={createPost}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={modules}
            formats={formats}
            placeholder="Write your post here..."
          />          <input
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept=".png,.jpg,.jpeg"
            id="thumbnail"
            name="thumbnail"
          />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost