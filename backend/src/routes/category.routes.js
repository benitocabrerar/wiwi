const express = require('express');
const { check } = require('express-validator');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Obtener todas las categorías
 * @access  Public
 */
router.get('/', categoryController.getAllCategories);

/**
 * @route   GET /api/categories/featured
 * @desc    Obtener categorías destacadas
 * @access  Public
 */
router.get('/featured', categoryController.getFeaturedCategories);

/**
 * @route   GET /api/categories/:id
 * @desc    Obtener una categoría por ID
 * @access  Public
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @route   GET /api/categories/:id/subcategories
 * @desc    Obtener subcategorías
 * @access  Public
 */
router.get('/:id/subcategories', categoryController.getSubcategories);

/**
 * @route   POST /api/categories
 * @desc    Crear una nueva categoría
 * @access  Private/Admin
 */
router.post(
  '/',
  [
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    check('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    check('description', 'La descripción de la categoría es obligatoria').not().isEmpty(),
    check('image', 'La imagen de la categoría es obligatoria').not().isEmpty(),
  ],
  categoryController.createCategory
);

/**
 * @route   PUT /api/categories/:id
 * @desc    Actualizar una categoría
 * @access  Private/Admin
 */
router.put(
  '/:id',
  [
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
  ],
  categoryController.updateCategory
);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Eliminar una categoría
 * @access  Private/Admin
 */
router.delete(
  '/:id',
  [
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
  ],
  categoryController.deleteCategory
);

module.exports = router;
