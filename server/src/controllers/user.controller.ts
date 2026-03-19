import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import cloudinary from "../config/cloudinary";

// ================= REGISTER USER =================
export const registerUser = async (req: Request, res: Response) => {

  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// ================= LOGIN USER =================
export const loginUser = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        phone: user.phone
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// ================= GET ALL USERS =================
export const getAllUsers = async (req: Request, res: Response) => {

  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: "Users fetch error"
    });

  }

};


// ================= GET PROFILE =================
export const getProfile = async (req: any, res: Response) => {

  try {

    const user = await User
      .findById(req.user.id)
      .select("-password");

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: "Profile fetch error"
    });

  }

};


// ================= UPDATE PROFILE =================
export const updateProfile = async (req: any, res: Response) => {

  try {

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    // ================= UPDATE BASIC DATA =================

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;

    // ================= IMAGE UPLOAD =================

    if (req.file) {

      const result: any = await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(

          {
            folder: "profile-images"
          },

          (error: any, result: any) => {

            if (error) reject(error);
            else resolve(result);

          }

        );

        stream.end(req.file.buffer);

      });

      user.image = result.secure_url;

    }

    // ================= SAVE USER =================

    const updatedUser = await user.save();

    res.status(200).json({

      message: "Profile updated successfully",

      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        image: updatedUser.image
      }

    });

  } catch (error) {

    console.log("Profile update error:", error);

    res.status(500).json({
      message: "Profile update error"
    });

  }

};


// ================= CHANGE PASSWORD =================
export const changePassword = async (req: any, res: Response) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // ================= CHECK CURRENT PASSWORD =================

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Current password is incorrect"
      });

    }

    // ================= HASH NEW PASSWORD =================

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      newPassword,
      salt
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully"
    });

  } catch (error) {

    console.log("Password change error:", error);

    res.status(500).json({
      message: "Password change error"
    });

  }

};