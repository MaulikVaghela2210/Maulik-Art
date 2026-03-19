import express from "express";
import { getRevenueData } from "../controllers/revenue.controller";

const router = express.Router();

router.get("/revenue", getRevenueData);

export default router;