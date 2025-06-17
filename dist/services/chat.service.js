"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
const gemini_1 = require("../third-party/gemini");
const chat = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield gemini_1.model.generateContent({
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }]
            }
        ]
    });
    const response = yield result.response;
    const text = response.text();
    return text;
});
exports.chat = chat;
