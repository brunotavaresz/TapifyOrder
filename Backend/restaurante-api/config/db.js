// config/db.js
const mongoose = require('mongoose');

module.exports = async () => {
  try {
    // await mongoose.connect('mongodb://localhost:27017/restaurante' );
    await mongoose.connect('mongodb://mongo:27017/mydb' );
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
};