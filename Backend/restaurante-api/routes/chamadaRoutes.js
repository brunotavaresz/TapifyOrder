const express = require('express');
const router = express.Router();
const chamadaController = require('../controllers/chamadaController');

/**
 * @swagger
 * tags:
 *   name: Chamadas
 *   description: Gerenciamento de chamadas de empregado
 */

/**
 * @swagger
 * /chamadas/chamar-empregado:
 *   post:
 *     summary: Cliente solicita atendimento
 *     tags: [Chamadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *               - mesa
 *             properties:
 *               clienteId:
 *                 type: string
 *                 example: "cliente123"
 *               mesa:
 *                 type: string
 *                 example: "12"
 *     responses:
 *       201:
 *         description: Chamada criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chamada'
 *       500:
 *         description: Erro ao criar chamada
 */
router.post('/chamar-empregado', chamadaController.criarChamada);

/**
 * @swagger
 * /chamadas:
 *   get:
 *     summary: Listar todas as chamadas
 *     tags: [Chamadas]
 *     responses:
 *       200:
 *         description: Lista de chamadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chamada'
 *       500:
 *         description: Erro ao buscar chamadas
 */
router.get('/', chamadaController.listarChamadas);

/**
 * @swagger
 * /chamadas/{id}/resolvido:
 *   patch:
 *     summary: Marcar chamada como resolvida
 *     tags: [Chamadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da chamada
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chamada atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chamada'
 *       404:
 *         description: Chamada não encontrada
 *       500:
 *         description: Erro ao atualizar chamada
 */
router.patch('/:id/resolvido', chamadaController.marcarResolvido);

module.exports = router;
