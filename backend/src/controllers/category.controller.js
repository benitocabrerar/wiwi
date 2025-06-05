const Category = require('../models/category.model');
const APIFeatures = require('../utils/apiFeatures');
const { AppError, catchAsync } = require('../utils/errorHandler');

/**
 * @desc    Obtener todas las categorías
 * @route   GET /api/categories
 * @access  Public
 */
exports.getAllCategories = catchAsync(async (req, res) => {
  // Ejecutar consulta con características de API
  const features = new APIFeatures(Category.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Obtener categorías
  const categories = await features.query;

  // Contar total de documentos para paginación
  const total = await Category.countDocuments();

  // Enviar respuesta
  res.status(200).json({
    status: 'success',
    results: categories.length,
    total,
    data: {
      categories,
    },
  });
});

/**
 * @desc    Obtener una categoría por ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
exports.getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('Categoría no encontrada', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

/**
 * @desc    Crear una nueva categoría
 * @route   POST /api/categories
 * @access  Private/Admin
 */
exports.createCategory = catchAsync(async (req, res) => {
  // Agregar usuario que crea la categoría
  req.body.createdBy = req.user.id;

  const category = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      category,
    },
  });
});

/**
 * @desc    Actualizar una categoría
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError('Categoría no encontrada', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

/**
 * @desc    Eliminar una categoría
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('Categoría no encontrada', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

/**
 * @desc    Obtener categorías destacadas
 * @route   GET /api/categories/featured
 * @access  Public
 */
exports.getFeaturedCategories = catchAsync(async (req, res) => {
  const limit = req.query.limit || 4;
  
  const categories = await Category.find({ featured: true })
    .limit(parseInt(limit));

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

/**
 * @desc    Obtener subcategorías
 * @route   GET /api/categories/:id/subcategories
 * @access  Public
 */
exports.getSubcategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  // Verificar si la categoría existe
  const parentCategory = await Category.findById(id);
  
  if (!parentCategory) {
    return next(new AppError('Categoría no encontrada', 404));
  }
  
  // Obtener subcategorías
  const subcategories = await Category.find({ parent: id });
  
  res.status(200).json({
    status: 'success',
    results: subcategories.length,
    data: {
      subcategories,
    },
  });
});
