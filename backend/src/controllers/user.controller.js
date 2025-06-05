const User = require('../models/user.model');
const APIFeatures = require('../utils/apiFeatures');
const { AppError, catchAsync } = require('../utils/errorHandler');

/**
 * @desc    Obtener todos los usuarios (admin)
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getAllUsers = catchAsync(async (req, res) => {
  // Ejecutar consulta con características de API
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Obtener usuarios
  const users = await features.query;

  // Contar total de documentos para paginación
  const total = await User.countDocuments();

  // Enviar respuesta
  res.status(200).json({
    status: 'success',
    results: users.length,
    total,
    data: {
      users,
    },
  });
});

/**
 * @desc    Obtener un usuario por ID (admin)
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('Usuario no encontrado', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/**
 * @desc    Crear un nuevo usuario (admin)
 * @route   POST /api/users
 * @access  Private/Admin
 */
exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError('El usuario ya existe', 400));
  }

  // Crear usuario
  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    },
  });
});

/**
 * @desc    Actualizar un usuario (admin)
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
exports.updateUser = catchAsync(async (req, res, next) => {
  // No permitir actualizar la contraseña con esta ruta
  if (req.body.password) {
    return next(
      new AppError(
        'Esta ruta no es para actualizar contraseñas. Por favor usa /api/auth/password',
        400
      )
    );
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('Usuario no encontrado', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/**
 * @desc    Eliminar un usuario (admin)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('Usuario no encontrado', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

/**
 * @desc    Actualizar avatar de usuario
 * @route   PUT /api/users/avatar
 * @access  Private
 */
exports.updateAvatar = catchAsync(async (req, res, next) => {
  if (!req.body.avatar) {
    return next(new AppError('Por favor proporciona una URL de avatar', 400));
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      avatar: user.avatar,
    },
  });
});

/**
 * @desc    Desactivar cuenta de usuario
 * @route   DELETE /api/users/me
 * @access  Private
 */
exports.deactivateAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
