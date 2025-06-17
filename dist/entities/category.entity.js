"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const uuid_1 = require("uuid");
class Category {
    constructor(id, name, description = "", templates = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.templates = templates;
    }
    static create(name, description = "", templates = []) {
        const id = (0, uuid_1.v4)();
        return new Category(id, name, description, templates);
    }
    addTemplate(template) {
        if (!this.findByTemplate(template)) {
            this.templates.push(template);
            template.addCategory(this);
        }
    }
    removeTemplate(template) {
        if (this.findByTemplate(template)) {
            const newTemplates = this.getTemplates().filter(tem => tem.getId() !== template.getId());
            this.setTemplates(newTemplates);
            template.removeCategory(this);
        }
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    getTemplates() {
        return this.templates;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setTemplates(templates) {
        this.templates = templates;
    }
    findByTemplate(template) {
        return this.templates.find((t) => template.getId() === t.getId());
    }
}
exports.Category = Category;
