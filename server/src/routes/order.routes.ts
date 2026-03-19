import express from "express";

import {
  createOrder,
  getOrders,
  deleteOrder,
  updateStatus
} from "../controllers/order.controller";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.delete("/:id", deleteOrder);

router.put("/:id", updateStatus);

export default router;