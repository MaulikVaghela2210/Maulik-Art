import { Request, Response } from "express";
import Hero from "../models/hero.model";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// =========================
// HELPER FUNCTION
// =========================
const uploadToCloudinary = (fileBuffer: Buffer) => {

  return new Promise<any>((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      { folder: "hero" },
      (error, result) => {

        if (result) resolve(result);
        else reject(error);

      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);

  });

};

// =========================
// GET SLIDES
// =========================
export const getSlides = async (req: Request, res: Response) => {

  try {

    const slides = await Hero.find().sort({ createdAt: -1 });

    res.json(slides);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch slides"
    });

  }

};

// =========================
// CREATE SLIDE
// =========================
export const createSlide = async (req: MulterRequest, res: Response) => {

  try {

    const { title, desc, bg, frame } = req.body;

    let img = "";

    if (req.file) {

      const result = await uploadToCloudinary(req.file.buffer);

      img = result.secure_url;

    }

    const slide = await Hero.create({
      title,
      desc,
      img,
      bg,
      frame
    });

    res.json(slide);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create slide"
    });

  }

};

// =========================
// UPDATE SLIDE
// =========================
export const updateSlide = async (req: MulterRequest, res: Response) => {

  try {

    const { title, desc, bg, frame } = req.body;

    const updateData: any = {
      title,
      desc,
      bg,
      frame
    };

    if (req.file) {

      const result = await uploadToCloudinary(req.file.buffer);

      updateData.img = result.secure_url;

    }

    const slide = await Hero.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(slide);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update slide"
    });

  }

};

// =========================
// DELETE SLIDE
// =========================
export const deleteSlide = async (req: Request, res: Response) => {

  try {

    await Hero.findByIdAndDelete(req.params.id);

    res.json({
      message: "Slide deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete slide"
    });

  }

};