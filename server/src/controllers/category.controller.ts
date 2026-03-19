import { Request, Response } from "express";
import Category from "../models/category.model";

/* ================= CREATE CATEGORY ================= */

export const createCategory = async (req: Request, res: Response) => {
  try {

    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({
      message: "Error creating category",
    });
  }
};

/* ================= GET ALL CATEGORIES ================= */

export const getCategories = async (req: Request, res: Response) => {
  try {

    const categories = await Category.find();

    res.json(categories);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
    });
  }
};

/* ================= UPDATE CATEGORY ================= */

export const updateCategory = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({
      message: "Error updating category",
    });
  }
};

/* ================= DELETE CATEGORY ================= */

export const deleteCategory = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting category",
    });
  }
};