"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCategories = exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.createCategory = exports.getAllCategories = void 0;
const category_entity_1 = require("../entities/category.entity");
const not_found_exception_1 = require("../exceptions/not-found.exception");
const category_repository_1 = require("../repositories/category.repository");
const getAllCategories = () => {
    return (0, category_repository_1.findAllCategories)();
};
exports.getAllCategories = getAllCategories;
const createCategory = ({ name, description }) => {
    const newCategory = category_entity_1.Category.create(name, description);
    ;
    const category = (0, category_repository_1.saveCategory)(newCategory);
    return category;
};
exports.createCategory = createCategory;
const getCategoryById = (id) => {
    const category = (0, category_repository_1.findCategoryById)(id);
    if (!category) {
        throw new not_found_exception_1.NotFoundException(`Category with id ${id} not found`);
    }
    return category;
};
exports.getCategoryById = getCategoryById;
const updateCategory = (id, { name, description }) => {
    const category = getCategoryById(id);
    if (!category) {
        throw new not_found_exception_1.NotFoundException(`Category with id ${id} not found`);
    }
    category.setName(name);
    if (description) {
        category.setDescription(description);
    }
    else {
        category.setDescription("");
    }
    return category;
};
exports.updateCategory = updateCategory;
const deleteCategory = (id) => {
    const template = getCategoryById(id);
    if (!template) {
        throw new not_found_exception_1.NotFoundException(`Category with id ${id} not found`);
    }
    (0, category_repository_1.removeCategory)(id);
};
exports.deleteCategory = deleteCategory;
const resetCategories = () => {
    (0, category_repository_1.resetCategoriesDb)();
};
exports.resetCategories = resetCategories;
