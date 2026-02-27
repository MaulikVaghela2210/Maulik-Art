import express from "express";
import {
  createArtwork,
  getArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
} from "../controllers/artwork.controller";

import { protect } from "../middleware/auth.middleware";
import isAdmin from "../middleware/admin.middleware";
import upload from "../middleware/upload.middleware";

const router = express.Router();

// ================= PUBLIC ROUTES =================

// Get All Artworks
router.get("/", getArtworks);

// Get Single Artwork
router.get("/:id", getArtworkById);


// ================= ADMIN ROUTES =================

// Create Artwork (With Image Upload)
router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"), // field name = image
  createArtwork
);

// Update Artwork (With Optional Image Update)
router.put(
  "/:id",
  protect,
  isAdmin,
  upload.single("image"),
  updateArtwork
);

// Delete Artwork
router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteArtwork
);

export default router;