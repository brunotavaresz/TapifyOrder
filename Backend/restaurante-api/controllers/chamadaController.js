const Chamada = require('../models/ChamadaEmpregado');

// POST /chamar-empregado
exports.criarChamada = async (req, res) => {
  try {
    const { clienteId, mesa } = req.body;
    const novaChamada = await Chamada.create({ clienteId, mesa });
    res.status(201).json(novaChamada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar chamada' });
  }
};

// GET /chamadas
exports.listarChamadas = async (req, res) => {
  try {
    const chamadas = await Chamada.find().sort({ data: -1 });
    res.json(chamadas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar chamadas' });
  }
};

// PATCH /chamadas/:id/resolvido
exports.marcarResolvido = async (req, res) => {
  try {
    const { id } = req.params;
    const chamada = await Chamada.findByIdAndUpdate(
      id,
      { status: 'resolvido' },
      { new: true }
    );
    if (!chamada) return res.status(404).json({ error: 'Chamada não encontrada' });
    res.json(chamada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar chamada' });
  }
};
