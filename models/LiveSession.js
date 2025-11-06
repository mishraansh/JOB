// models/LiveSession.js
const mongoose = require("mongoose");

const liveSessionSchema = new mongoose.Schema({
  id: { type: Number, auto: true },
  type: { type: String, required: true },
  unique_id: { type: String, required: true },
  userurl: { type: String, required: true }
});

const LiveSession = mongoose.model("live_sessions", liveSessionSchema);
module.exports = LiveSession;
