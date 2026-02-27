import { Request, Response, NextFunction } from "express";
import Cart from "../models/cart.model";
import Order from "../models/order.model";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { shippingAddress } = req.body;

    const userId = (req as any).user._id;

    const cartItems = await Cart.find({ user: userId }).populate("artwork");

    if (!cartItems.length) {
      res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
      return;
    }

    let totalPrice = 0;

    const orderItems = cartItems.map((item: any) => {
      totalPrice += item.artwork.price * item.quantity;

      return {
        artwork: item.artwork._id,
        quantity: item.quantity,
        price: item.artwork.price,
      };
    });

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      shippingAddress,
    });

    // Clear cart after order
    await Cart.deleteMany({ user: userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    next(error);
  }
};