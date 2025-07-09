// models/Produto.js
const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  descricao: String,
  foto: String,
  tempoPreparo: Number,
  categoria: {
    type: String,
    enum: ['entrada', 'prato principal', 'sobremesa', 'bebidas']
  },
  personalizavel: Boolean,
  disponivel: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Produto', ProdutoSchema);