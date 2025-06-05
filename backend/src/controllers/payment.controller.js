const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order.model');
const { AppError, catchAsync } = require('../utils/errorHandler');

/**
 * @desc    Crear intento de pago con Stripe
 * @route   POST /api/payments/stripe/create-payment-intent
 * @access  Private
 */
exports.createStripePaymentIntent = catchAsync(async (req, res, next) => {
  const { orderId } = req.body;

  // Verificar si el orderId existe
  if (!orderId) {
    return next(new AppError('El ID del pedido es obligatorio', 400));
  }

  // Buscar el pedido
  const order = await Order.findById(orderId);

  if (!order) {
    return next(new AppError('Pedido no encontrado', 404));
  }

  // Verificar si el pedido pertenece al usuario
  if (order.user.toString() !== req.user.id) {
    return next(new AppError('No tienes permiso para pagar este pedido', 403));
  }

  // Verificar si el pedido ya está pagado
  if (order.isPaid) {
    return next(new AppError('Este pedido ya está pagado', 400));
  }

  // Crear intento de pago
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalPrice * 100), // Convertir a centavos
    currency: 'usd',
    metadata: {
      orderId: order._id.toString(),
      userId: req.user.id,
    },
  });

  res.status(200).json({
    status: 'success',
    clientSecret: paymentIntent.client_secret,
  });
});

/**
 * @desc    Webhook para eventos de Stripe
 * @route   POST /api/payments/stripe/webhook
 * @access  Public
 */
exports.stripeWebhook = catchAsync(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Error en webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { orderId } = paymentIntent.metadata;

    // Actualizar el pedido
    const order = await Order.findById(orderId);
    
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: paymentIntent.id,
        status: paymentIntent.status,
        update_time: new Date().toISOString(),
        email_address: paymentIntent.receipt_email,
      };
      
      // Si es el primer pago, actualizar estado del pedido
      if (order.status === 'pendiente') {
        order.status = 'procesando';
      }
      
      await order.save();
    }
  }

  // Responder para confirmar recepción
  res.status(200).json({ received: true });
});

/**
 * @desc    Configuración de PayPal
 * @route   GET /api/payments/paypal/config
 * @access  Public
 */
exports.getPayPalConfig = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    clientId: process.env.PAYPAL_CLIENT_ID,
  });
});

/**
 * @desc    Webhook para eventos de PayPal
 * @route   POST /api/payments/paypal/webhook
 * @access  Public
 */
exports.paypalWebhook = catchAsync(async (req, res) => {
  // Implementación del webhook de PayPal
  res.status(200).json({ received: true });
});
