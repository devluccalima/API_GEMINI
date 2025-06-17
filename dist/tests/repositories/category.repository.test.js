"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const category_repository_1 = require("../../repositories/category.repository");
const category_entity_1 = require("../../entities/category.entity");
jest.mock("uuid");
describe("CRUD Repository de Categories", () => {
    beforeEach(() => {
        (0, category_repository_1.resetCategoriesDb)();
    });
    test("deve retornar uma lista vazia quando nenhuma categoria foi cadastrada", () => {
        const valorEsperado = [];
        const valorRetornado = (0, category_repository_1.findAllCategories)();
        expect(valorEsperado).toEqual(valorRetornado);
    });
    test("deve retornar uma lista com uma categoria depois de realizar o cadastrado", () => {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categoryId);
        const category = category_entity_1.Category.create("Category 1");
        expect((0, category_repository_1.saveCategory)(category)).toEqual(category);
        const categories = (0, category_repository_1.findAllCategories)();
        expect(categories.length).toBe(1);
        expect(categories[0].getTemplates()).toStrictEqual([]);
        expect(categories[0].getName()).toBe("Category 1");
        expect(categories[0].getDescription()).toBe("");
        expect(categories[0].getId()).toEqual(categoryId);
    });
    test("deve retornar undefined quando a categoria não existe", () => {
        expect((0, category_repository_1.findCategoryById)("44c8e5fd-5b1b-4099-8286-e799c64e435")).toBeUndefined();
    });
    test("deve retornar uma categoria quando existir cadastrado", () => {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categoryId);
        const category = category_entity_1.Category.create("Category 1", "Categoria descrição");
        expect((0, category_repository_1.saveCategory)(category)).toEqual(category);
        expect((0, category_repository_1.findCategoryById)(categoryId)).toStrictEqual(category);
    });
    test("deve remover um registro cadastrado", () => {
        const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categoryId);
        const category = category_entity_1.Category.create("Category 1", "Categoria descrição");
        expect((0, category_repository_1.saveCategory)(category)).toEqual(category);
        expect((0, category_repository_1.findAllCategories)()).toStrictEqual([category]);
        (0, category_repository_1.removeCategory)(categoryId);
        const categories = (0, category_repository_1.findAllCategories)();
        expect(categories.length).toBe(0);
    });
    test("ao tentar remover uma categoria inexistente, deve retornar undefined", () => {
        expect((0, category_repository_1.removeCategory)("44c8e5fd-5b1b-4099-8286-e799c64e4353")).toBeUndefined();
    });
});
