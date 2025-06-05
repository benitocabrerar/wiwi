const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Middleware para proteger rutas y verificar autenticación
 */
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Verificar si hay token en los headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];
    }

    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({
        message: 'No estás autenticado. Por favor inicia sesión',
      });
    }

    try {
      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar usuario
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          message: 'El token ya no es válido',
        });
      }

      // Verificar si el usuario está activo
      if (!user.active) {
        return res.status(401).json({
          message: 'Esta cuenta ha sido desactivada',
        });
      }

      // Agregar usuario a la request
      req.user = {
        id: user._id,
        role: user.role,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token inválido o expirado',
      });
    }
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(500).json({
      message: 'Error en la autenticación',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Middleware para restringir acceso según roles
 * @param  {...String} roles - Roles permitidos
 */
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Verificar si el rol del usuario está en los roles permitidos
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'No tienes permiso para realizar esta acción',
      });
    }

    next();
  };
};
