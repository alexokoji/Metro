const express = require('express');
const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Connect wallet
router.post('/connect', auth, async (req, res) => {
  const { mnemonic } = req.body;
  try {
    const wallet = ethers.Wallet.fromPhrase(mnemonic);
    const user = await User.findById(req.userId);
    user.wallets.push({ address: wallet.address, mnemonic });
    await user.save();
    res.json({ address: wallet.address });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get wallets
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.wallets);
});

module.exports = router;