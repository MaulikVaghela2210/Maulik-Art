import { Request, Response, NextFunction } from "express";
import Cart from "../models/cart.model";
import Artwork from "../models/artwork.model";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { artworkId, quantity } = req.body;

    if (!artworkId || !quantity || quantity <= 0) {
      res.status(400).json({
        success: false,
        message: "Valid artworkId and quantity are required",
      });
      return;
    }

    // 1️⃣ Check artwork exists
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
      return;
    }

    const userId = (req as any).user._id;

    // 2️⃣ Check if artwork already in cart
    const existingItem = await Cart.findOne({
      user: userId,
      artwork: artworkId,
    });

    if (existingItem) {
      // 3️⃣ If exists → update quantity
      existingItem.quantity += quantity;
      await existingItem.save();

      res.status(200).json({
        success: true,
        message: "Cart quantity updated",
        data: existingItem,
      });
      return;
    }

    // 4️⃣ Else → create new cart item
    const cartItem = await Cart.create({
      user: userId,
      artwork: artworkId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: cartItem,
    });

  } catch (error) {
    next(error);
  }
};

export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await Cart.find({
      user: (req as any).user._id,
    }).populate("artwork");

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {
    next(error);
  }
};