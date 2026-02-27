import express from "express";
import { createCategory, getCategories } from "../controllers/category.controller";
import { protect, adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, adminOnly, createCategory);
router.get("/", getCategories);

export default router;