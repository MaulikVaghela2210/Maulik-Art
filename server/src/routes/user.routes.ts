import express, { Request, Response } from "express";
import { 
registerUser,
loginUser,
getAllUsers,
getProfile,
changePassword,
updateProfile
} from "../controllers/user.controller";
import { protect, adminOnly } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";



const router = express.Router();

// ================= PUBLIC ROUTES =================
router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/change-password", protect, changePassword);

// ================= PROFILE =================
router.get("/profile", protect, getProfile);

router.put("/profile", protect, upload.single("image"), updateProfile);

// ================= GET ALL USERS =================
router.get("/", protect, adminOnly, getAllUsers);

// ================= PROTECTED ROUTE =================
// router.get("/profile", protect, (req: any, res: Response) => {
//   res.status(200).json({
//     message: "Protected profile data",
//     user: req.user,
//   });
// });

// ================= ADMIN ONLY ROUTE =================
router.get("/admin", protect, adminOnly, (req: any, res: Response) => {
  res.status(200).json({
    message: "Welcome Admin",
    user: req.user,
  });
});

export default router;