import express, { Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { protect, adminOnly } from "../middleware/auth.middleware";

const router = express.Router();

// ================= PUBLIC ROUTES =================
router.post("/register", registerUser);
router.post("/login", loginUser);

// ================= PROTECTED ROUTE =================
router.get("/profile", protect, (req: any, res: Response) => {
  res.status(200).json({
    message: "Protected profile data",
    user: req.user,
  });
});

// ================= ADMIN ONLY ROUTE =================
router.get("/admin", protect, adminOnly, (req: any, res: Response) => {
  res.status(200).json({
    message: "Welcome Admin",
    user: req.user,
  });
});

export default router;