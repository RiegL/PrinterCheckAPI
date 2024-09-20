import { Router } from "express";
import { getAll, getById, create, update, remove } from "./printers.model.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import knex from "knex"; // Certifique-se de importar o knex se ainda não estiver

const router = Router();

// Rota para buscar impressora por serial_number
router.get('/printers/:serial_number', async (req, res) => {
  const { serial_number } = req.params;
  try {
    const printer = await knex('printers')
      .where({ serial_number })
      .first();
      
    if (printer) {
      res.json(printer);
    } else {
      res.status(404).json({ message: 'Printer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching printer', error });
  }
});

// Rota para buscar impressora por serial_number e criar um reparo
router.post('/repairs', async (req, res) => {
  const { serial_number, description, codigo_identificador } = req.body;

  try {
      // Verifica se a impressora existe
      const printer = await knex('printers')
          .where({ serial_number })
          .first();

      if (!printer) {
          return res.status(404).json({ message: 'Printer not found' });
      }

      // Cria o reparo
      const repair = {
          printer_id: printer.id,
          description,
          codigo_identificador,
          status: 'Em reparo',
          repair_date: new Date(),
      };

      const [repairId] = await createRepair(repair); // Cria o reparo

      // Atualiza a impressora
      await update(printer.id, { status: 'Em reparo' }); // Atualiza o status ou qualquer outro campo necessário

      res.status(201).json({ message: 'Repair created successfully', repairId });
  } catch (error) {
      console.error('Erro ao registrar reparo:', error.message);
      res.status(500).json({ message: 'Erro ao registrar reparo' });
  }
});


// Rota para buscar todas as impressoras
router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar impressoras:", error.message);
    res.status(500).json({ message: "Erro ao buscar impressoras" });
  }
});

// Rota para buscar impressora por ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const data = await getById(req.params.id);
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "Impressora não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao buscar impressora:", error.message);
    res.status(500).json({ message: "Erro ao buscar impressora" });
  }
});

// Rota para criar impressora
router.post("/", authMiddleware, async (req, res) => {
  try {
    const [id] = await create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error("Erro ao criar impressora:", error.message);
    res.status(500).json({ message: "Erro ao criar impressora" });
  }
});

// Rota para atualizar impressora
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const count = await update(req.params.id, req.body);
    if (count) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ message: "Impressora não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao atualizar impressora:", error.message);
    res.status(500).json({ message: "Erro ao atualizar impressora" });
  }
});

// Rota para deletar impressora
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const count = await remove(req.params.id);
    if (count) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ message: "Impressora não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao deletar impressora:", error.message);
    res.status(500).json({ message: "Erro ao deletar impressora" });
  }
});


export default router;
