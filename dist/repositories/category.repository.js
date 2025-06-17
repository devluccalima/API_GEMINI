"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCategoriesDb = exports.removeCategory = exports.saveCategory = exports.findAllCategories = exports.findCategoryById = void 0;
let categories = [];
const findAllCategories = () => {
    return categories;
};
exports.findAllCategories = findAllCategories;
const saveCategory = (category) => {
    categories.push(category);
    return category;
};
exports.saveCategory = saveCategory;
const findCategoryById = (id) => {
    return categories.find((category) => category.getId() === id);
};
exports.findCategoryById = findCategoryById;
const removeCategory = (id) => {
    categories = categories.filter((category) => category.getId() !== id);
};
exports.removeCategory = removeCategory;
const resetCategoriesDb = () => {
    categories = [];
};
exports.resetCategoriesDb = resetCategoriesDb;
