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
const supertest_1 = __importDefault(require("supertest"));
const uuid_1 = require("uuid");
const app_1 = require("../../app");
describe("Testando rotas de categories", () => {
    test("deve retornar uma lista vazia quando nenhuma categoria foi cadastrada", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/categories");
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([]);
    }));
    test("deve retornar uma lista com uma categoria depois de realizar o cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Categoria",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(category);
        const categoryId = responseCreate.body.id;
        expect(responseCreate.status).toEqual(201);
        expect((0, uuid_1.validate)(categoryId)).toBeTruthy();
        expect(responseCreate.body).toEqual(Object.assign(Object.assign({}, category), { id: categoryId, description: "", templates: [] }));
        const responseGet = yield (0, supertest_1.default)(app_1.app).get("/categories");
        expect(responseGet.status).toEqual(200);
        expect(responseGet.body).toEqual([responseCreate.body]);
    }));
    test("deve retornar uma categoria quando existir cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Categoria",
            description: "Descrição da Categoria",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(category);
        const categoryId = responseCreate.body.id;
        const responseGet = yield (0, supertest_1.default)(app_1.app).get(`/categories/${categoryId}`);
        expect(responseGet.status).toEqual(200);
        expect(responseGet.body).toEqual(responseCreate.body);
    }));
    test("deve lançar uma exception de Not Found quando a categoria não existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        const response = yield (0, supertest_1.default)(app_1.app).get(`/categories/${categoryId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Category with id ${categoryId} not found`,
        });
    }));
    test("deve remover um registro cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Categoria",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(category);
        const categoryId = responseCreate.body.id;
        const responseGet = yield (0, supertest_1.default)(app_1.app).get(`/categories/${categoryId}`);
        expect(responseGet.status).toEqual(200);
        expect(responseGet.body).toEqual(responseCreate.body);
        const responseDelete = yield (0, supertest_1.default)(app_1.app).delete(`/categories/${categoryId}`);
        expect(responseDelete.status).toEqual(204);
        const responseGetAfterDelete = yield (0, supertest_1.default)(app_1.app).get(`/categories/${categoryId}`);
        expect(responseGetAfterDelete.status).toEqual(404);
        expect(responseGetAfterDelete.body).toEqual({
            message: `Category with id ${categoryId} not found`,
        });
    }));
    test("ao tentar remover uma categoria inexistente, deve retornar um status 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        const response = yield (0, supertest_1.default)(app_1.app).delete(`/categories/${categoryId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Category with id ${categoryId} not found`,
        });
    }));
    test("deve atualizar uma categoria cadastrada", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Categoria",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(category);
        expect(responseCreate.status).toEqual(201);
        const categoryId = responseCreate.body.id;
        const categoryUpdated = {
            name: "Categoria atualizada",
            description: "Descrição da categoria atualizada",
        };
        const responseUpdate = yield (0, supertest_1.default)(app_1.app)
            .put(`/categories/${categoryId}`)
            .send(categoryUpdated);
        expect(responseUpdate.status).toEqual(200);
        expect(responseUpdate.body).toEqual(Object.assign(Object.assign({}, categoryUpdated), { id: categoryId, templates: [] }));
        const responseGet = yield (0, supertest_1.default)(app_1.app).get(`/categories/${categoryId}`);
        expect(responseGet.status).toEqual(200);
        expect(responseGet.body).toEqual(responseUpdate.body);
    }));
    test("deve deixar description como vazio caso o campo não seja informado na atualização", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Categoria",
            description: "Descrição da categoria",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(category);
        expect(responseCreate.status).toEqual(201);
        const categoryId = responseCreate.body.id;
        const categoryUpdated = {
            name: "Categoria atualizada",
        };
        const responseUpdate = yield (0, supertest_1.default)(app_1.app)
            .put(`/categories/${categoryId}`)
            .send(categoryUpdated);
        expect(responseUpdate.status).toEqual(200);
        expect(responseUpdate.body).toEqual({
            id: categoryId,
            name: "Categoria atualizada",
            description: "",
            templates: []
        });
        const responseGet = yield (0, supertest_1.default)(app_1.app).get(`/categories/${categoryId}`);
        expect(responseGet.status).toEqual(200);
        expect(responseGet.body).toEqual(responseUpdate.body);
    }));
});
