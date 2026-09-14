import mongoose, { Schema } from "mongoose";

const depositSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    proof: { type: String }, // base64 data URI
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Deposit || mongoose.model("Deposit", depositSchema);
