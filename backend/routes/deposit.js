const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Deposit = require('../models/Deposit');
const User = require('../models/User');

const router = express.Router();

// Middleware
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

const adminAuth = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  next();
};

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload proof
router.post('/upload', auth, upload.single('proof'), async (req, res) => {
  const { amount } = req.body;
  const deposit = new Deposit({
    user: req.userId,
    amount,
    proof: req.file.path,
  });
  await deposit.save();
  res.json({ message: 'Proof uploaded' });
});

// Get deposits (user)
router.get('/', auth, async (req, res) => {
  const deposits = await Deposit.find({ user: req.userId });
  res.json(deposits);
});

// Approve deposit (admin)
router.put('/:id/approve', auth, adminAuth, async (req, res) => {
  const deposit = await Deposit.findById(req.params.id);
  deposit.status = 'approved';
  await deposit.save();
  const user = await User.findById(deposit.user);
  user.balance += deposit.amount;
  await user.save();
  res.json({ message: 'Approved' });
});

module.exports = router;