const {Router} = require('express');
const upload = require('express-fileupload');

const {
  createPost,
  getPosts,
  getPost,
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost
} = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const { validatePost, checkValidationErrors } = require('../middleware/validationMiddleware');

const router = Router();

// Configuración para express-fileupload (solo para rutas que manejan archivos)
const uploadConfig = upload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
});

router.post('/', uploadConfig, authMiddleware, validatePost, checkValidationErrors, createPost);
router.get('/', getPosts);
router.get('/categories/:category', getCatPosts);
router.get('/users/:id', getUserPosts);
router.get('/:id', getPost);
router.patch('/:id', uploadConfig, authMiddleware, validatePost, checkValidationErrors, editPost);
router.delete('/:id', authMiddleware, deletePost);



module.exports = router;