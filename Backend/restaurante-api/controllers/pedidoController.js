const Pedido = require('../models/Pedido');
const Carrinho = require('../models/Carrinho');
const Produto = require('../models/Produto');

async function calcularPrecoTotal(itens) {
  let total = 0;
  for (const item of itens) {
    const produto = await Produto.findById(item.produto);
    if (produto) {
      total += produto.preco * item.quantidade;
    }
  }
  return total;
}

exports.criarPedido = async (req, res) => {
  try {
    const { clienteId } = req.body;

    // Pega o carrinho do cliente
    const carrinho = await Carrinho.findOne({ clienteId });
    if (!carrinho || carrinho.itens.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio ou não encontrado' });
    }

    // Calcula preço total
    const precoTotal = await calcularPrecoTotal(carrinho.itens);

    // Cria o pedido com itens do carrinho
    const pedido = new Pedido({
      clienteId,
      itens: carrinho.itens,
      precoTotal,
      status: 'pedido recebido'
    });

    await pedido.save();

    // Limpa carrinho
    carrinho.itens = [];
    carrinho.precoTotal = 0;
    await carrinho.save();

    res.status(201).json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    await pedido.deleteOne(); // remove o pedido do banco

    res.status(204).send(); // sucesso sem conteúdo
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.verPedidosCliente = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ clienteId: req.params.clienteId }).populate('itens.produto');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verTodosPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('itens.produto');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verPedidosHoje = async (req, res) => {
  try {
    const hojeInicio = new Date();
    hojeInicio.setHours(0, 0, 0, 0);

    const hojeFim = new Date();
    hojeFim.setHours(23, 59, 59, 999);

    const pedidos = await Pedido.find({
      data: { $gte: hojeInicio, $lte: hojeFim }
    }).populate('itens.produto');

    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verReceitaHoje = async (req, res) => {
  try {
    const hojeInicio = new Date();
    hojeInicio.setHours(0, 0, 0, 0);

    const hojeFim = new Date();
    hojeFim.setHours(23, 59, 59, 999);

    const pedidos = await Pedido.find({
      data: { $gte: hojeInicio, $lte: hojeFim }
    });

    const receitaTotal = pedidos.reduce((acc, pedido) => acc + pedido.precoTotal, 0);

    res.json({ receitaTotal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.filtrarPorStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const pedidos = await Pedido.find({ status }).populate('itens.produto');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pedido recebido', 'preparando', 'pronto para entrega', 'entregue'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const pedido = await Pedido.findById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });

    pedido.status = status;
    await pedido.save();

    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removerItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;

    const pedido = await Pedido.findById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });

    const item = pedido.itens.id(itemId);
    if (!item) return res.status(404).json({ error: 'Item não encontrado no pedido' });

    item.remove();

    pedido.precoTotal = await calcularPrecoTotal(pedido.itens);
    await pedido.save();

    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.alterarQuantidadeItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const { quantidade } = req.body;

    if (quantidade <= 0) {
      return res.status(400).json({ error: 'Quantidade inválida' });
    }

    const pedido = await Pedido.findById(id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });

    const item = pedido.itens.id(itemId);
    if (!item) return res.status(404).json({ error: 'Item não encontrado no pedido' });

    item.quantidade = quantidade;

    pedido.precoTotal = await calcularPrecoTotal(pedido.itens);
    await pedido.save();

    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
