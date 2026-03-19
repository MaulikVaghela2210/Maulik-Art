import mongoose from "mongoose";

const CustomOrderSchema = new mongoose.Schema(
{
name: String,
email: String,
phone: String,
category: String,
description: String,

width: Number,
height: Number,

referenceImages: [String],

status: {
type: String,
default: "Pending",
},

},
{ timestamps: true }
);

export default mongoose.model(
"CustomOrder",
CustomOrderSchema
);