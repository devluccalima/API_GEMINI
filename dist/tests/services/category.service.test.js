"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_service_1 = require("../../services/category.service");
const category_entity_1 = require("../../entities/category.entity");
const uuid_1 = require("uuid");
jest.mock("uuid");
describe("CRUD Service de Categories", () => {
    beforeEach(() => {
        (0, category_service_1.resetCategories)();
    });
    test("deve retornar uma lista vazia quando nenhuma categoria foi cadastrada", () => {
        const valorEsperado = [];
        const valorRetornado = (0, category_service_1.getAllCategories)();
        expect(valorEsperado).toEqual(valorRetornado);
    });
    test("deve retornar uma lista com uma categoria depois de realizar o cadastrado", () => {
        const category = {
            name: "Category 1",
            description: "Conteúdo da Category 1",
        };
        const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categoryIdMock);
        const newCategory = (0, category_service_1.createCategory)(category);
        const fullCategory = new category_entity_1.Category(categoryIdMock, category.name, category.description);
        expect(newCategory).toEqual(fullCategory);
        expect((0, category_service_1.getAllCategories)()).toStrictEqual([fullCategory]);
    });
    test("deve lançar uma exception de Not Found quando a categoria não existe", () => {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        expect(() => (0, category_service_1.getCategoryById)(categoryId)).toThrow(`Category with id ${categoryId} not found`);
    });
    test("deve retornar uma categoria quando existir cadastrado", () => {
        const category = {
            name: "Category 1",
            description: "Conteúdo da Category 1",
        };
        const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categoryIdMock);
        (0, category_service_1.createCategory)(category);
        const fullCategory = new category_entity_1.Category(categoryIdMock, category.name, category.description);
        expect((0, category_service_1.getCategoryById)(categoryIdMock)).toStrictEqual(fullCategory);
    });
    test("deve remover um registro cadastrado", () => {
        const category = {
            name: "Category 1",
            description: "Conteúdo da Category 1",
        };
        const categorydMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categorydMock);
        (0, category_service_1.createCategory)(category);
        const fullCategory = new category_entity_1.Category(categorydMock, category.name, category.description);
        expect((0, category_service_1.getAllCategories)()).toStrictEqual([fullCategory]);
        (0, category_service_1.deleteCategory)(categorydMock);
        expect((0, category_service_1.getAllCategories)().length).toBe(0);
    });
    test("ao tentar remover uma categoria inexistente, deve retornar uma exception de Not Found", () => {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        expect(() => (0, category_service_1.deleteCategory)(categoryId)).toThrow(`Category with id ${categoryId} not found`);
    });
    test("ao tentar editar uma categoria inexistente, deve retornar uma exception de Not Found", () => {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        expect(() => (0, category_service_1.updateCategory)(categoryId, { name: "Titulo", description: "Descrição" })).toThrow(`Category with id ${categoryId} not found`);
    });
    test("deve atualizar um registro", () => {
        const category = {
            name: "Category 1"
        };
        const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categoryIdMock);
        (0, category_service_1.createCategory)(category);
        const fullCategory = new category_entity_1.Category(categoryIdMock, category.name);
        expect((0, category_service_1.getAllCategories)()).toStrictEqual([fullCategory]);
        const editCategory = { name: "Titulo", description: "Descrição" };
        (0, category_service_1.updateCategory)(categoryIdMock, editCategory);
        expect((0, category_service_1.getAllCategories)()).toStrictEqual([
            new category_entity_1.Category(categoryIdMock, editCategory.name, editCategory.description)
        ]);
    });
});
