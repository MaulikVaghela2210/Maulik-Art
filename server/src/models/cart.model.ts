import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  artwork: mongoose.Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artwork: {
      type: Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1, // 👈 quantity negative na ho
    },
  },
  {
    timestamps: true, // 👈 createdAt & updatedAt auto add
  }
);

/// 🔥 Prevent duplicate artwork for same user
cartSchema.index({ user: 1, artwork: 1 }, { unique: true });

export default mongoose.model<ICart>("Cart", cartSchema);