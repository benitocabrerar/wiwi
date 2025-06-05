const mongoose = require('mongoose');

/**
 * Conectar a la base de datos MongoDB
 * @returns {Promise} Promesa de conexión a MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Cerrar la conexión a la base de datos
 * @returns {Promise} Promesa de desconexión de MongoDB
 */
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
  } catch (error) {
    console.error(`Error al cerrar la conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  closeDB,
};
