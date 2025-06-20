// Función helper para manejar URLs de imágenes
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Si ya es una URL completa de Cloudinary, devolverla tal como está
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Si es una ruta relativa (imágenes antiguas), usar la URL base
  return `${import.meta.env.VITE_ASSETS_URL}/uploads/${imagePath}`;
};

// Función específica para avatares con fallback
export const getAvatarUrl = (avatarPath) => {
  // Avatar por defecto como imagen base64
  const defaultAvatar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNlMmU4ZjAiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iOCIgZmlsbD0iIzk0YTNiOCIvPgo8cGF0aCBkPSJNMTAgNDBjMC04LjI4NCA2LjcxNi0xNSAxNS0xNXMxNSA2LjcxNiAxNSAxNSIgZmlsbD0iIzk0YTNiOCIvPgo8L3N2Zz4K";

  if (!avatarPath || avatarPath === 'default-avatar.png' || avatarPath === 'generic_avatar.png') {
    return defaultAvatar;
  }
  
  // Si ya es una URL completa de Cloudinary, devolverla tal como está
  if (avatarPath.startsWith('http')) {
    return avatarPath;
  }
  
  // Si es una ruta relativa (imágenes antiguas), usar la URL base
  return `${import.meta.env.VITE_ASSETS_URL}/uploads/${avatarPath}`;
};

export default getImageUrl;
