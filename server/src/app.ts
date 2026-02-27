import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import artworkRoutes from "./routes/artwork.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";

const app = express();

// ========================
// Middlewares
// ========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// Routes
// ========================
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ========================
// Root Route
// ========================
app.get("/", (req: Request, res: Response) => {
  res.send("🎨 Art API Running 🚀");
});

// ========================
// 404 Handler
// ========================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ========================
// Global Error Handler
// ========================
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("❌ Error:", err.message);

    res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

export default app;