const mongoose = require('mongoose');

const ChamadaEmpregadoSchema = new mongoose.Schema({
  clienteId: String,
  mesa: String,
  status: {
    type: String,
    enum: ['ativo', 'resolvido'],
    default: 'ativo'
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChamadaEmpregado', ChamadaEmpregadoSchema);
