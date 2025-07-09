const Pedido = require('../models/Pedido');
const Pagamento = require('../models/Pagamento');

exports.processarPagamento = async (req, res) => {
  try {
    const { pedidoId, metodo, dadosCartao } = req.body;

    // Verifica se pedido existe e está no status correto
    const pedido = await Pedido.findById(pedidoId);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });

    if (pedido.status !== 'pedido recebido') {
      return res.status(400).json({ error: 'Pagamento só permitido para pedidos recebidos' });
    }

    // Aqui entraria a integração real com gateway (ex: stripe, mbway)
    // Simulação:
    const aprovado = true; // ou false conforme retorno do gateway

    const pagamento = new Pagamento({
      pedidoId,
      metodo,
      status: aprovado ? 'aprovado' : 'recusado',
      dataPagamento: aprovado ? new Date() : null,
      detalhes: {
        nomeNoCartao: dadosCartao?.nomeNoCartao,
        ultimaQuatroDigitos: dadosCartao?.numero?.slice(-4),
        validade: dadosCartao?.validade,
      }
    });

    await pagamento.save();

    if (aprovado) {
      pedido.status = 'preparando';
      await pedido.save();
    }

    res.json({ pagamento, pedido });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
