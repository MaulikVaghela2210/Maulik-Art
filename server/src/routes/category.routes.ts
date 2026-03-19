import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

import { protect, adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

/* CREATE CATEGORY */
router.post("/", protect, adminOnly, createCategory);

/* GET ALL CATEGORIES */
router.get("/", getCategories);

/* UPDATE CATEGORY */
router.put("/:id", protect, adminOnly, updateCategory);

/* DELETE CATEGORY */
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;