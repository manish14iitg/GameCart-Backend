const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors({
  origin: "https://game-cart-frontend.vercel.app", // allow only your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

app.use("/api", authRoutes);
app.get("/", (req,res) => {
  res.json({message: "backend is running"});
});

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch((err) => console.log("MongoDB connection error:", err));
