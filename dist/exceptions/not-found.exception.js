"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
class NotFoundException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.NotFoundException = NotFoundException;
