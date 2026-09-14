import mongoose, { Schema } from "mongoose";

const whatsappSettingsSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      default: "+1-818-523-9018",
    },
    message: {
      type: String,
      default: "Hi! I need help with crypto recovery.",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.WhatsappSettings || mongoose.model("WhatsappSettings", whatsappSettingsSchema);
