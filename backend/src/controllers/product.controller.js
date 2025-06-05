const Product = require('../models/product.model');
const APIFeatures = require('../utils/apiFeatures');
const { AppError, catchAsync } = require('../utils/errorHandler');

/**
 * @desc    Obtener todos los productos
 * @route   GET /api/products
 * @access  Public
 */
exports.getAllProducts = catchAsync(async (req, res) => {
  // Ejecutar consulta con características de API
  const features = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Obtener productos
  const products = await features.query.populate('category', 'name');

  // Contar total de documentos para paginación
  const total = await Product.countDocuments();

  // Enviar respuesta
  res.status(200).json({
    status: 'success',
    results: products.length,
    total,
    data: {
      products,
    },
  });
});

/**
 * @desc    Obtener un producto por ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');

  if (!product) {
    return next(new AppError('Producto no encontrado', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

/**
 * @desc    Crear un nuevo producto
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = catchAsync(async (req, res) => {
  // Agregar usuario que crea el producto
  req.body.createdBy = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

/**
 * @desc    Actualizar un producto
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('Producto no encontrado', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

/**
 * @desc    Eliminar un producto
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('Producto no encontrado', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

/**
 * @desc    Obtener productos destacados
 * @route   GET /api/products/featured
 * @access  Public
 */
exports.getFeaturedProducts = catchAsync(async (req, res) => {
  const limit = req.query.limit || 8;
  
  const products = await Product.find({ featured: true })
    .limit(parseInt(limit))
    .populate('category', 'name');

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});

/**
 * @desc    Obtener productos por categoría
 * @route   GET /api/products/category/:categoryId
 * @access  Public
 */
exports.getProductsByCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  
  // Ejecutar consulta con características de API
  const features = new APIFeatures(
    Product.find({ category: categoryId }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Obtener productos
  const products = await features.query.populate('category', 'name');

  // Contar total de documentos para paginación
  const total = await Product.countDocuments({ category: categoryId });

  res.status(200).json({
    status: 'success',
    results: products.length,
    total,
    data: {
      products,
    },
  });
});
