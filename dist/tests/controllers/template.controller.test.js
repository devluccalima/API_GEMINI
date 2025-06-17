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
const app_1 = require("./../../app");
describe("Testando rotas de template", () => {
    test("deve retornar uma lista vazia quando nenhum template foi cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get("/templates");
        expect(response.status).toEqual(200);
        expect(response.body).toEqual([]);
    }));
    test("deve retornar uma lista com um template depois de realizar o cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        const templateId = responseCreate.body.id;
        expect(responseCreate.status).toEqual(201);
        expect((0, uuid_1.validate)(templateId)).toBeTruthy();
        expect(responseCreate.body).toEqual(Object.assign(Object.assign({}, template), { id: templateId, categories: [] }));
        const responseGet = yield (0, supertest_1.default)(app_1.app).get("/templates");
        expect(responseGet.status).toEqual(200);
        expect(responseGet.body).toEqual([responseCreate.body]);
    }));
    test("deve retornar um template quando existir cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        const templateId = responseCreate.body.id;
        const responseGet = yield (0, supertest_1.default)(app_1.app).get(`/templates/${templateId}`);
        expect(responseGet.status).toEqual(200);
        expect(responseGet.body).toEqual(responseCreate.body);
    }));
    test("deve lançar uma exception de Not Found quando o template não existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        const response = yield (0, supertest_1.default)(app_1.app).get(`/templates/${templateId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Template with id ${templateId} not found`,
        });
    }));
    test("deve remover um registro cadastrado", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        expect(responseCreate.status).toEqual(201);
        const templateId = responseCreate.body.id;
        const responseDelete = yield (0, supertest_1.default)(app_1.app).delete(`/templates/${templateId}`);
        expect(responseDelete.status).toEqual(204);
        const responseGetAfterDelete = yield (0, supertest_1.default)(app_1.app).get(`/templates/${templateId}`);
        expect(responseGetAfterDelete.status).toEqual(404);
        expect(responseGetAfterDelete.body).toEqual({
            message: `Template with id ${templateId} not found`,
        });
    }));
    test("ao tentar remover um template inexistente, deve retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        const response = yield (0, supertest_1.default)(app_1.app).delete(`/templates/${templateId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Template with id ${templateId} not found`,
        });
    }));
    test("deve atualizar um template existente", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        expect(responseCreate.status).toEqual(201);
        const templateId = responseCreate.body.id;
        const templateUpdated = {
            title: "Template 2",
            content: "Conteúdo do template 2",
        };
        const responseUpdate = yield (0, supertest_1.default)(app_1.app)
            .put(`/templates/${templateId}`)
            .send(templateUpdated);
        expect(responseUpdate.status).toEqual(200);
        expect(responseUpdate.body).toEqual(Object.assign(Object.assign({}, templateUpdated), { id: templateId, categories: [] }));
    }));
    test("ao tentar atualizar um template inexistente, deve retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        const response = yield (0, supertest_1.default)(app_1.app)
            .put(`/templates/${templateId}`)
            .send({ title: "Template 1", content: "Conteúdo do template 1" });
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Template with id ${templateId} not found`,
        });
    }));
});
describe("Associando categorias a um template", () => {
    test("deve associar uma categoria a um template", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreateTemplate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        expect(responseCreateTemplate.status).toEqual(201);
        const category = {
            name: "Category 1",
        };
        const responseCreateCategory = yield (0, supertest_1.default)(app_1.app).post("/categories").send(category);
        expect(responseCreateCategory.status).toEqual(201);
        const templateId = responseCreateTemplate.body.id;
        const categoryId = responseCreateCategory.body.id;
        const responseAttachCategories = yield (0, supertest_1.default)(app_1.app)
            .post(`/templates/${templateId}/categories/${categoryId}`);
        expect(responseAttachCategories.status).toEqual(200);
        expect(responseAttachCategories.body).toStrictEqual(Object.assign(Object.assign({}, template), { id: templateId, categories: [{
                    id: responseCreateCategory.body.id,
                    name: responseCreateCategory.body.name,
                    description: responseCreateCategory.body.description
                }] }));
    }));
    test("ao tentar associar categoria a um template inexistente, deve retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const templateId = "11c8e5fd-5b1b-4099-8286-e799c64e4351";
        const categoryId = "22c8e5fd-5b1b-4099-8286-e799c64e4352";
        const response = yield (0, supertest_1.default)(app_1.app)
            .post(`/templates/${templateId}/categories/${categoryId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Template with id ${templateId} not found`,
        });
    }));
    test("ao tentar associar uma categoria inexistente a um template, deve retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreateTemplate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        const templateId = responseCreateTemplate.body.id;
        const categoryId = "22c8e5fd-5b1b-4099-8286-e799c64e4352";
        const response = yield (0, supertest_1.default)(app_1.app)
            .post(`/templates/${templateId}/categories/${categoryId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Category with id ${categoryId} not found`,
        });
    }));
});
describe("Desassociando categorias de um template", () => {
    test("deve retornar um erro quando um template não existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const categoryOne = {
            name: "Category 1",
        };
        const responseCreateCategoryOne = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(categoryOne);
        expect(responseCreateCategoryOne.status).toEqual(201);
        const templateId = "608eff7e-8498-4a45-8455-4523ce1c13e5";
        const categoryId = "108eff7e-8498-4a45-8455-4523ce1c13e1";
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/templates/${templateId}/categories/${categoryId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Template with id 608eff7e-8498-4a45-8455-4523ce1c13e5 not found`,
        });
    }));
    test("deve retornar um erro quando uma categoria não existe", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreateTemplate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        expect(responseCreateTemplate.status).toEqual(201);
        const categoryOne = {
            name: "Tag 1",
        };
        const responseCreateCategoryOne = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(categoryOne);
        expect(responseCreateCategoryOne.status).toEqual(201);
        const responseAttachCategory = yield (0, supertest_1.default)(app_1.app)
            .post(`/templates/${responseCreateTemplate.body.id}/categories/${responseCreateCategoryOne.body.id}`);
        expect(responseAttachCategory.status).toEqual(200);
        const templateId = responseCreateTemplate.body.id;
        const categoryNotExistsId = "608eff7e-8498-4a45-8455-4523ce1c13e5";
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/templates/${templateId}/categories/${categoryNotExistsId}`);
        expect(response.status).toEqual(404);
        expect(response.body).toEqual({
            message: `Category with id 608eff7e-8498-4a45-8455-4523ce1c13e5 not found`,
        });
    }));
    test("deve desassociar uma categoria existente de um template", () => __awaiter(void 0, void 0, void 0, function* () {
        const template = {
            title: "Template 1",
            content: "Conteúdo do template 1",
        };
        const responseCreateTemplate = yield (0, supertest_1.default)(app_1.app)
            .post("/templates")
            .send(template);
        expect(responseCreateTemplate.status).toEqual(201);
        const categoryOne = {
            name: "Category One",
        };
        const responseCreateCategoryOne = yield (0, supertest_1.default)(app_1.app)
            .post("/categories")
            .send(categoryOne);
        expect(responseCreateCategoryOne.status).toEqual(201);
        const categoryId = responseCreateCategoryOne.body.id;
        const responseAttachTag = yield (0, supertest_1.default)(app_1.app)
            .post(`/templates/${responseCreateTemplate.body.id}/categories/${categoryId}`);
        expect(responseAttachTag.status).toEqual(200);
        const templateId = responseCreateTemplate.body.id;
        const response = yield (0, supertest_1.default)(app_1.app)
            .delete(`/templates/${templateId}/categories/${categoryId}`);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(Object.assign(Object.assign({}, template), { id: templateId, categories: [] }));
    }));
});
