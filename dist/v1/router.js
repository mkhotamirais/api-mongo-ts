"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_js_1 = require("./productController.js");
const router = express_1.default.Router();
router.route("/product").get(productController_js_1.readProducts).post(productController_js_1.createdProduct);
router.route("/product/:id").get(productController_js_1.readProductById).patch(productController_js_1.updateProduct).delete(productController_js_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=router.js.map