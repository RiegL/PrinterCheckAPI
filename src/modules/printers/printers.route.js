import { Router } from "express";
import { getAll, getById, create, update, remove } from "./printers.model.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await getAll();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Erro ao buscar impressoras:", error.message);
    res.status(500).json({ message: "Erro ao buscar impressoras" });
  }
});

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

router.post("/", authMiddleware, async (req, res) => {
  try {
    const [id] = await create(req.body);
    res.status(201).json({ id });
  } catch (error) {
    console.error("Erro ao criar impressora:", error.message);
    res.status(500).json({ message: "Erro ao criar impressora" });
  }
});

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
