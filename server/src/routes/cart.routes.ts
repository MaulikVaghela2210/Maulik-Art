import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getUserCart);
router.put("/:artworkId", protect, updateCartQuantity);
router.delete("/:artworkId", protect, removeFromCart);
router.delete("/clear/all", protect, clearCart);

export default router;