"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const template_repository_1 = require("../../repositories/template.repository");
const category_repository_1 = require("../../repositories/category.repository");
const template_entity_1 = require("../../entities/template.entity");
const category_entity_1 = require("../../entities/category.entity");
const template_service_1 = require("../../services/template.service");
const category_service_1 = require("../../services/category.service");
jest.mock("uuid");
describe("CRUD Repository de Templates", () => {
    beforeEach(() => {
        (0, template_repository_1.resetTemplatesDb)();
    });
    test("deve retornar uma lista vazia quando nenhum template foi cadastrado", () => {
        const valorEsperado = [];
        const valorRetornado = (0, template_repository_1.findAllTemplates)();
        expect(valorEsperado).toEqual(valorRetornado);
    });
    test("deve retornar uma lista com um template depois de realizar o cadastrado", () => {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(templateId);
        const template = template_entity_1.Template.create("Template 1", "Conteúdo do template 1");
        expect((0, template_repository_1.saveTemplate)(template)).toEqual(template);
        const templates = (0, template_repository_1.findAllTemplates)();
        expect(templates.length).toBe(1);
        expect(templates[0].getCategories()).toStrictEqual([]);
        expect(templates[0].getTitle()).toBe("Template 1");
        expect(templates[0].getContent()).toBe("Conteúdo do template 1");
        expect(templates[0].getId()).toEqual(templateId);
    });
    test("deve retornar undefined quando o template não existe", () => {
        expect((0, template_repository_1.findTemplateById)("44c8e5fd-5b1b-4099-8286-e799c64e4353")).toBeUndefined();
    });
    test("deve retornar um template quando existir cadastrado", () => {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(templateId);
        const template = template_entity_1.Template.create("Template 1", "Conteúdo do template 1");
        expect((0, template_repository_1.saveTemplate)(template)).toEqual(template);
        expect((0, template_repository_1.findTemplateById)(templateId)).toStrictEqual(template);
    });
    test("deve remover um registro cadastrado", () => {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(templateId);
        const template = template_entity_1.Template.create("Template 1", "Conteúdo do template 1");
        expect((0, template_repository_1.saveTemplate)(template)).toEqual(template);
        expect((0, template_repository_1.findAllTemplates)()).toStrictEqual([template]);
        (0, template_repository_1.removeTemplate)(templateId);
        const templates = (0, template_repository_1.findAllTemplates)();
        expect(templates.length).toBe(0);
    });
    test("ao tentar remover um template inexistente, deve retornar undefined", () => {
        expect((0, template_repository_1.removeTemplate)("44c8e5fd-5b1b-4099-8286-e799c64e4353")).toBeUndefined();
    });
});
describe("Attach categories ao template", () => {
    test("deve adicionar uma categoria à um template", () => {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(templateId);
        const template = template_entity_1.Template.create("Template 1", "Conteúdo do template 1");
        (0, template_repository_1.saveTemplate)(template);
        const categoryId = "11c8e5fd-5b1b-4099-8286-e799c64e4351";
        uuid_1.v4.mockReturnValue(categoryId);
        const category = category_entity_1.Category.create("Categoria 1", "com desc");
        (0, category_repository_1.saveCategory)(category);
        (0, template_repository_1.attachCategoryToTemplate)(template, category);
        const templateUpdated = (0, template_service_1.getTemplateById)(templateId);
        expect(templateUpdated.getCategories().length).toBe(1);
        expect(templateUpdated.getCategories()).toStrictEqual([category]);
        const categoryUpdated = (0, category_service_1.getCategoryById)(categoryId);
        expect(categoryUpdated.getTemplates().length).toBe(1);
        expect(categoryUpdated.getTemplates()).toStrictEqual([template]);
    });
});
describe("Detach categories de um template", () => {
    test("deve remover uma categoria de um template", () => {
        const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(templateId);
        const template = template_entity_1.Template.create("Template 1", "Conteúdo do template 1");
        (0, template_repository_1.saveTemplate)(template);
        const categoryIdOne = "11c8e5fd-5b1b-4099-8286-e799c64e4351";
        uuid_1.v4.mockReturnValue(categoryIdOne);
        const categoryOne = category_entity_1.Category.create("Categoria 1", "com desc");
        (0, category_repository_1.saveCategory)(categoryOne);
        const categoryIdTwo = "22c8e5fd-5b1b-4099-8286-e799c64e4352";
        uuid_1.v4.mockReturnValue(categoryIdTwo);
        const categoryTwo = category_entity_1.Category.create("Categoria 2", "com desc doiss");
        (0, category_repository_1.saveCategory)(categoryTwo);
        const categoryIdThree = "33c8e5fd-5b1b-4099-8286-e799c64e4353";
        uuid_1.v4.mockReturnValue(categoryIdThree);
        const categoryThree = category_entity_1.Category.create("Categoria 3", "com desc doiss");
        (0, category_repository_1.saveCategory)(categoryThree);
        // Attach First category
        let templatedCreated = (0, template_service_1.getTemplateById)(templateId);
        (0, template_repository_1.attachCategoryToTemplate)(templatedCreated, categoryOne);
        const templateWithCategoryAttached = (0, template_service_1.getTemplateById)(templateId);
        expect(templateWithCategoryAttached.getCategories().length).toBe(1);
        expect(templateWithCategoryAttached.getCategories()[0].getId()).toBe(categoryOne.getId());
        const categoryOneUpdated = (0, category_service_1.getCategoryById)(categoryIdOne);
        expect(categoryOneUpdated.getTemplates().length).toBe(1);
        expect(categoryOneUpdated.getTemplates()[0].getId()).toBe(template.getId());
        // Attach Second category
        templatedCreated = (0, template_service_1.getTemplateById)(templateId);
        (0, template_repository_1.attachCategoryToTemplate)(templatedCreated, categoryTwo);
        let templateWithCategoriesAttached = (0, template_service_1.getTemplateById)(templateId);
        expect(templateWithCategoriesAttached.getCategories().length).toBe(2);
        expect(templateWithCategoriesAttached.getCategories()[0].getId()).toBe(categoryOne.getId());
        expect(templateWithCategoriesAttached.getCategories()[1].getId()).toBe(categoryTwo.getId());
        const categoryTwoUpdated = (0, category_service_1.getCategoryById)(categoryIdTwo);
        expect(categoryTwoUpdated.getTemplates().length).toBe(1);
        expect(categoryTwoUpdated.getTemplates()[0].getId()).toStrictEqual(template.getId());
        // Attach Third category
        templatedCreated = (0, template_service_1.getTemplateById)(templateId);
        (0, template_repository_1.attachCategoryToTemplate)(templatedCreated, categoryThree);
        templateWithCategoriesAttached = (0, template_service_1.getTemplateById)(templateId);
        expect(templateWithCategoriesAttached.getCategories().length).toBe(3);
        expect(templateWithCategoriesAttached.getCategories()[0].getId()).toBe(categoryOne.getId());
        expect(templateWithCategoriesAttached.getCategories()[1].getId()).toBe(categoryTwo.getId());
        expect(templateWithCategoriesAttached.getCategories()[2].getId()).toBe(categoryThree.getId());
        const categoryThreeUpdated = (0, category_service_1.getCategoryById)(categoryIdThree);
        expect(categoryThreeUpdated.getTemplates().length).toBe(1);
        expect(categoryThreeUpdated.getTemplates()[0].getId()).toStrictEqual(template.getId());
        // Detach second category
        templatedCreated = (0, template_service_1.getTemplateById)(templateId);
        (0, template_repository_1.detachCategoryFromTemplate)(templatedCreated, categoryTwo);
        templateWithCategoriesAttached = (0, template_service_1.getTemplateById)(templateId);
        expect(templateWithCategoriesAttached.getCategories().length).toBe(2);
        expect(templateWithCategoriesAttached.getCategories()[0].getId()).toBe(categoryOne.getId());
        expect(templateWithCategoriesAttached.getCategories()[1].getId()).toBe(categoryThree.getId());
    });
});
