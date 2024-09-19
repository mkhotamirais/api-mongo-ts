"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
}, {
    timestamps: true,
});
const Products = mongoose_1.default.model("v1Product", productSchema);
exports.Products = Products;
//# sourceMappingURL=models.js.map