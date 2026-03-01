const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Use a single, early CORS middleware for development and production.
// CORS Configuration - Always allow the frontend origin(s).  Support a
// comma-separated list in the FRONTEND_ORIGIN env var for multiple hosts.
const allowedOrigins = [
  // allow whatever is passed via env, plus local dev hosts
  ...(process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(',').map(o => o.trim()) : []),
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Curl requests)
    if (!origin) return callback(null, true);
    
    // Allow if origin is in the allowed list
    if (allowedOrigins.includes(origin)) return callback(null, true);
    
    // For production, also allow if we're in a permissive mode
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    return callback(new Error('CORS policy: Origin not allowed'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Resilient DB connection: try configured URI, otherwise fall back to
// an in-memory MongoDB when running in development to avoid blocking
// frontend work when a local MongoDB service isn't available.
async function connectDB() {
  const mongoose = require('mongoose');
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/primesolutions';

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB:', mongoUri);
  } catch (err) {
    console.error('Failed to connect to MongoDB at', mongoUri);
    console.error(err.message || err);

    // If not in production, try an in-memory MongoDB server
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('Starting in-memory MongoDB for development...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
        console.log('Connected to in-memory MongoDB.');
        // Make mongod available for graceful shutdown
        process.on('SIGINT', async () => {
          await mongoose.disconnect();
          await mongod.stop();
          process.exit(0);
        });
      } catch (memErr) {
        console.error('Failed to start in-memory MongoDB:', memErr.message || memErr);
        process.exit(1);
      }
    } else {
      // In production we should fail fast
      process.exit(1);
    }
  }
}

connectDB();

const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet');
const depositRoutes = require('./routes/deposit');
const adminRoutes = require('./routes/admin');
const adviceRoutes = require('./routes/advice');
const whatsappRoutes = require('./routes/whatsapp');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
// Early request logger for debugging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[REQ] ${new Date().toISOString()} ${req.method} ${req.originalUrl} Origin:${req.headers.origin || '-'}
    `);
    next();
  });
}

// Fallback CORS headers middleware - ensures headers are set on all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    process.env.FRONTEND_ORIGIN || 'https://primedigital-solutions.com',
    'https://primedigital-solutions.com',
    'https://primedigital-solutions.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ];
  
  // Always set CORS headers for allowed origins or in development
  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  }
  next();
});

// Ensure explicit OPTIONS handlers for auth endpoints are registered before the router
app.options('/api/auth/register', (req, res) => res.sendStatus(200));
app.options('/api/auth/login', (req, res) => res.sendStatus(200));
app.options('/api/auth/admin-login', (req, res) => res.sendStatus(200));
app.options('/api/advice/seek-advice', (req, res) => res.sendStatus(200));
app.options('/api/whatsapp', (req, res) => res.sendStatus(200));

app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/advice', adviceRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Global error handler ensures CORS headers are always sent even when a
// route throws before sending a response (was causing 500 responses without
// Access-Control-Allow-Origin and produced CORS failures in the browser).
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  }
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Seed admin user if not exists (credentials from .env)
async function seedAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      console.log('ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
      return;
    }
    
    const existing = await User.findOne({ email: adminEmail }).lean();
    if (existing) {
      console.log('Admin user already exists:', adminEmail, '| isAdmin:', existing.isAdmin);
      // Update password and ensure isAdmin is true
      const hashed = await bcrypt.hash(adminPassword, 10);
      await User.updateOne({ email: adminEmail }, { password: hashed, isAdmin: true });
      console.log('Updated admin credentials for:', adminEmail);
      return;
    }
    
    const hashed = await bcrypt.hash(adminPassword, 10);
    const admin = new User({ email: adminEmail, password: hashed, isAdmin: true });
    await admin.save();
    console.log('Seeded new admin user:', adminEmail);
  } catch (err) {
    console.error('Failed to seed admin user:', err.message || err);
  }
}

seedAdmin();

// Explicit OPTIONS handlers for auth endpoints to ensure preflight responses

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});