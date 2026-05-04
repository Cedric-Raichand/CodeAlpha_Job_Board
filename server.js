require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Job Board API is running...");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});