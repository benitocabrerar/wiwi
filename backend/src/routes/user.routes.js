const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Proteger todas las rutas de usuarios
router.use(authMiddleware.protect);

/**
 * @route   GET /api/users
 * @desc    Obtener todos los usuarios
 * @access  Private/Admin
 */
router.get(
  '/',
  authMiddleware.restrictTo('admin'),
  userController.getAllUsers
);

/**
 * @route   GET /api/users/:id
 * @desc    Obtener un usuario por ID
 * @access  Private/Admin
 */
router.get(
  '/:id',
  authMiddleware.restrictTo('admin'),
  userController.getUserById
);

/**
 * @route   POST /api/users
 * @desc    Crear un nuevo usuario
 * @access  Private/Admin
 */
router.post(
  '/',
  [
    authMiddleware.restrictTo('admin'),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Por favor incluye un email válido').isEmail(),
    check(
      'password',
      'Por favor ingresa una contraseña con 6 o más caracteres'
    ).isLength({ min: 6 }),
    check('role', 'El rol es obligatorio').isIn(['user', 'admin']),
  ],
  userController.createUser
);

/**
 * @route   PUT /api/users/:id
 * @desc    Actualizar un usuario
 * @access  Private/Admin
 */
router.put(
  '/:id',
  [
    authMiddleware.restrictTo('admin'),
    check('name', 'El nombre es obligatorio').optional().not().isEmpty(),
    check('email', 'Por favor incluye un email válido').optional().isEmail(),
    check('role', 'Rol inválido').optional().isIn(['user', 'admin']),
  ],
  userController.updateUser
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Eliminar un usuario
 * @access  Private/Admin
 */
router.delete(
  '/:id',
  authMiddleware.restrictTo('admin'),
  userController.deleteUser
);

/**
 * @route   PUT /api/users/avatar
 * @desc    Actualizar avatar de usuario
 * @access  Private
 */
router.put(
  '/avatar',
  [check('avatar', 'La URL del avatar es obligatoria').not().isEmpty()],
  userController.updateAvatar
);

/**
 * @route   DELETE /api/users/me
 * @desc    Desactivar cuenta de usuario
 * @access  Private
 */
router.delete('/me', userController.deactivateAccount);

module.exports = router;
