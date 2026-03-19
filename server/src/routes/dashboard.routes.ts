import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";

const router = express.Router();

router.get("/dashboard-stats", getDashboardStats);

export default router;