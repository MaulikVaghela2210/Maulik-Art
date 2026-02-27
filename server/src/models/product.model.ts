import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  size?: string;
  medium?: string;
  stock: number;
  isFeatured: boolean;
  artistName?: string;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    size: {
      type: String,
    },
    medium: {
      type: String,
    },
    stock: {
      type: Number,
      default: 1,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    artistName: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);