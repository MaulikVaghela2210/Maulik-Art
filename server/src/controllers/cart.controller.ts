import { Request, Response, NextFunction } from "express";
import Cart from "../models/cart.model";
import Artwork from "../models/artwork.model";


// ============================
// 1️⃣ Add To Cart
// ============================
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

    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
      return;
    }

    const userId = (req as any).user._id;

    const existingItem = await Cart.findOne({
      user: userId,
      artwork: artworkId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();

      res.status(200).json({
        success: true,
        message: "Cart quantity updated",
        data: existingItem,
      });
      return;
    }

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


// ============================
// 2️⃣ Get User Cart
// ============================
export const getUserCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await Cart.find({
      user: (req as any).user._id,
    }).populate("artwork");

    let totalPrice = 0;
    cart.forEach((item: any) => {
      totalPrice += item.artwork.price * item.quantity;
    });

    res.status(200).json({
      success: true,
      cart,
      totalPrice,
    });
  } catch (error) {
    next(error);
  }
};


// ============================
// 3️⃣ Update Cart Quantity
// ============================
export const updateCartQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { artworkId } = req.params;
    const { quantity } = req.body;

    const userId = (req as any).user._id;

    if (quantity <= 0) {
      await Cart.deleteOne({ user: userId, artwork: artworkId });

      res.status(200).json({
        success: true,
        message: "Item removed from cart",
      });
      return;
    }

    const cartItem = await Cart.findOneAndUpdate(
      { user: userId, artwork: artworkId },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      data: cartItem,
    });

  } catch (error) {
    next(error);
  }
};


// ============================
// 4️⃣ Remove Single Item
// ============================
export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { artworkId } = req.params;
    const userId = (req as any).user._id;

    const cartItem = await Cart.findOneAndDelete({
      user: userId,
      artwork: artworkId,
    });

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });

  } catch (error) {
    next(error);
  }
};


// ============================
// 5️⃣ Clear Full Cart
// ============================
export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as any).user._id;

    await Cart.deleteMany({ user: userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });

  } catch (error) {
    next(error);
  }
};

