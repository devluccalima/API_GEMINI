import supertest from "supertest";
import { app } from "../src/app"; // caminho pro seu app

describe("Testes de integração - Templates", () => {
  test("GET /templates deve retornar lista vazia", async () => {
    const res = await supertest(app).get("/templates");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test("POST /templates deve criar e retornar um template", async () => {
    const newTemplate = {
      title: "Meu template",
      content: "Conteúdo top",
    };

    const res = await supertest(app).post("/templates").send(newTemplate);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newTemplate);
    expect(res.body.id).toBeDefined();
  });
});
