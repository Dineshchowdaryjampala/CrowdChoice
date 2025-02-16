require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet"); // Security headers
const morgan = require("morgan"); // Logging
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const pollRoutes = require("./routes/pollRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // JSON Parsing
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Request logging
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Exit if DB connection fails
    }
})();

// Define API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/poll", pollRoutes);

// Serve static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Default route for API health check
app.get("/", (req, res) => {
    res.status(200).json({ message: "CrowdChoice API is running 🚀" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("\n🔴 Shutting down gracefully...");
    server.close(() => {
        console.log("🔴 Server Closed");
        process.exit(0);
    });
});
