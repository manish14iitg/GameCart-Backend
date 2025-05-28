// seedApprovedEmails.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ApprovedEmail = require("./models/approvedEmail");

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  const emails = [
    { email: "manish220030@gmail.com", role: "admin" },
    { email: "manish220030@gmail.com", role: "rider" },
    { email: "manish220030@gmail.com", role: "customer" },
    { email: "abhishek@zuvees.com", role: "admin" },
    { email: "abhishek@zuvees.com", role: "rider" },
    { email: "abhishek@zuvees.com", role: "customer" },
    { email: "manishkumar106033@gmail.com", role: "admin" },
    { email: "manishkumar106033@gmail.com", role: "rider" },
    { email: "manishkumar106033@gmail.com", role: "customer" },
  ];

  for (let item of emails) {
    const exists = await ApprovedEmail.findOne({ email: item.email });
    if (!exists) {
      await ApprovedEmail.create(item);
      console.log("Seeded:", item.email);
    }
  }

  console.log("✅ Seeding complete.");
  process.exit();
});
