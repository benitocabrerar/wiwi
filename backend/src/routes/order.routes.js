const express = require('express');
const { check } = require('express-validator');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Proteger todas las rutas de pedidos
router.use(authMiddleware.protect);

/**
 * @route   GET /api/orders
 * @desc    Obtener todos los pedidos (admin)
 * @access  Private/Admin
 */
router.get(
  '/',
  authMiddleware.restrictTo('admin'),
  orderController.getAllOrders
);

/**
 * @route   GET /api/orders/my-orders
 * @desc    Obtener pedidos del usuario actual
 * @access  Private
 */
router.get('/my-orders', orderController.getMyOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Obtener un pedido por ID
 * @access  Private
 */
router.get('/:id', orderController.getOrderById);

/**
 * @route   POST /api/orders
 * @desc    Crear un nuevo pedido
 * @access  Private
 */
router.post(
  '/',
  [
    check('orderItems', 'Los items del pedido son obligatorios').isArray({ min: 1 }),
    check('shippingAddress', 'La dirección de envío es obligatoria').isObject(),
    check('paymentMethod', 'El método de pago es obligatorio').not().isEmpty(),
  ],
  orderController.createOrder
);

/**
 * @route   PUT /api/orders/:id/status
 * @desc    Actualizar estado de un pedido
 * @access  Private/Admin
 */
router.put(
  '/:id/status',
  [
    authMiddleware.restrictTo('admin'),
    check('status', 'El estado es obligatorio').isIn([
      'pendiente',
      'procesando',
      'enviado',
      'entregado',
      'cancelado',
    ]),
  ],
  orderController.updateOrderStatus
);

/**
 * @route   PUT /api/orders/:id/pay
 * @desc    Actualizar estado de pago de un pedido
 * @access  Private
 */
router.put(
  '/:id/pay',
  [
    check('id', 'El ID de pago es obligatorio').not().isEmpty(),
    check('status', 'El estado de pago es obligatorio').not().isEmpty(),
    check('update_time', 'La fecha de actualización es obligatoria').not().isEmpty(),
    check('email_address', 'El email es obligatorio').isEmail(),
  ],
  orderController.updateOrderToPaid
);

module.exports = router;
