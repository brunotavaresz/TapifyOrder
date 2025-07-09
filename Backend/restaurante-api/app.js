const express = require('express');
const db = require('./config/db');
const produtoRoutes = require('./routes/produtoRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const chamadaRoutes = require('./routes/chamadaRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const setupSwagger = require('./swagger'); // importe o swagger

const app = express();

app.use(express.json());

app.use('/produtos', produtoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/chamadas', chamadaRoutes);
app.use('/pagamentos', pagamentoRoutes);

// Configura o Swagger na rota /api-docs
setupSwagger(app);

db();

module.exports = app;
