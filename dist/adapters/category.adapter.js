"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimplifiedCategory = void 0;
const getSimplifiedCategory = (category) => {
    // Uma versão sem referências circulares
    const simplifiedCategory = {
        id: category.getId(),
        name: category.getName(),
        description: category.getDescription(),
        templates: category.getTemplates().map((template) => ({
            id: template.getId(),
            title: template.getTitle(),
            content: template.getContent(),
        })),
    };
    return simplifiedCategory;
};
exports.getSimplifiedCategory = getSimplifiedCategory;
