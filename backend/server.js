require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const pollRoutes = require("./routes/pollRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if DB connection fails
    });

// Middleware
app.use(express.json()); // JSON Parsing
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Allow frontend domain
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Define API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes);

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default route for API health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "CrowdChoice API is running 🚀" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
