import express from "express";
import {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide
} from "../controllers/hero.controller";

import { protect, admin } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = express.Router();

router.get("/", getSlides);

router.post(
  "/",
  protect,
  admin,
  upload.single("img"),
  createSlide
);

router.put(
  "/:id",
  protect,
  admin,
  upload.single("img"),
  updateSlide
);

router.delete("/:id", protect, admin, deleteSlide);

export default router;