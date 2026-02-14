const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const contactRoutes = require('./routes/contact');
const registrationRoutes = require('./routes/registration');

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // React dev server
  ],
  credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// API Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/register', registrationRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎵 Welcome to Mridanga App Backend API',
    status: 'Server is running successfully!',
    version: '1.0.0',
    endpoints: {
      contacts: '/api/contacts',
      register: '/api/register',
      health: '/api/health'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: 'Connected'
  });
});

// 404 handler - FIXED: Remove the path parameter entirely
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'GET /api/contacts',
      'POST /api/contacts',
      'GET /api/register',
      'POST /api/register'
    ]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API available at: http://localhost:${PORT}`);
  console.log(`🎯 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});