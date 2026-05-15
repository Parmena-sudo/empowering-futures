import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["contact", "volunteer", "donation-interest"], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
