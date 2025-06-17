"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const not_found_exception_1 = require("../exceptions/not-found.exception");
const template_service_1 = require("../services/template.service");
const template_adapter_1 = require("../adapters/template.adapter");
const router = express_1.default.Router();
router.get("/templates", (_req, res) => {
    res.json((0, template_service_1.getAllTemplates)().map(template => (0, template_adapter_1.getSimplifiedTemplate)(template)));
});
router.post("/templates", (req, res) => {
    const { title, content } = req.body;
    res.status(201)
        .json((0, template_service_1.createTemplate)({ title, content }));
});
router.get("/templates/:id", (req, res) => {
    try {
        const template = (0, template_service_1.getTemplateById)(req.params.id);
        res.json((0, template_adapter_1.getSimplifiedTemplate)(template));
    }
    catch (error) {
        res.status(404)
            .json({ message: error.message });
    }
});
router.put("/templates/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const template = (0, template_service_1.updateTemplate)(id, { title, content });
        res.json(template);
    }
    catch (error) {
        if (error instanceof not_found_exception_1.NotFoundException) {
            res.status(404)
                .json({ message: error.message });
        }
        else {
            res.status(500)
                .json({ message: `Unexpected error: ${error.message}` });
        }
    }
});
router.delete("/templates/:id", (req, res) => {
    try {
        (0, template_service_1.deleteTemplate)(req.params.id);
        res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof not_found_exception_1.NotFoundException) {
            res.status(404)
                .json({ message: error.message });
        }
        else {
            res.status(500)
                .json({ message: `Unexpected error: ${error.message}` });
        }
    }
});
router.post("/templates/:templateId/categories/:categoryId", (req, res) => {
    try {
        const { templateId, categoryId } = req.params;
        const updatedTemplate = (0, template_service_1.attachCategory)(templateId, categoryId);
        res.json((0, template_adapter_1.getSimplifiedTemplate)(updatedTemplate));
    }
    catch (error) {
        if (error instanceof not_found_exception_1.NotFoundException) {
            res.status(404)
                .json({ message: error.message });
        }
        else {
            res.status(500).json({ message: `Unexpected error: ${error.message}` });
        }
    }
});
router.delete("/templates/:templateId/categories/:categoryId", (req, res) => {
    try {
        const { templateId, categoryId } = req.params;
        const updatedTemplate = (0, template_service_1.detachCategory)(templateId, categoryId);
        res.json((0, template_adapter_1.getSimplifiedTemplate)(updatedTemplate));
    }
    catch (error) {
        if (error instanceof not_found_exception_1.NotFoundException) {
            res.status(404)
                .json({ message: error.message });
        }
        else {
            res.status(500).json({ message: `Unexpected error: ${error.message}` });
        }
    }
});
exports.default = router;
