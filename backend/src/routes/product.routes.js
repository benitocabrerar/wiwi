const express = require('express');
const { check } = require('express-validator');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Obtener todos los productos
 * @access  Public
 */
router.get('/', productController.getAllProducts);

/**
 * @route   GET /api/products/featured
 * @desc    Obtener productos destacados
 * @access  Public
 */
router.get('/featured', productController.getFeaturedProducts);

/**
 * @route   GET /api/products/category/:categoryId
 * @desc    Obtener productos por categoría
 * @access  Public
 */
router.get('/category/:categoryId', productController.getProductsByCategory);

/**
 * @route   GET /api/products/:id
 * @desc    Obtener un producto por ID
 * @access  Public
 */
router.get('/:id', productController.getProductById);

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto
 * @access  Private/Admin
 */
router.post(
  '/',
  [
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('description', 'La descripción del producto es obligatoria').not().isEmpty(),
    check('price', 'El precio del producto es obligatorio').isNumeric(),
    check('category', 'La categoría del producto es obligatoria').not().isEmpty(),
    check('images', 'Al menos una imagen es obligatoria').isArray({ min: 1 }),
    check('sku', 'El SKU del producto es obligatorio').not().isEmpty(),
  ],
  productController.createProduct
);

/**
 * @route   PUT /api/products/:id
 * @desc    Actualizar un producto
 * @access  Private/Admin
 */
router.put(
  '/:id',
  [
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
  ],
  productController.updateProduct
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Eliminar un producto
 * @access  Private/Admin
 */
router.delete(
  '/:id',
  [
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
  ],
  productController.deleteProduct
);

module.exports = router;
