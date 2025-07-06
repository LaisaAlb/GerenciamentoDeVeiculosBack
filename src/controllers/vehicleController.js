const prisma = require('../../prisma/client');

exports.listVehicles = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(403).json({ error: 'Usuário não autorizado' });
    }
    const vehicles = await prisma.vehicle.findMany({ where: { userId: req.user.userId } });
    res.json(vehicles);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};

exports.createVehicle = async (req, res) => {
  const { name, plate } = req.body;
  if (!name || !plate) return res.status(400).json({ error: 'Nome e placa são obrigatórios' });

  try {
    const newVehicle = await prisma.vehicle.create({ data: { name, plate, userId: req.user.userId } });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao cadastrar veículo', details: error.message });
  }
};

// Exemplos para os outros métodos — você pode seguir padrão similar:

exports.updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { name, plate } = req.body;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const vehicle = await prisma.vehicle.findFirst({
    where: { id: Number(id), userId: req.user.userId }
  });

  if (!vehicle) return res.status(403).json({ error: 'Acesso negado' });

  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: { name, plate }
    });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao editar veículo', details: error.message });
  }
};

exports.archiveVehicle = async (req, res) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findFirst({ where: { id: Number(id), userId: req.user.userId } });
  if (!vehicle) return res.status(403).json({ error: 'Acesso negado' });

  try {
    const updated = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: { status: 'inativo' }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao arquivar veículo', details: error.message });
  }
};

exports.unarchiveVehicle = async (req, res) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findFirst({ where: { id: Number(id), userId: req.user.userId } });
  if (!vehicle) return res.status(403).json({ error: 'Acesso negado' });

  try {
    const updated = await prisma.vehicle.update({
      where: { id: Number(id) },
      data: { status: 'ativo' }
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao desarquivar veículo', details: error.message });
  }
};

exports.deleteVehicle = async (req, res) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findFirst({ where: { id: Number(id), userId: req.user.userId } });
  if (!vehicle) return res.status(403).json({ error: 'Acesso negado' });

  try {
    await prisma.vehicle.delete({ where: { id: Number(id) } });
    res.json({ message: 'Veículo removido com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir veículo', details: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total = await prisma.vehicle.count({ where: { userId: req.user.userId } });
    const ativos = await prisma.vehicle.count({ where: { userId: req.user.userId, status: 'ativo' } });
    const inativos = await prisma.vehicle.count({ where: { userId: req.user.userId, status: 'inativo' } });
    res.json({ total, ativos, inativos });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas', details: error.message });
  }
};
