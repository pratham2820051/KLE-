import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const result = await User.deleteMany({ role: { $ne: "admin" } });
  console.log("Deleted:", result.deletedCount, "users (faculty + nurses)");
  const remaining = await User.countDocuments();
  console.log("Remaining:", remaining, "user(s) — admin only");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
