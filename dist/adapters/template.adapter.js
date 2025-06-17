"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimplifiedTemplate = void 0;
const getSimplifiedTemplate = (template) => {
    // Uma versão sem referências circulares
    const simplifiedTemplate = {
        id: template.getId(),
        title: template.getTitle(),
        content: template.getContent(),
        categories: template.getCategories().map((category) => ({
            id: category.getId(),
            name: category.getName(),
            description: category.getDescription(),
        })),
    };
    return simplifiedTemplate;
};
exports.getSimplifiedTemplate = getSimplifiedTemplate;
