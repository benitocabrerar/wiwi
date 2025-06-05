/**
 * Clase para manejar errores de la API
 * @extends Error
 */
class AppError extends Error {
  /**
   * Constructor
   * @param {string} message - Mensaje de error
   * @param {number} statusCode - Código de estado HTTP
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Middleware para capturar errores asíncronos
 * @param {Function} fn - Función asíncrona a ejecutar
 * @returns {Function} - Middleware que maneja errores
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * Middleware para manejar errores globales
 * @param {Error} err - Error capturado
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Modo desarrollo: enviar detalles completos del error
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } 
  // Modo producción: enviar mensaje de error simplificado
  else {
    // Errores operacionales: enviar mensaje al cliente
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } 
    // Errores de programación: no enviar detalles al cliente
    else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Algo salió mal',
      });
    }
  }
};

module.exports = {
  AppError,
  catchAsync,
  errorHandler,
};
