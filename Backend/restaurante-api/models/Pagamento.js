const mongoose = require('mongoose');

const pagamentoSchema = new mongoose.Schema({
  pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
  metodo: { type: String, enum: ['cartao_credito', 'cartao_debito', 'mbway'], required: true },
  status: { type: String, enum: ['pendente', 'aprovado', 'recusado'], default: 'pendente' },
  dataPagamento: { type: Date },
  detalhes: {
    nomeNoCartao: String,
    // não salve CVV e número completo por segurança!
    ultimaQuatroDigitos: String,
    validade: String,
  }
});

module.exports = mongoose.model('Pagamento', pagamentoSchema);
