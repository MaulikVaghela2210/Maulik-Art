import { Request, Response } from "express";
import CustomOrder from "../models/customOrder.model";
import cloudinary from "../config/cloudinary";

export const createCustomOrder = async (
  req: Request,
  res: Response
) => {

  try {

    const files = (req.files as Express.Multer.File[]) || [];

const uploadedImages: string[] = [];

for (const file of files) {

  const result = await new Promise<any>((resolve, reject) => {

    cloudinary.uploader.upload_stream(
      { folder: "custom-orders" },
      (error, result) => {

        if (error) reject(error);
        else resolve(result);

      }
    ).end(file.buffer);

  });

  uploadedImages.push(result.secure_url);

}

    const order = new CustomOrder({

      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      category: req.body.category,
      description: req.body.description,

      width: req.body.width,
      height: req.body.height,

      referenceImages: uploadedImages,

    });

    const saved = await order.save();

    res.status(201).json(saved);

  } catch (error) {

    res.status(500).json({
      message: "Custom order failed",
    });

  }

};

export const getCustomOrders = async (
  req: Request,
  res: Response
) => {

  try {

    const orders = await CustomOrder
      .find()
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Fetch error",
    });

  }

};

export const deleteCustomOrder = async (
  req: Request,
  res: Response
) => {

  await CustomOrder.findByIdAndDelete(
    req.params.id
  );

  res.json({ message: "Deleted" });

};

export const updateCustomStatus = async (
  req: Request,
  res: Response
) => {

  const order = await CustomOrder.findByIdAndUpdate(

    req.params.id,
    { status: req.body.status },
    { new: true }

  );

  res.json(order);

};