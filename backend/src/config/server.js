const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { errorHandler } = require('../utils/errorHandler');

/**
 * Configurar la aplicación Express
 * @param {Object} app - Aplicación Express
 */
const configureServer = (app) => {
  // Middleware CORS
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // Middleware para parsear JSON
  app.use(express.json());
  
  // Middleware para parsear datos de formularios
  app.use(express.urlencoded({ extended: true }));
  
  // Middleware para logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
  
  // Directorio de archivos estáticos
  app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
  
  // Middleware para manejar errores
  app.use(errorHandler);
};

/**
 * Iniciar el servidor
 * @param {Object} app - Aplicación Express
 * @param {number} port - Puerto del servidor
 * @returns {Object} - Servidor HTTP
 */
const startServer = (app, port) => {
  return app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
  });
};

module.exports = {
  configureServer,
  startServer,
};
