import express from "express";
import upload from "../middleware/upload.middleware";

import {
  createCustomOrder,
  getCustomOrders,
  deleteCustomOrder,
  updateCustomStatus,
} from "../controllers/customOrder.Controller";

const router = express.Router();

router.post(
  "/",
  upload.array("referenceImages", 6),
  createCustomOrder
);

router.get("/", getCustomOrders);

router.delete("/:id", deleteCustomOrder);

router.put("/:id", updateCustomStatus);

export default router;