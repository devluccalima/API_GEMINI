"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTemplatesDb = exports.detachCategoryFromTemplate = exports.attachCategoryToTemplate = exports.removeTemplate = exports.saveTemplate = exports.findAllTemplates = exports.findTemplateById = void 0;
let templates = [];
const findAllTemplates = () => {
    return templates;
};
exports.findAllTemplates = findAllTemplates;
const saveTemplate = (template) => {
    templates.push(template);
    return template;
};
exports.saveTemplate = saveTemplate;
const findTemplateById = (id) => {
    return templates.find((template) => template.getId() === id);
};
exports.findTemplateById = findTemplateById;
const removeTemplate = (id) => {
    templates = templates.filter((template) => template.getId() !== id);
};
exports.removeTemplate = removeTemplate;
const attachCategoryToTemplate = (template, category) => {
    template.addCategory(category);
    return template;
};
exports.attachCategoryToTemplate = attachCategoryToTemplate;
const detachCategoryFromTemplate = (template, category) => {
    template.removeCategory(category);
    return template;
};
exports.detachCategoryFromTemplate = detachCategoryFromTemplate;
const resetTemplatesDb = () => {
    templates = [];
};
exports.resetTemplatesDb = resetTemplatesDb;
