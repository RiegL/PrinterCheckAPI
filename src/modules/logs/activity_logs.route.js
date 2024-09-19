import { Router } from 'express';
import { getAll, getById, create, remove } from './activity_logs.model.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json({ data });
  } catch (error) {
    console.error('Erro ao buscar logs de atividades:', error.message);
    res.status(500).json({ message: 'Erro ao buscar logs de atividades' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const data = await getById(req.params.id);
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: 'Log de atividade não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar log de atividade:', error.message);
    res.status(500).json({ message: 'Erro ao buscar log de atividade' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const [data] = await create(req.body);
    res.status(201).json({ data });
  } catch (error) {
    console.error('Erro ao criar log de atividade:', error.message);
    res.status(500).json({ message: 'Erro ao criar log de atividade' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const count = await remove(req.params.id);
    if (count) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ message: 'Log de atividade não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao deletar log de atividade:', error.message);
    res.status(500).json({ message: 'Erro ao deletar log de atividade' });
  }
});

export default router;
