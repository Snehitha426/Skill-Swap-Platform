// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/skillSwapDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ MongoDB connected on localhost:27017/skillSwapDB");
});

// SCHEMAS

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,
  isPublic: Boolean,
  banned: { type: Boolean, default: false },
});

const SwapSchema = new mongoose.Schema({
  fromUser: String,
  toUser: String,
  skillRequested: String,
  skillOffered: String,
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
});

const User = mongoose.model("User", UserSchema);
const Swap = mongoose.model("Swap", SwapSchema);

// ROUTES

// 🧑 Create or Update User Profile
app.post("/api/users", async (req, res) => {
  try {
    if (!req.body.name) return res.status(400).json({ error: "Name is required" });
    const user = await User.findOneAndUpdate(
      { name: req.body.name },
      req.body,
      { upsert: true, new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👀 Get All Public & Not Banned Users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({ isPublic: true, banned: false });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚫 Ban a User by Name
app.put("/api/users/ban/:name", async (req, res) => {
  try {
    const bannedUser = await User.findOneAndUpdate(
      { name: req.params.name },
      { banned: true },
      { new: true }
    );
    if (!bannedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(bannedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔁 Create New Swap Request
app.post("/api/swaps", async (req, res) => {
  try {
    const swap = new Swap(req.body);
    await swap.save();
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 Get All Swaps
app.get("/api/swaps", async (req, res) => {
  try {
    const swaps = await Swap.find();
    res.status(200).json(swaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📝 Update Swap Status
app.put("/api/swaps/:id", async (req, res) => {
  try {
    const updated = await Swap.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Swap not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete Swap (e.g., if not accepted)
app.delete("/api/swaps/:id", async (req, res) => {
  try {
    const deleted = await Swap.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Swap not found" });
    res.status(200).json({ message: "Swap deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🚀 Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
