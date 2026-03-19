import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  title: string;
  desc: string;
  img: string;
  bg: string;
  frame: boolean;
}

const heroSchema = new Schema<IHero>(
  {
    title: String,
    desc: String,
    img: String,
    bg: String,
    frame: Boolean
  },
  { timestamps: true }
);

export default mongoose.model<IHero>("Hero", heroSchema);