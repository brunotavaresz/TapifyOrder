const express = require("express")
const router = express.Router()
const carrinhoController = require("../controllers/carrinhoController")

/**
 * @swagger
 * tags:
 *   name: Carrinho
 *   description: API para gerenciamento do carrinho de compras
 */

/**
 * @swagger
 * /carrinho:
 *   post:
 *     summary: Cria um novo carrinho
 *     tags: [Carrinho]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *               - itens
 *             properties:
 *               clienteId:
 *                 type: string
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produto:
 *                       type: string
 *                       description: ID do produto
 *                     quantidade:
 *                       type: integer
 *                     observacao:
 *                       type: string
 *             example:
 *               clienteId: "cliente123"
 *               itens:
 *                 - produto: "60d21b4667d0d8992e610c85"
 *                   quantidade: 2
 *                   observacao: "Sem cebola"
 *                 - produto: "60d21b4667d0d8992e610c86"
 *                   quantidade: 1
 *     responses:
 *       201:
 *         description: Carrinho criado com sucesso
 */
router.post("/", carrinhoController.criarCarrinho)

/**
 * @swagger
 * /carrinho/{clienteId}:
 *   get:
 *     summary: Ver carrinho atual do cliente
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho encontrado
 */
router.get("/:clienteId", carrinhoController.verCarrinho)

/**
 * @swagger
 * /carrinho/{clienteId}:
 *   put:
 *     summary: Modifica um item do carrinho (quantidade/observação)
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *               observacao:
 *                 type: string
 *             example:
 *               itemId: "60d21b4f67d0d8992e610c89"
 *               quantidade: 3
 *               observacao: "Sem pimenta"
 *     responses:
 *       200:
 *         description: Carrinho atualizado
 */
router.put("/:clienteId", carrinhoController.modificarItem)

/**
 * @swagger
 * /carrinho/{clienteId}/item/{itemId}:
 *   delete:
 *     summary: Remove um item do carrinho
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removido do carrinho
 */
router.delete("/:clienteId/item/:itemId", carrinhoController.removerItem)

/**
 * @swagger
 * /carrinho/{clienteId}:
 *   delete:
 *     summary: Limpa o carrinho do cliente
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrinho limpo com sucesso
 */
router.delete("/:clienteId", carrinhoController.limparCarrinho)

/**
 * @swagger
 * /carrinho/{clienteId}/item:
 *   post:
 *     summary: Adiciona um novo item ao carrinho existente ou cria um novo carrinho se não existir
 *     tags: [Carrinho]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *               - quantidade
 *             properties:
 *               produtoId:
 *                 type: string
 *                 description: ID do produto a ser adicionado
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade do produto
 *               observacao:
 *                 type: string
 *                 description: Observação para o item (opcional)
 *             example:
 *               produtoId: "60d21b4667d0d8992e610c87"
 *               quantidade: 1
 *               observacao: "Bem passado"
 *     responses:
 *       200:
 *         description: Item adicionado/atualizado no carrinho
 *       201:
 *         description: Novo carrinho criado com o item
 */
router.post("/:clienteId/item", carrinhoController.adicionarItemAoCarrinho)

module.exports = router
