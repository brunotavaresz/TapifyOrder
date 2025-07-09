📦 MODELS (Mongoose)
1. Produto

{
  nome: String,
  preco: Number,
  descricao: String, // ingredientes separados por ","
  foto: String,
  tempoPreparo: Number,
  categoria: { type: String, enum: ['entrada', 'prato principal', 'sobremesa', 'bebidas'] },
  personalizavel: Boolean,
  disponivel: { type: Boolean, default: true }
}

2. Carrinho

{
  clienteId: String, // ou IP, ou sessão
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: Number,
    observacao: String // opcional
  }],
  precoTotal: Number
}

3. Pedido

{
  clienteId: String,
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: Number,
    observacao: String
  }],
  precoTotal: Number,
  status: { type: String, enum: ['pedido recebido', 'preparando', 'pronto para entrega', 'entregue'], default: 'pedido recebido' },
  data: { type: Date, default: Date.now }
}

4. ChamadaEmpregado

{
  clienteId: String,
  mesa: String, // se tiver mesas, ou apenas clienteId
  status: { type: String, enum: ['ativo', 'resolvido'], default: 'ativo' },
  data: { type: Date, default: Date.now }
}

🚀 ENDPOINTS (Express)
🔸 Produtos

    POST /produtos – Criar produto

    GET /produtos – Listar todos os produtos

    GET /produtos/:id – Detalhes de um produto

    GET /produtos/categoria/:categoria – Produtos por categoria

    PUT /produtos/:id – Editar produto

    PATCH /produtos/:id/disponibilidade – Alterar disponibilidade

    DELETE /produtos/:id – Remover produto

🔸 Carrinho

    POST /carrinho – Criar novo carrinho (cliente adiciona itens)

    GET /carrinho/:clienteId – Ver carrinho atual

    PUT /carrinho/:clienteId – Modificar item do carrinho (quantidade/observação)

    DELETE /carrinho/:clienteId/item/:itemId – Remover item do carrinho

    DELETE /carrinho/:clienteId – Limpar carrinho

🔸 Pedido

    POST /pedidos – Finalizar pedido (com base no carrinho)

    GET /pedidos/cliente/:clienteId – Ver pedidos do cliente

    GET /pedidos – Ver todos os pedidos (admin)

    GET /pedidos/hoje – Pedidos do dia (admin)

    GET /pedidos/hoje/receita – Receita do dia (admin)

    GET /pedidos/status/:status – Filtrar pedidos por status

    PATCH /pedidos/:id/status – Atualizar status de pedido

    DELETE /pedidos/:id/item/:itemId – Remover item de um pedido (se permitido)

    PUT /pedidos/:id/item/:itemId – Alterar quantidade de um item

🔸 Chamada de Empregado

    POST /chamar-empregado – Cliente solicita atendimento

    GET /chamadas – Admin vê chamadas

    PATCH /chamadas/:id/resolvido – Marcar como resolvido

🧠 Lógica adicional

    Cálculo de preço total (automático ao atualizar carrinho/pedido)

    Status em tempo real: pode usar sockets ou polling no front

    Proteção mínima por clienteId/sessão
