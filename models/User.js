const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  role: { type: String, enum: ["customer", "admin", "rider"], default: "customer" },
});

module.exports = mongoose.model("User", userSchema);