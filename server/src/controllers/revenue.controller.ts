import { Request, Response } from "express";
import Order, { IOrder } from "../models/order.model";

export const getRevenueData = async (
  req: Request,
  res: Response
) => {
  try {

    const orders: IOrder[] = await Order.find()
      .sort({ createdAt: -1 });

    const revenue = orders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );

    res.json({
      totalRevenue: revenue,
      orders
    });

  } catch (error) {

    res.status(500).json({
      message: "Revenue fetch error"
    });

  }
};