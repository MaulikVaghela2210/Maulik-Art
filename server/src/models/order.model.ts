import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;

  items: {
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[];

  totalPrice: number;

  status: string;

  createdAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    customerName: String,

    email: String, // ⭐ ADD THIS

    phone: String,
    address: String,
    city: String,
    pincode: String,

    items: [
      {
        title: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],

    totalPrice: Number,

    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);