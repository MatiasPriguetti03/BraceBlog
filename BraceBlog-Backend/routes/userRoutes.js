const {Router} = require('express');
const upload = require('express-fileupload');

const {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

// Configuración para express-fileupload (solo para rutas que manejan archivos)
const uploadConfig = upload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', getAuthors);
router.post('/change-avatar', uploadConfig, authMiddleware, changeAvatar);
router.patch('/edit-user', authMiddleware, editUser);


module.exports = router;