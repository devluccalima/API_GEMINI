"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const uuid_1 = require("uuid");
class Template {
    constructor(id, title, content, categories = []) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.categories = categories;
    }
    static create(title, content, categories = []) {
        const id = (0, uuid_1.v4)();
        return new Template(id, title, content, categories);
    }
    addCategory(category) {
        if (!this.findByCategory(category)) {
            this.categories.push(category);
            category.addTemplate(this);
        }
    }
    removeCategory(category) {
        if (this.findByCategory(category)) {
            const newCategories = this.getCategories().filter(cat => cat.getId() !== category.getId());
            this.setCategories(newCategories);
            category.removeTemplate(this);
        }
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getContent() {
        return this.content;
    }
    getCategories() {
        return this.categories;
    }
    setTitle(title) {
        this.title = title;
    }
    setContent(content) {
        this.content = content;
    }
    setCategories(categories) {
        this.categories = categories;
    }
    findByCategory(category) {
        return this.categories.find((c) => category.getId() === c.getId());
    }
}
exports.Template = Template;
;
