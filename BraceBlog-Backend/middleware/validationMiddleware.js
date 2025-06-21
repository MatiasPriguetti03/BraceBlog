const { body, validationResult } = require('express-validator');

// Función para limpiar HTML y extraer texto plano
const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').trim();
};

// Middleware de validación para posts
const validatePost = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    
    body('description')
        .custom((value) => {
            if (!value) {
                throw new Error('Description is required');
            }
            
            const plainText = stripHtml(value);
            if (plainText.length < 10) {
                throw new Error('Description must contain at least 10 characters of meaningful content');
            }
            
            if (plainText.length > 5000) {
                throw new Error('Description is too long (maximum 5000 characters)');
            }
            
            return true;
        }),
    
    body('category')
        .isIn(['Frontend', 'Backend', 'Full-Stack', 'AI', 'Devops', 'Mobile', 'Web3', 'Cloud', 'Security', 'Database', 'Low-Level', 'Uncategorized'])
        .withMessage('Invalid category selected')
];

// Middleware para verificar errores de validación
const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(422).json({
            message: 'Validation failed',
            errors: errorMessages
        });
    }
    next();
};

module.exports = {
    validatePost,
    checkValidationErrors,
    stripHtml
};
