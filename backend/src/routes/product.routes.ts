import { Router } from "express";
import { addProduct, getAllProducts, updateProduct, deleteProduct } from "../controllers/product.controllers";

const router = Router();

router.post("/products", addProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;