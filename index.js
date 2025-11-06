// index.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const LiveSession = require("./models/LiveSession");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/live_session_db")
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.log(" MongoDB Error:", err));

// Serve main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Create new live session
app.post("/create-session", async (req, res) => {
  const { type } = req.body;
  const unique_id = uuidv4();
  const userurl = `${req.protocol}://${req.get("host")}/session/${unique_id}`;

  const session = new LiveSession({ type, unique_id, userurl });
  await session.save();

  res.json({ success: true, userurl });
});

// Student joins the session
app.get("/session/:unique_id", async (req, res) => {
  const { unique_id } = req.params;
  const session = await LiveSession.findOne({ unique_id });

  if (!session) {
    return res.status(404).send("<h1>Session not found </h1>");
  }

  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Start server
app.listen(3000, () => {
  console.log(" Server running on http://localhost:3000");
});
