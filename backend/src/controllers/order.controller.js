const Order = require('../models/order.model');
const Product = require('../models/product.model');
const APIFeatures = require('../utils/apiFeatures');
const { AppError, catchAsync } = require('../utils/errorHandler');

/**
 * @desc    Obtener todos los pedidos (admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
exports.getAllOrders = catchAsync(async (req, res) => {
  // Ejecutar consulta con características de API
  const features = new APIFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Obtener pedidos
  const orders = await features.query.populate({
    path: 'user',
    select: 'name email',
  });

  // Contar total de documentos para paginación
  const total = await Order.countDocuments();

  // Enviar respuesta
  res.status(200).json({
    status: 'success',
    results: orders.length,
    total,
    data: {
      orders,
    },
  });
});

/**
 * @desc    Obtener pedidos del usuario actual
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
exports.getMyOrders = catchAsync(async (req, res) => {
  // Ejecutar consulta con características de API
  const features = new APIFeatures(
    Order.find({ user: req.user.id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Obtener pedidos
  const orders = await features.query;

  // Contar total de documentos para paginación
  const total = await Order.countDocuments({ user: req.user.id });

  // Enviar respuesta
  res.status(200).json({
    status: 'success',
    results: orders.length,
    total,
    data: {
      orders,
    },
  });
});

/**
 * @desc    Obtener un pedido por ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: 'user',
    select: 'name email',
  });

  if (!order) {
    return next(new AppError('Pedido no encontrado', 404));
  }

  // Verificar si el pedido pertenece al usuario o es admin
  if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('No tienes permiso para ver este pedido', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

/**
 * @desc    Crear un nuevo pedido
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
  } = req.body;

  // Verificar si hay items en el pedido
  if (!orderItems || orderItems.length === 0) {
    return next(new AppError('No hay items en el pedido', 400));
  }

  // Verificar stock y obtener precios actualizados
  const orderItemsWithDetails = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return next(new AppError(`Producto no encontrado: ${item.product}`, 404));
      }
      
      if (product.stock < item.quantity) {
        return next(
          new AppError(
            `No hay suficiente stock para ${product.name}. Disponible: ${product.stock}`,
            400
          )
        );
      }
      
      // Calcular precio con descuento
      const price = product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;
      
      return {
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price,
        image: product.images[0],
      };
    })
  );

  // Crear el pedido
  const order = new Order({
    user: req.user.id,
    orderItems: orderItemsWithDetails,
    shippingAddress,
    paymentMethod,
    subtotal: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
  });

  // Calcular totales
  order.calculateTotals();

  // Guardar pedido
  await order.save();

  // Actualizar stock de productos
  await Promise.all(
    orderItemsWithDetails.map(async (item) => {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    })
  );

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
});

/**
 * @desc    Actualizar estado de un pedido
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return next(new AppError('El estado es obligatorio', 400));
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Pedido no encontrado', 404));
  }

  // Actualizar estado
  order.status = status;

  // Si el estado es "entregado", actualizar fecha de entrega
  if (status === 'entregado') {
    order.deliveredAt = Date.now();
  }

  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

/**
 * @desc    Actualizar estado de pago de un pedido
 * @route   PUT /api/orders/:id/pay
 * @access  Private
 */
exports.updateOrderToPaid = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Pedido no encontrado', 404));
  }

  // Verificar si el pedido pertenece al usuario o es admin
  if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('No tienes permiso para actualizar este pedido', 403));
  }

  // Actualizar estado de pago
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  };

  // Si es el primer pago, actualizar estado del pedido
  if (order.status === 'pendiente') {
    order.status = 'procesando';
  }

  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});
