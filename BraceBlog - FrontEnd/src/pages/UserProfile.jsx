import React from 'react'
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

import { FaEdit } from 'react-icons/fa';
import  { FaCheck } from 'react-icons/fa';

const UserProfile = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [error, setError] = useState("");
  const [userAvatar, setUserAvatar] = useState(""); // Avatar actual del usuario
  const [previewUrl, setPreviewUrl] = useState(""); // URL de previsualización
  
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const token = currentUser?.token || "";

  // Mover la verificación del token a useEffect
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token, navigate]);

  // Obtener datos del usuario al cargar el componente
  useEffect(() => {
    if (!token) return;
    
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.data?.user) {
          const userData = response.data.user;
          setName(userData.name || "");
          setEmail(userData.email || "");
          setUserAvatar(userData.avatar || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    };

    getUserData();
  }, [token, currentUser.id, navigate]);


  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setIsEditingAvatar(true);
      
      // Crear URL de previsualización
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  // Avatar por defecto como imagen base64
  const defaultAvatar =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNlMmU4ZjAiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzk0YTNiOCIvPgo8cGF0aCBkPSJNMTAgNDBjMC04LjI4NCA2LjcxNi0xNSAxNS0xNXMxNSA2LjcxNiAxNSAxNSIgZmlsbD0iIzk0YTNiOCIvPgo8L3N2Zz4K"; 

    // Función para obtener la URL del avatar
    const getAvatarUrl = (avatar) => {
    // Si estamos en modo edición y hay previsualización, mostrarla
    if (isEditingAvatar && previewUrl) {
      return previewUrl;
    }

    // Si no hay avatar o es el avatar por defecto, usar el SVG
    if (!avatar || avatar === "default-avatar.png" || avatar === "") {
      return defaultAvatar;
    }

    // Limpiar rutas incorrectas como "../uploads/"
    const cleanAvatar = avatar
      .replace(/^\.\.\/uploads\//, "")
      .replace(/^uploads\//, "");

    // Si después de limpiar queda "generic_avatar.png", usar el SVG por defecto
    if (cleanAvatar === "generic_avatar.png") {
      return defaultAvatar;
    }

    return `${import.meta.env.VITE_ASSETS_URL}/uploads/${cleanAvatar}`;
  };
  
  const confirmAvatarChange = async () => {
    if (!avatar) return; // No hacer nada si no hay archivo seleccionado
    
    setIsEditingAvatar(false);
    try {
      const formData = new FormData();
      formData.set("avatar", avatar);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change-avatar`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        // Actualizar el avatar del usuario con la respuesta del servidor
        setUserAvatar(response.data.avatar);
        setAvatar(""); // Limpiar el archivo temporal
        setError(""); // Limpiar errores previos
        
        // Limpiar la previsualización
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl("");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update avatar");
      setIsEditingAvatar(false); // Asegurar que se desactive el modo edición
    }
  };
  const updateUserDetails = async (e) => {
    e.preventDefault();
    if (!name || !email || !currentPassword) {
      setError("Name, email, and current password are required");
      return;
    }
    if (newPassword && newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }
    
    setError(""); // Limpiar errores previos
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/users/edit-user`,
        {
          name,
          email,
          currentPassword,
          newPassword,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );   
      
      if (response.status === 200) {
        // Actualizar el usuario en el contexto correctamente
        setCurrentUser({
          ...currentUser,
          name,
          email
        });
        
        // Limpiar campos de contraseña después de actualización exitosa
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setError("");
    
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update user details");
    }
  }

  return (
    <section className="profile">
      <div className="container profile__container">
        <div className="profile__details">
          <div className="profile__header">
            <Link
              to={`/myposts/${currentUser.id}`}
              className="btn profile__my-posts-btn"
            >
              My posts
            </Link>
          </div>          <div className={`avatar__wrapper ${isEditingAvatar ? 'editing' : ''}`}>
            <div className="profile__avatar">
              <img src={getAvatarUrl(userAvatar)} alt="" />
            </div>
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleAvatarChange}
                accept=".png,.jpg,.jpeg"
              />
              <label htmlFor="avatar" className="avatar__edit-btn">
                <FaEdit />
              </label>
            </form>
            <button
              className={`avatar__confirm-btn ${isEditingAvatar ? "active" : ""}`}
              onClick={confirmAvatarChange}
              disabled={!isEditingAvatar}
            >
              <FaCheck />
            </button>
          </div>

          <h1>{name || currentUser?.name}</h1>

          <form action="" className="form profile__form" onSubmit={updateUserDetails}>
            {" "}
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UserProfile