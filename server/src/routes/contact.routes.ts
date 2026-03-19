import express from "express";
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller";

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.delete("/:id", deleteContact);
router.put("/:id", updateContact);

export default router;