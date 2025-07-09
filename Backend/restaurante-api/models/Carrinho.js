const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  clienteId: String,
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: Number,
    observacao: String
  }],
  precoTotal: Number
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
