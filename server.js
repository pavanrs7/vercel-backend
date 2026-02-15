const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const contactRoutes = require("./routes/contact");
const registrationRoutes = require("./routes/registration");

// ✅ Manual CORS - must be FIRST before all other middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://mridvatsa.vercel.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // 👈 sendStatus instead of status().end()
  }

  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/register", registrationRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "🎵 Welcome to Mridanga App Backend API",
    status: "Server is running successfully!",
    version: "1.0.0",
    endpoints: {
      contacts: "/api/contacts",
      register: "/api/register",
      health: "/api/health",
    },
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    database: "Connected",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    availableRoutes: [
      "GET /",
      "GET /api/health",
      "GET /api/contacts",
      "POST /api/contacts",
      "GET /api/register",
      "POST /api/register",
    ],
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API available at: http://localhost:${PORT}`);
  console.log(`🎯 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

// ✅ Required for Vercel serverless
module.exports = app;