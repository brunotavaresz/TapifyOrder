const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para produtos do restaurante
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', produtoController.listarProdutos);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Obtém um produto por ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', produtoController.obterProdutoPorId);

/**
 * @swagger
 * /produtos/categoria/{categoria}:
 *   get:
 *     summary: Lista produtos por categoria
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         description: Categoria do produto
 *         schema:
 *           type: string
 *           enum: [entrada, prato principal, sobremesa, bebidas]
 *     responses:
 *       200:
 *         description: Lista de produtos na categoria
 *       400:
 *         description: Categoria inválida
 */
router.get('/categoria/:categoria', produtoController.listarProdutosPorCategoria);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - preco
 *               - categoria
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *                 description: Ingredientes separados por vírgula
 *               foto:
 *                 type: string
 *                 description: URL da imagem
 *               tempoPreparo:
 *                 type: number
 *                 description: Tempo em minutos
 *               categoria:
 *                 type: string
 *                 enum: [entrada, prato principal, sobremesa, bebidas]
 *               personalizavel:
 *                 type: boolean
 *               disponivel:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', produtoController.criarProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               descricao:
 *                 type: string
 *               foto:
 *                 type: string
 *               tempoPreparo:
 *                 type: number
 *               categoria:
 *                 type: string
 *                 enum: [entrada, prato principal, sobremesa, bebidas]
 *               personalizavel:
 *                 type: boolean
 *               disponivel:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', produtoController.atualizarProduto);

/**
 * @swagger
 * /produtos/{id}/disponibilidade:
 *   patch:
 *     summary: Altera a disponibilidade do produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               disponivel:
 *                 type: boolean
 *                 description: Define a disponibilidade. Se não fornecido, alterna o valor atual.
 *     responses:
 *       200:
 *         description: Disponibilidade atualizada
 *       404:
 *         description: Produto não encontrado
 */
router.patch('/:id/disponibilidade', produtoController.alterarDisponibilidade);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', produtoController.removerProduto);

module.exports = router;
