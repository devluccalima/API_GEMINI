"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const not_found_exception_1 = require("../exceptions/not-found.exception");
const category_service_1 = require("../services/category.service");
const category_adapter_1 = require("../adapters/category.adapter");
const router = express_1.default.Router();
router.get("/categories", (_req, res) => {
    res.json((0, category_service_1.getAllCategories)().map(category => (0, category_adapter_1.getSimplifiedCategory)(category)));
});
router.post("/categories", (req, res) => {
    const { name, description } = req.body;
    res.status(201)
        .json((0, category_service_1.createCategory)({ name, description }));
});
router.get("/categories/:id", (req, res) => {
    try {
        const category = (0, category_service_1.getCategoryById)(req.params.id);
        res.json((0, category_adapter_1.getSimplifiedCategory)(category));
    }
    catch (error) {
        res.status(404)
            .json({ message: error.message });
    }
});
router.put("/categories/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = (0, category_service_1.updateCategory)(id, { name, description });
        res.json((0, category_adapter_1.getSimplifiedCategory)(category));
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
router.delete("/categories/:id", (req, res) => {
    try {
        (0, category_service_1.deleteCategory)(req.params.id);
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
exports.default = router;
