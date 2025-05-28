const admin = require("../utils/firebase");
const User = require("../models/User");
const ApprovedEmail = require("../models/approvedEmail");

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { email, name } = decoded;

    const approved = await ApprovedEmail.findOne({ email });
    if (!approved) {
      return res.status(403).json({ message: "Email not approved" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        role: approved.role, // Assign based on ApprovedEmail
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
