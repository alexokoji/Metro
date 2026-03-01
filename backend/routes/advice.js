const express = require('express');
const router = express.Router();
const AdviceRequest = require('../models/AdviceRequest');
const authenticate = require('../middleware/authenticate');

// Submit a new advice request (public - no auth required)
router.post('/seek-advice', async (req, res) => {
  try {
    const { wallet, request, email, name, phone } = req.body;
    
    if (!wallet || !request) {
      return res.status(400).json({ message: 'Wallet and request are required' });
    }

    const adviceRequest = new AdviceRequest({
      wallet,
      request,
      email: email || '',
      name: name || '',
      phone: phone || ''
      // userId will be null for unauthenticated requests
    });

    await adviceRequest.save();
    res.status(201).json({ message: 'Advice request submitted successfully', adviceRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting advice request', error: error.message });
  }
});

// Get all advice requests (admin only)
router.get('/', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const adviceRequests = await AdviceRequest.find()
      .populate('userId', 'email name')
      .populate('respondedBy', 'email name')
      .sort({ createdAt: -1 });
    
    res.json(adviceRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advice requests', error });
  }
});

// Get advice requests for current user
router.get('/user/mine', authenticate, async (req, res) => {
  try {
    const adviceRequests = await AdviceRequest.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(adviceRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching advice requests', error });
  }
});

// Update advice request status and response (admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, adminResponse } = req.body;
    const adviceRequest = await AdviceRequest.findById(req.params.id);

    if (!adviceRequest) {
      return res.status(404).json({ message: 'Advice request not found' });
    }

    if (status) adviceRequest.status = status;
    if (adminResponse) {
      adviceRequest.adminResponse = adminResponse;
      adviceRequest.respondedBy = req.user._id;
    }

    await adviceRequest.save();
    res.json({ message: 'Advice request updated', adviceRequest });
  } catch (error) {
    res.status(500).json({ message: 'Error updating advice request', error });
  }
});

// Delete advice request
router.delete('/:id', authenticate, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const adviceRequest = await AdviceRequest.findByIdAndDelete(req.params.id);

    if (!adviceRequest) {
      return res.status(404).json({ message: 'Advice request not found' });
    }

    res.json({ message: 'Advice request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting advice request', error });
  }
});

module.exports = router;
