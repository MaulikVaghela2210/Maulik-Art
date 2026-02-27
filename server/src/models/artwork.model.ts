import mongoose, { Document, Schema } from "mongoose";

export interface IArtwork extends Document {
  title: string;
  description: string;
  image: string;
  price: number;
  category: mongoose.Types.ObjectId;
  createdAt: Date;
}

const artworkSchema = new Schema<IArtwork>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IArtwork>("Artwork", artworkSchema);