const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

/**
 * @swagger
 * tags:
 *   name: Pagamento
 *   description: API para processamento de pagamentos
 */

/**
 * @swagger
 * /pagamentos/processar:
 *   post:
 *     summary: Processa o pagamento de um pedido
 *     tags: [Pagamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedidoId:
 *                 type: string
 *                 description: ID do pedido a ser pago
 *               metodo:
 *                 type: string
 *                 enum: [cartao_credito, cartao_debito, mbway]
 *                 description: Método de pagamento
 *               dadosCartao:
 *                 type: object
 *                 description: Dados do cartão (para métodos cartão_credito/débito)
 *                 properties:
 *                   numero:
 *                     type: string
 *                     example: "4111111111111111"
 *                   validade:
 *                     type: string
 *                     example: "12/25"
 *                   cvv:
 *                     type: string
 *                     example: "123"
 *                   nomeNoCartao:
 *                     type: string
 *                     example: "João Silva"
 *             required:
 *               - pedidoId
 *               - metodo
 *     responses:
 *       200:
 *         description: Pagamento processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagamento:
 *                   type: object
 *                   description: Detalhes do pagamento
 *                 pedido:
 *                   type: object
 *                   description: Pedido atualizado
 *       400:
 *         description: Dados inválidos ou pedido não autorizado para pagamento
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/processar', pagamentoController.processarPagamento);

module.exports = router;
