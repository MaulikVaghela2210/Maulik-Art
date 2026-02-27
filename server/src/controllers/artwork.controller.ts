import { Request, Response } from "express";
import Artwork from "../models/artwork.model";
import cloudinary from "../config/cloudinary";

// Custom Request Interface for Multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// ======================================================
// ✅ Create Artwork (Admin Only + Cloudinary Upload)
// ======================================================
export const createArtwork = async (
  req: MulterRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Cloudinary Upload
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "maulik-art" },
      async (error, result) => {
        if (error || !result) {
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const artwork = await Artwork.create({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          image: result.secure_url,
        });

        return res.status(201).json(artwork);
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({
      message: "Artwork creation failed",
      error,
    });
  }
};

// ======================================================
// ✅ Get All Artworks (Public)
// ======================================================
export const getArtworks = async (req: Request, res: Response) => {
  try {
    const artworks = await Artwork.find().populate("category", "name");
    return res.json(artworks);
  } catch (error) {
    return res.status(500).json({
      message: "Fetching artworks failed",
    });
  }
};

// ======================================================
// ✅ Get Single Artwork
// ======================================================
export const getArtworkById = async (req: Request, res: Response) => {
  try {
    const artwork = await Artwork.findById(req.params.id).populate(
      "category",
      "name"
    );

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    return res.json(artwork);
  } catch (error) {
    return res.status(500).json({
      message: "Fetching artwork failed",
    });
  }
};

// ======================================================
// ✅ Update Artwork (Admin)
// ======================================================
export const updateArtwork = async (
  req: MulterRequest,
  res: Response
) => {
  try {
    let updatedData: any = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };

    // If new image uploaded → upload to cloudinary
    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "maulik-art" },
        async (error, result) => {
          if (error || !result) {
            return res.status(500).json({
              message: "Cloudinary upload failed",
            });
          }

          updatedData.image = result.secure_url;

          const artwork = await Artwork.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
          );

          if (!artwork) {
            return res.status(404).json({
              message: "Artwork not found",
            });
          }

          return res.json(artwork);
        }
      );

      uploadStream.end(req.file.buffer);
    } else {
      const artwork = await Artwork.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      if (!artwork) {
        return res.status(404).json({
          message: "Artwork not found",
        });
      }

      return res.json(artwork);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Artwork update failed",
    });
  }
};

// ======================================================
// ✅ Delete Artwork (Admin)
// ======================================================
export const deleteArtwork = async (req: Request, res: Response) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    return res.json({ message: "Artwork deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Artwork deletion failed",
    });
  }
};