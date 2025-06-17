import express, {Router, Request, Response } from "express";
import { chat } from "../services/chat.service";

const router: Router = express.Router();

const handleChat = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Prompt é obrigatório" });
      return;
    }

    const response = await chat(prompt);
    res.json({ response });
  } catch (error) {
    console.error("Erro ao processar o chat:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// aqui está a rota correta
router.post("/api/v1/chat", handleChat);

export default router;
