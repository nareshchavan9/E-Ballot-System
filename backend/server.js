const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================
// Environment Variables (Fallbacks)
// ============================
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your-super-secret-jwt-key-2024';
}
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/e-ballot';
}

// ============================
// Middleware
// ============================
app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://localhost:3000',
  ],
  credentials: true // needed if using cookies or sessions
}));
app.use(express.json());

// ============================
// Connect to MongoDB
// ============================
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// ============================
// Basic Route for Render Root
// ============================
app.get('/', (req, res) => {
  res.send('✅ E-Ballot backend is running');
});

// ============================
// API Routes
// ============================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/elections', require('./routes/elections'));

// ============================
// Health Check Route
// ============================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ============================
// Global Error Handler
// ============================
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ============================
// Server Start
// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
