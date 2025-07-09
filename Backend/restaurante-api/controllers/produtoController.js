const Produto = require('../models/Produto');

const categoriasPermitidas = ['entrada', 'prato principal', 'sobremesa', 'bebidas'];

exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, descricao, foto, tempoPreparo, categoria, personalizavel, disponivel } = req.body;

    if (!nome || preco === undefined || !categoria) {
      return res.status(400).json({ error: 'nome, preco e categoria são obrigatórios' });
    }

    if (!categoriasPermitidas.includes(categoria)) {
      return res.status(400).json({ error: `categoria inválida. Deve ser uma de: ${categoriasPermitidas.join(', ')}` });
    }

    const produto = new Produto({
      nome,
      preco,
      descricao,
      foto,
      tempoPreparo,
      categoria,
      personalizavel: personalizavel || false,
      disponivel: disponivel !== undefined ? disponivel : true
    });

    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obterProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarProdutosPorCategoria = async (req, res) => {
  try {
    const categoria = req.params.categoria;
    if (!categoriasPermitidas.includes(categoria)) {
      return res.status(400).json({ error: `categoria inválida. Deve ser uma de: ${categoriasPermitidas.join(', ')}` });
    }
    const produtos = await Produto.find({ categoria });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const updateData = req.body;

    if (updateData.categoria && !categoriasPermitidas.includes(updateData.categoria)) {
      return res.status(400).json({ error: `categoria inválida. Deve ser uma de: ${categoriasPermitidas.join(', ')}` });
    }

    const produto = await Produto.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.alterarDisponibilidade = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

    // Aqui toggla a disponibilidade ou pode receber um boolean no corpo para setar
    if (req.body.disponivel !== undefined) {
      produto.disponivel = req.body.disponivel;
    } else {
      produto.disponivel = !produto.disponivel;
    }

    await produto.save();
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removerProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
