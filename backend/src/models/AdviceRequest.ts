import mongoose, { Schema } from "mongoose";

const adviceRequestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    wallet: {
      type: String,
      required: true,
    },
    request: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending",
    },
    adminResponse: {
      type: String,
      default: null,
    },
    respondedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AdviceRequest || mongoose.model("AdviceRequest", adviceRequestSchema);
