import express from "express";
import { addToCart, getUserCart } from "../controllers/cart.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getUserCart);

export default router;