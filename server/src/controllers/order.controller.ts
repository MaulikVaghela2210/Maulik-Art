import { Request, Response } from "express";
import Order from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {

  try {

    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);

  } catch (error) {

    res.status(500).json({ message: "Order failed" });

  }

};

export const getOrders = async (req: Request, res: Response) => {

  try {

    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: "Error fetching orders" });

  }

};

export const deleteOrder = async (req: Request, res: Response) => {

  try {

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Order deleted" });

  } catch (error) {

    res.status(500).json({ message: "Delete failed" });

  }

};

export const updateStatus = async (req: Request, res: Response) => {

  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(order);

  } catch (error) {

    res.status(500).json({ message: "Status update failed" });

  }

};