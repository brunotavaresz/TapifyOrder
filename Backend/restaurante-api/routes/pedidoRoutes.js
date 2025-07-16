const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

/**
 * @swagger
 * tags:
 *   name: Pedido
 *   description: API para gerenciamento de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Finaliza um pedido baseado no carrinho do cliente
 *     tags: [Pedido]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: string
 *                 description: ID do cliente cujo carrinho será transformado em pedido
 *             required:
 *               - clienteId
 *             example:
 *               clienteId: "cliente123"
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Carrinho vazio ou não encontrado
 *       500:
 *         description: Erro interno
 */
router.post('/', pedidoController.criarPedido);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Deleta um pedido completo pelo ID
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser deletado
 *     responses:
 *       204:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', pedidoController.deletarPedido);


/**
 * @swagger
 * /pedidos/cliente/{clienteId}:
 *   get:
 *     summary: Lista todos os pedidos de um cliente
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/cliente/:clienteId', pedidoController.verPedidosCliente);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos (admin)
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Lista de todos os pedidos
 */
router.get('/', pedidoController.verTodosPedidos);

/**
 * @swagger
 * /pedidos/hoje:
 *   get:
 *     summary: Lista os pedidos do dia atual (admin)
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Pedidos do dia
 */
router.get('/hoje', pedidoController.verPedidosHoje);

/**
 * @swagger
 * /pedidos/hoje/receita:
 *   get:
 *     summary: Retorna a receita total dos pedidos do dia (admin)
 *     tags: [Pedido]
 *     responses:
 *       200:
 *         description: Receita total do dia
 */
router.get('/hoje/receita', pedidoController.verReceitaHoje);

/**
 * @swagger
 * /pedidos/status/{status}:
 *   get:
 *     summary: Filtra pedidos pelo status
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: ['pedido recebido', 'preparando', 'pronto para entrega', 'entregue']
 *         required: true
 *         description: Status do pedido
 *     responses:
 *       200:
 *         description: Lista de pedidos filtrados
 */
router.get('/status/:status', pedidoController.filtrarPorStatus);

/**
 * @swagger
 * /pedidos/{id}/status:
 *   patch:
 *     summary: Atualiza o status de um pedido
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['pedido recebido', 'preparando', 'pronto para entrega', 'entregue']
 *             example:
 *               status: "preparando"
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       400:
 *         description: Status inválido
 *       404:
 *         description: Pedido não encontrado
 */
router.patch('/:id/status', pedidoController.atualizarStatus);

/**
 * @swagger
 * /pedidos/{id}/item/{itemId}:
 *   delete:
 *     summary: Remove um item de um pedido
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item no pedido
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       404:
 *         description: Pedido ou item não encontrado
 */
router.delete('/:id/item/:itemId', pedidoController.removerItem);

/**
 * @swagger
 * /pedidos/{id}/item/{itemId}:
 *   put:
 *     summary: Altera a quantidade de um item no pedido
 *     tags: [Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item no pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: integer
 *             example:
 *               quantidade: 3
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       400:
 *         description: Quantidade inválida
 *       404:
 *         description: Pedido ou item não encontrado
 */
router.put('/:id/item/:itemId', pedidoController.alterarQuantidadeItem);

module.exports = router;
