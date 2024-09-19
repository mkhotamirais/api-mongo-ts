import { Router } from "express";
import { readProducts } from "./productController";

const router = Router();

router.get("/product", readProducts);

export default router;
