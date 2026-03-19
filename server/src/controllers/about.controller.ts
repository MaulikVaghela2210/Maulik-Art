import { Request, Response } from "express";
import About from "../models/about.model";
import cloudinary from "../config/cloudinary";

// ================= CREATE =================
export const createAbout = async (req: Request, res: Response) => {
  try {

    const { title, description } = req.body;

    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ message: "Image required" });
    }

    const result: any = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        { folder: "about" },
        (error, result) => {

          if (error) reject(error);
          else resolve(result);

        }
      );

      stream.end(file.buffer);

    });

    const about = await About.create({
      title,
      description,
      image: result.secure_url
    });

    res.json(about);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }
};


// ================= GET =================
export const getAbout = async (req: Request, res: Response) => {

  try {

    const about = await About.findOne().sort({ createdAt: -1 });

    res.json(about);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};


// ================= UPDATE =================
export const updateAbout = async (req: Request, res: Response) => {

  try {

    const { id } = req.params;

    const about = await About.findById(id);

    if (!about) {
      return res.status(404).json({ message: "About not found" });
    }

    let imageUrl = about.image;

    const file = req.file as Express.Multer.File;

    if (file) {

      const result: any = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "about" },
          (error, result) => {

            if (error) reject(error);
            else resolve(result);

          }
        );

        stream.end(file.buffer);

      });

      imageUrl = result.secure_url;

    }

    const updated = await About.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        image: imageUrl
      },
      { new: true }
    );

    res.json(updated);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};


// ================= DELETE =================
export const deleteAbout = async (req: Request, res: Response) => {

  try {

    const { id } = req.params;

    await About.findByIdAndDelete(id);

    res.json({ message: "About deleted" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

};