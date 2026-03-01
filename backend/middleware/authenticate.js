const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No authorization header' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle admin token (isAdmin flag means it's an admin user)
    if (payload.isAdmin) {
      req.user = {
        _id: payload.id,
        email: payload.email,
        isAdmin: true
      };
      next();
    } else {
      // Regular user - fetch from database
      const user = await User.findById(payload.id).select('-password -wallets.mnemonic');
      if (!user) return res.status(401).json({ error: 'User not found' });
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
