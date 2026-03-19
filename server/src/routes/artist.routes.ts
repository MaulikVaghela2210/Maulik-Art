import express from "express";
import upload from "../middleware/upload.middleware";
import {
  getArtists,
  addArtist,
  updateArtist,
  deleteArtist
} from "../controllers/artist.controller";

const router = express.Router();

router.get("/", getArtists);

router.post("/", upload.single("image"), addArtist);

router.delete("/:id", deleteArtist);

/* YE LINE ADD KARO */
router.put("/:id", upload.single("image"), updateArtist);

router.post(
"/",
upload.single("image"),
addArtist
);

export default router;