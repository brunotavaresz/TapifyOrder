const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  clienteId: String,
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: Number,
    observacao: String
  }],
  precoTotal: Number,
  status: {
    type: String,
    enum: ['pedido recebido', 'preparando', 'pronto para entrega', 'entregue'],
    default: 'pedido recebido'
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
