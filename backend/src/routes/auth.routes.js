const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario
 * @access  Public
 */
router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Por favor incluye un email válido').isEmail(),
    check(
      'password',
      'Por favor ingresa una contraseña con 6 o más caracteres'
    ).isLength({ min: 6 }),
  ],
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Autenticar usuario y obtener token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Por favor incluye un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').exists(),
  ],
  authController.login
);

/**
 * @route   GET /api/auth/me
 * @desc    Obtener información del usuario actual
 * @access  Private
 */
router.get('/me', authMiddleware.protect, authController.getMe);

/**
 * @route   PUT /api/auth/profile
 * @desc    Actualizar perfil de usuario
 * @access  Private
 */
router.put(
  '/profile',
  [
    authMiddleware.protect,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
  ],
  authController.updateProfile
);

/**
 * @route   PUT /api/auth/password
 * @desc    Cambiar contraseña
 * @access  Private
 */
router.put(
  '/password',
  [
    authMiddleware.protect,
    check('currentPassword', 'La contraseña actual es obligatoria').not().isEmpty(),
    check(
      'newPassword',
      'Por favor ingresa una nueva contraseña con 6 o más caracteres'
    ).isLength({ min: 6 }),
  ],
  authController.changePassword
);

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Solicitar restablecimiento de contraseña
 * @access  Public
 */
router.post(
  '/forgot-password',
  [check('email', 'Por favor incluye un email válido').isEmail()],
  authController.forgotPassword
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Restablecer contraseña
 * @access  Public
 */
router.post(
  '/reset-password',
  [
    check('token', 'El token es obligatorio').not().isEmpty(),
    check(
      'password',
      'Por favor ingresa una contraseña con 6 o más caracteres'
    ).isLength({ min: 6 }),
  ],
  authController.resetPassword
);

module.exports = router;
