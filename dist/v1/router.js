"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("./productController");
const router = (0, express_1.Router)();
router.get("/product", productController_1.readProducts);
exports.default = router;
//# sourceMappingURL=router.js.map