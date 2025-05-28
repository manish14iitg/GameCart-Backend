const mongoose = require("mongoose");

const approvedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "rider", "customer"], required: true },
});

module.exports = mongoose.model("ApprovedEmail", approvedEmailSchema);