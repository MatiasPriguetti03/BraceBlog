import DOMPurify from 'dompurify';

/**
 * Sanitiza HTML para prevenir ataques XSS
 * @param {string} html - HTML string a sanitizar
 * @returns {string} HTML sanitizado
 */
export const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'a', 'img'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'target'],
    ALLOW_DATA_ATTR: false
  });
};

/**
 * Extrae texto plano de HTML
 * @param {string} html - HTML string
 * @returns {string} Texto plano
 */
export const extractPlainText = (html) => {
  if (!html) return '';
  
  // Sanitizar primero
  const cleanHtml = sanitizeHtml(html);
  
  // Crear elemento temporal para extraer texto
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = cleanHtml;
  
  // Extraer texto y normalizar espacios
  const text = tempDiv.textContent || tempDiv.innerText || '';
  return text.replace(/\s+/g, ' ').trim();
};

/**
 * Trunca texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 145) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Valida contenido de descripción
 * @param {string} html - HTML de la descripción
 * @param {number} minLength - Longitud mínima del texto plano
 * @returns {object} Resultado de validación
 */
export const validateDescription = (html, minLength = 10) => {
  if (!html) {
    return { valid: false, message: 'Description is required' };
  }
  
  const plainText = extractPlainText(html);
  
  if (plainText.length < minLength) {
    return { 
      valid: false, 
      message: `Description must contain at least ${minLength} characters of meaningful content` 
    };
  }
  
  return { valid: true, message: '' };
};
