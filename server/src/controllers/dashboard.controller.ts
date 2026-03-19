import { Request, Response } from "express";

import Order from "../models/order.model";
import CustomOrder from "../models/customOrder.model";
import User from "../models/user.model";
import Artwork from "../models/artwork.model";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {

    const totalOrders = await Order.countDocuments();

    const totalCustomOrders =
      await CustomOrder.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalArtworks =
      await Artwork.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0].totalRevenue
        : 0;

    res.json({
      totalOrders,
      totalCustomOrders,
      totalUsers,
      totalArtworks,
      totalRevenue,
    });

  } catch (error) {

    res.status(500).json({
      message: "Dashboard error",
    });

  }
};