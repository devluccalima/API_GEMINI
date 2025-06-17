"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTemplates = exports.detachCategory = exports.attachCategory = exports.deleteTemplate = exports.updateTemplate = exports.getTemplateById = exports.createTemplate = exports.getAllTemplates = void 0;
const template_entity_1 = require("../entities/template.entity");
const not_found_exception_1 = require("../exceptions/not-found.exception");
const template_repository_1 = require("../repositories/template.repository");
const category_repository_1 = require("../repositories/category.repository");
const getAllTemplates = () => {
    return (0, template_repository_1.findAllTemplates)();
};
exports.getAllTemplates = getAllTemplates;
const createTemplate = ({ title, content }) => {
    const newTemplate = template_entity_1.Template.create(title, content);
    ;
    const template = (0, template_repository_1.saveTemplate)(newTemplate);
    return template;
};
exports.createTemplate = createTemplate;
const getTemplateById = (id) => {
    const template = (0, template_repository_1.findTemplateById)(id);
    if (!template) {
        throw new not_found_exception_1.NotFoundException(`Template with id ${id} not found`);
    }
    return template;
};
exports.getTemplateById = getTemplateById;
const updateTemplate = (id, { title, content }) => {
    const template = getTemplateById(id);
    if (!template) {
        throw new not_found_exception_1.NotFoundException(`Template with id ${id} not found`);
    }
    template.setTitle(title);
    template.setContent(content);
    return template;
};
exports.updateTemplate = updateTemplate;
const deleteTemplate = (id) => {
    const template = getTemplateById(id);
    if (!template) {
        throw new not_found_exception_1.NotFoundException(`Template with id ${id} not found`);
    }
    (0, template_repository_1.removeTemplate)(id);
};
exports.deleteTemplate = deleteTemplate;
const attachCategory = (templateId, categoryId) => {
    const template = (0, template_repository_1.findTemplateById)(templateId);
    const category = (0, category_repository_1.findCategoryById)(categoryId);
    if (!template)
        throw new not_found_exception_1.NotFoundException(`Template with id ${templateId} not found`);
    if (!category)
        throw new not_found_exception_1.NotFoundException(`Category with id ${categoryId} not found`);
    return (0, template_repository_1.attachCategoryToTemplate)(template, category);
};
exports.attachCategory = attachCategory;
const detachCategory = (templateId, categoryId) => {
    const template = (0, template_repository_1.findTemplateById)(templateId);
    const category = (0, category_repository_1.findCategoryById)(categoryId);
    if (!template)
        throw new not_found_exception_1.NotFoundException(`Template with id ${templateId} not found`);
    if (!category)
        throw new not_found_exception_1.NotFoundException(`Category with id ${categoryId} not found`);
    return (0, template_repository_1.detachCategoryFromTemplate)(template, category);
};
exports.detachCategory = detachCategory;
const resetTemplates = () => {
    (0, template_repository_1.resetTemplatesDb)();
};
exports.resetTemplates = resetTemplates;
