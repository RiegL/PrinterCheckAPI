// modules/repairs/repairs.route.js

import { Router } from 'express';
import { getAll, getById, create, update, remove } from './repairs.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await getAll();
        res.status(200).json({ data });
    } catch (error) {
        console.error('Erro ao buscar reparos:', error.message);
        res.status(500).json({ message: 'Erro ao buscar reparos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await getById(req.params.id);
        res.status(200).json({ data });
    } catch (error) {
        console.error('Erro ao buscar reparo:', error.message);
        res.status(500).json({ message: 'Erro ao buscar reparo' });
    }
});

router.post('/', async (req, res) => {
    try {
        const [data] = await create(req.body);
        res.status(201).json({ data });
    } catch (error) {
        console.error('Erro ao criar reparo:', error.message);
        res.status(500).json({ message: 'Erro ao criar reparo' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const data = await update(req.params.id, req.body);
        res.status(200).json({ data });
    } catch (error) {
        console.error('Erro ao atualizar reparo:', error.message);
        res.status(500).json({ message: 'Erro ao atualizar reparo' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await remove(req.params.id);
        res.status(200).json({ data });
    } catch (error) {
        console.error('Erro ao deletar reparo:', error.message);
        res.status(500).json({ message: 'Erro ao deletar reparo' });
    }
});

export default router;
