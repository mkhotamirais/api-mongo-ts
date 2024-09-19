"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("./productController");
const router = express_1.default.Router();
router.route("/product").get(productController_1.readProducts).post(productController_1.createdProduct);
router.route("/product/:id").get(productController_1.readProductById).patch(productController_1.updateProduct).delete(productController_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map