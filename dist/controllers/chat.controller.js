"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_service_1 = require("../services/chat.service");
const router = express_1.default.Router();
const handleChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt é obrigatório" });
        }
        const response = yield (0, chat_service_1.chat)(prompt);
        res.json({ response });
    }
    catch (error) {
        console.error("Erro ao processar o chat:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
// aqui está a rota correta
router.post("api/v1/chat", (req, res) => {
    res.json({ message: "Rota de chat funcionando!" });
});
exports.default = router;
