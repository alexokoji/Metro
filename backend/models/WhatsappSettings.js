const mongoose = require('mongoose');

const whatsappSettingsSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      default: '+1-818-523-9018'
    },
    message: {
      type: String,
      default: 'Hi! I need help with crypto recovery.'
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhatsappSettings', whatsappSettingsSchema);
