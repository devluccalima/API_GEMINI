import { model } from "../third-party/gemini";

const chat = async (prompt: string): Promise<string> => {
  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });
  const text = result.response.text();
  return text;
};

export { chat };