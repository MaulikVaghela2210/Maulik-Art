import { Request, Response } from "express";
import Service from "../models/service.model";

// CREATE
export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, icon } = req.body;
    const service = await Service.create({ title, description, icon });
    res.json(service);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};