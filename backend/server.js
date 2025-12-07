const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";


// ==================== MIDDLEWARE ====================
// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // In production, specify your frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Body parsing middleware (Express built-in, no need for body-parser)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware (simple version)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ==================== MONGODB CONNECTION ====================
const MONGODB_URI = process.env.MONGO_URI;

// MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    console.log(`📍 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err.message);
    console.error("💡 Make sure MongoDB is running and MONGO_URI is correct");
    process.exit(1);
  });

// MongoDB connection event handlers
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err.message);
});

// ==================== ROUTES ====================
// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Beast Burger API",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint with MongoDB status
app.get("/health", (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const mongoStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  const healthStatus = {
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: {
      status: mongoStates[mongoStatus] || "unknown",
      connected: mongoStatus === 1,
    },
    environment: NODE_ENV,
  };

  const statusCode = mongoStatus === 1 ? 200 : 503;
  res.status(statusCode).json(healthStatus);
});

// API routes
app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/menu", require("./routes/menu"));
// app.use("/api/orders", require("./routes/orders"));

// ==================== ERROR HANDLING ====================
// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Mongoose cast error (invalid ID format)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate entry. This record already exists.",
    });
  }

  // JWT errors (if using JWT later)
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired",
    });
  }

  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(NODE_ENV === "development" && { stack: err.stack, error: err }),
  });
});

// ==================== START SERVER ====================
const server = app.listen(PORT, () => {
  console.log("\n" + "=".repeat(50));
  console.log("🚀 Beast Burger API Server");
  console.log("=".repeat(50));
  console.log(`📍 Server running on PORT ${PORT}`);
  console.log(`🌐 Environment: ${NODE_ENV}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log("=".repeat(50) + "\n");
});

// Export app for testing
module.exports = app;
