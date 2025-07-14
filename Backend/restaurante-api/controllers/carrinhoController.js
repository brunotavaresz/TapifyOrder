const Carrinho = require("../models/Carrinho")
const Produto = require("../models/Produto")

async function calcularPrecoTotal(itens) {
  let total = 0
  for (const item of itens) {
    const produto = await Produto.findById(item.produto)
    if (produto) {
      total += produto.preco * item.quantidade
    }
  }
  return total
}

exports.criarCarrinho = async (req, res) => {
  try {
    const { clienteId, itens } = req.body

    if (!clienteId || !Array.isArray(itens)) {
      return res.status(400).json({ error: "clienteId e itens são obrigatórios" })
    }

    const precoTotal = await calcularPrecoTotal(itens)

    const carrinho = new Carrinho({ clienteId, itens, precoTotal })
    await carrinho.save()

    res.status(201).json(carrinho)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.verCarrinho = async (req, res) => {
  try {
    const carrinho = await Carrinho.findOne({ clienteId: req.params.clienteId }).populate("itens.produto")
    if (!carrinho) return res.status(404).json({ error: "Carrinho não encontrado" })

    res.json(carrinho)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.modificarItem = async (req, res) => {
  try {
    const { clienteId } = req.params
    const { itemId, quantidade, observacao } = req.body

    if (!itemId) return res.status(400).json({ error: "itemId é obrigatório" })

    const carrinho = await Carrinho.findOne({ clienteId })
    if (!carrinho) return res.status(404).json({ error: "Carrinho não encontrado" })

    const item = carrinho.itens.id(itemId)
    if (!item) return res.status(404).json({ error: "Item não encontrado no carrinho" })

    if (quantidade !== undefined) item.quantidade = quantidade
    if (observacao !== undefined) item.observacao = observacao

    carrinho.precoTotal = await calcularPrecoTotal(carrinho.itens)
    await carrinho.save()

    // Populate product details for the response
    await carrinho.populate("itens.produto")

    res.json(carrinho)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.removerItem = async (req, res) => {
  try {
    const { clienteId, itemId } = req.params

    const carrinho = await Carrinho.findOne({ clienteId })
    if (!carrinho) return res.status(404).json({ error: "Carrinho não encontrado" })

    const item = carrinho.itens.id(itemId)
    if (!item) return res.status(404).json({ error: "Item não encontrado no carrinho" })

    carrinho.itens.pull(itemId)

    carrinho.precoTotal = await calcularPrecoTotal(carrinho.itens)
    await carrinho.save()

    res.json(carrinho)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.limparCarrinho = async (req, res) => {
  try {
    const { clienteId } = req.params

    const carrinho = await Carrinho.findOne({ clienteId })
    if (!carrinho) return res.status(404).json({ error: "Carrinho não encontrado" })

    carrinho.itens = []
    carrinho.precoTotal = 0
    await carrinho.save()

    res.json({ message: "Carrinho limpo com sucesso" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.adicionarItemAoCarrinho = async (req, res) => {
  try {
    const { clienteId } = req.params
    const { produtoId, quantidade, observacao } = req.body

    if (!produtoId || quantidade === undefined) {
      return res.status(400).json({ error: "produtoId e quantidade são obrigatórios" })
    }

    let carrinho = await Carrinho.findOne({ clienteId })

    if (!carrinho) {
      // If no cart exists, create a new one
      const produto = await Produto.findById(produtoId)
      if (!produto) return res.status(404).json({ error: "Produto não encontrado" })

      carrinho = new Carrinho({
        clienteId,
        itens: [{ produto: produtoId, quantidade, observacao }],
        precoTotal: produto.preco * quantidade,
      })
      await carrinho.save()
      // Populate product details for the response
      await carrinho.populate("itens.produto")
      return res.status(201).json(carrinho)
    }

    // Check if item already exists in cart
    const existingItem = carrinho.itens.find((item) => item.produto.toString() === produtoId)

    if (existingItem) {
      // If item exists, update its quantity
      existingItem.quantidade = quantidade // Set to new quantity, not add
      if (observacao !== undefined) existingItem.observacao = observacao // Update observation if provided
    } else {
      // If item does not exist, add it
      carrinho.itens.push({ produto: produtoId, quantidade, observacao })
    }

    carrinho.precoTotal = await calcularPrecoTotal(carrinho.itens)
    await carrinho.save()

    // Populate product details for the response
    await carrinho.populate("itens.produto")

    res.status(200).json(carrinho)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
