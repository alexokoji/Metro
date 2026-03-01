const express = require('express');
const User = require('../models/User');
const Deposit = require('../models/Deposit');
const Plan = require('../models/Plan');
const authenticate = require('../middleware/authenticate');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// Protect all admin routes
router.use(authenticate, isAdmin);

// List users (omit password & sensitive mnemonics)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password -wallets.mnemonic');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user balance (add amount or set absolute)
router.put('/users/:id/balance', async (req, res) => {
  try {
    const { amount, mode } = req.body; // mode: 'add' or 'set'
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (mode === 'set') {
      user.balance = Number(amount) || 0;
    } else {
      user.balance = (user.balance || 0) + Number(amount || 0);
    }
    await user.save();
    res.json({ success: true, balance: user.balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List deposits (admin view)
router.get('/deposits', async (req, res) => {
  try {
    const deposits = await Deposit.find().populate('user', 'email');
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve deposit -> credit user balance and mark deposit approved
router.put('/deposits/:id/approve', async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id);
    if (!deposit) return res.status(404).json({ error: 'Deposit not found' });
    if (deposit.status === 'approved') return res.status(400).json({ error: 'Already approved' });
    const user = await User.findById(deposit.user);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.balance = (user.balance || 0) + Number(deposit.amount || 0);
    deposit.status = 'approved';
    await user.save();
    await deposit.save();
    res.json({ success: true, userId: user._id, newBalance: user.balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Plans: list, create, update, delete
router.get('/plans', async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/plans', async (req, res) => {
  try {
    const plan = new Plan(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/plans/:id', async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) return res.status(404).json({ error: 'Plan not found' });
    res.json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/plans/:id', async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
