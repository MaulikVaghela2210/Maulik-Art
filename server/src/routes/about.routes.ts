import express from "express";
import {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout
} from "../controllers/about.controller";

import upload from "../middleware/upload.middleware";

const router = express.Router();

router.post("/add", upload.single("image"), createAbout);

router.get("/", getAbout);

router.put("/:id", upload.single("image"), updateAbout);

router.delete("/:id", deleteAbout);

export default router;