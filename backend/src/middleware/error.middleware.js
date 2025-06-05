/**
 * Middleware para el manejo centralizado de errores
 * Este middleware captura todos los errores lanzados en las rutas y controladores
 * y envía una respuesta de error formateada al cliente
 */

const errorMiddleware = (err, req, res, next) => {
  // Obtener el código de estado del error o usar 500 por defecto
  const statusCode = err.statusCode || 500;
  
  // Mensaje de error
  const message = err.message || 'Error interno del servidor';
  
  // Detalles adicionales del error (solo en desarrollo)
  const errorDetails = process.env.NODE_ENV === 'development' ? err.stack : {};
  
  // Registrar el error en la consola
  console.error(`[ERROR] ${statusCode} - ${message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
  
  // Enviar respuesta de error al cliente
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...(err.errors && { errors: err.errors }),
  });
};

// Clase personalizada para errores de la API
class ApiError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
  
  static badRequest(message, errors = null) {
    return new ApiError(message || 'Solicitud incorrecta', 400, errors);
  }
  
  static unauthorized(message) {
    return new ApiError(message || 'No autorizado', 401);
  }
  
  static forbidden(message) {
    return new ApiError(message || 'Acceso prohibido', 403);
  }
  
  static notFound(message) {
    return new ApiError(message || 'Recurso no encontrado', 404);
  }
  
  static conflict(message) {
    return new ApiError(message || 'Conflicto con el estado actual', 409);
  }
  
  static validationError(message, errors) {
    return new ApiError(message || 'Error de validación', 422, errors);
  }
  
  static internal(message) {
    return new ApiError(message || 'Error interno del servidor', 500);
  }
}

module.exports = errorMiddleware;
module.exports.ApiError = ApiError;
