const express = require('express');
const { check } = require('express-validator');
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @route   POST /api/payments/stripe/create-payment-intent
 * @desc    Crear intento de pago con Stripe
 * @access  Private
 */
router.post(
  '/stripe/create-payment-intent',
  [
    authMiddleware.protect,
    check('orderId', 'El ID del pedido es obligatorio').not().isEmpty(),
  ],
  paymentController.createStripePaymentIntent
);

/**
 * @route   POST /api/payments/stripe/webhook
 * @desc    Webhook para eventos de Stripe
 * @access  Public
 */
router.post(
  '/stripe/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.stripeWebhook
);

/**
 * @route   GET /api/payments/paypal/config
 * @desc    Configuración de PayPal
 * @access  Public
 */
router.get('/paypal/config', paymentController.getPayPalConfig);

/**
 * @route   POST /api/payments/paypal/webhook
 * @desc    Webhook para eventos de PayPal
 * @access  Public
 */
router.post('/paypal/webhook', paymentController.paypalWebhook);

module.exports = router;
