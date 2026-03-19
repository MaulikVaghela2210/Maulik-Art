import { Request, Response } from "express";
import Contact from "../models/contact.model";

export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error saving contact" });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact" });
  }
};

export const updateContact = async (req: Request, res: Response) => {

try {

const updated = await Contact.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);

res.json(updated);

} catch (error) {

res.status(500).json({ message: "Update error" });

}

};