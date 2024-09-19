import { Router } from "express";
import { getAll, getById , create ,update, remove, getMe} from "./index.js";
import {authMiddleware} from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", async (_, res) => {
    const data = await getAll();
    res.status(200).json({data});
})// lista todos os usuarios
router.get("/me", authMiddleware, async (req, res) => {
    res.status(200).json({data: req.user});
})//valida o token


router.get("/:id", async (req, res) => {
    const data = await getById(req.params.id);
    res.status(200).json({data});
})// busca um usuario pelo id

router.post("/", async (req, res) => {
    const data = await create(req.body);
    res.status(200).json(data);
})// cria um novo usuario

router.put("/:id", async (req, res) => {
    const data = await update(req.params.id, req.body);
    res.status(200).json({data});
})// atualiza um usuario pelo id

router.delete("/:id", async (req, res) => {
    const data = await remove(req.params.id);
    res.status(200).json({data});
})// deleta um usuario pelo id


export default router;