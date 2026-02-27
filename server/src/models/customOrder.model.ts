import mongoose, { Schema, Document } from "mongoose";

export interface ICustomOrder extends Document {
  user: mongoose.Types.ObjectId;
  category: string;
  details: object;
  referenceImages: string[];
  status: string;
  priceQuote?: number;
  adminResponse?: string;
}

const CustomOrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    details: { type: Object },
    referenceImages: [{ type: String }],
    status: { type: String, default: "pending" },
    priceQuote: { type: Number },
    adminResponse: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ICustomOrder>(
  "CustomOrder",
  CustomOrderSchema
);