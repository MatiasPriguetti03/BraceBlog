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
const authMiddleware = require('../middleware/authmiddleware');


const router = Router();

router.post('/', upload(), authMiddleware, createPost);
router.get('/', getPosts);
router.get('/categories/:category', getCatPosts);
router.get('/users/:id', getUserPosts);
router.get('/:id', getPost);
router.patch('/:id', upload(), authMiddleware, editPost);
router.delete('/:id', authMiddleware, deletePost);



module.exports = router;