import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { model } from './gemini';

dotenv.config();
const app = express();
const port = 3000; 
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.send('Hello, world!');
});

app.post('/api/v1/chat', async (req: Request, res: Response) => {
  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt é obrigatório!' });
  }
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ result: text });
} catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
    res.status(500).json({ error: 'Erro ao gerar conteúdo' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
