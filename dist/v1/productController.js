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
exports.deleteProduct = exports.updateProduct = exports.readProductById = exports.readProducts = exports.createdProduct = void 0;
const models_js_1 = require("./models.js");
const createdProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    if (!name)
        return res.status(400).json({ error: `Name is required!` });
    if (!price)
        return res.status(400).json({ error: `Price is required!` });
    try {
        const dupName = yield models_js_1.Products.findOne({ name });
        if (dupName)
            return res.status(409).json({ error: "Duplicate name!" });
        yield models_js_1.Products.create(req.body);
        res.status(201).json({ message: `Create ${name} success` });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
});
exports.createdProduct = createdProduct;
const readProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_js_1.Products.find().sort("-createdAt");
        res.status(200).json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
});
exports.readProducts = readProducts;
const readProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield models_js_1.Products.findById(id);
        if (!data)
            return res.status(400).json({ error: `Data id ${id} not found!` });
        res.status(200).json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
});
exports.readProductById = readProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, price } = req.body;
    if (!name)
        return res.status(400).json({ error: `Name is required!` });
    if (!price)
        return res.status(400).json({ error: `Price is required!` });
    try {
        const data = yield models_js_1.Products.findById(id);
        if (!data)
            return res.status(400).json({ error: `Data id ${id} not found!` });
        const dupName = yield models_js_1.Products.findOne({ name });
        if (dupName && dupName.name !== name)
            return res.status(409).json({ error: `Duplicate name!` });
        yield models_js_1.Products.findByIdAndUpdate(id, { name, price });
        res.status(200).json({ message: `Update ${data.name} success` });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield models_js_1.Products.findById(id);
        if (!data)
            return res.status(400).json({ error: `Data id ${id} not found!` });
        yield models_js_1.Products.findByIdAndDelete(id);
        res.status(200).json({ message: `Delete ${data.name} success` });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(400).json({ error: error.message });
        }
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map