const express = require('express');
const router = express.Router();
const WhatsappSettings = require('../models/WhatsappSettings');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

// Get WhatsApp settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await WhatsappSettings.findOne();
    if (!settings) {
      settings = new WhatsappSettings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update WhatsApp settings (admin only)
router.put('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { phoneNumber, message, enabled } = req.body;
    
    let settings = await WhatsappSettings.findOne();
    if (!settings) {
      settings = new WhatsappSettings();
    }
    
    if (phoneNumber) settings.phoneNumber = phoneNumber;
    if (message) settings.message = message;
    if (typeof enabled === 'boolean') settings.enabled = enabled;
    
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
