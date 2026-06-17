import mongoose from "mongoose";
import dotenv from "dotenv";
import { users, locations } from "./data/users.js";
import User from "./models/userModel.js";
import Location from "./models/locationModel.js";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to local MongoDB");

  await User.deleteMany();
  await Location.deleteMany();
  console.log("Cleared existing data");

  // Create location first
  const createdLocations = await Location.insertMany(locations);
  const defaultLocationId = createdLocations[0]._id.toString();
  console.log("Location created:", defaultLocationId);

  // Add locationId to all users
  const usersWithLocation = users.map(u => ({ ...u, locationId: defaultLocationId }));
  await User.insertMany(usersWithLocation);

  console.log("Data seeded successfully!");
  console.log(`${users.length} users and ${locations.length} location(s) added`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
