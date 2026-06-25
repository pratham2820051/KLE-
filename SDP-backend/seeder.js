import mongoose from "mongoose";
import dotenv from "dotenv";
import { users, locations } from "./data/users.js";
import User from "./models/userModel.js";
import Location from "./models/locationModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Location.deleteMany();

    // Create location first so we have its ID for the admin user
    const createdLocations = await Location.insertMany(locations);
    const defaultLocationId = createdLocations[0]._id.toString();

    // Use User.create() one by one so the pre-save bcrypt hook fires for each user
    for (const u of users) {
      await User.create({
        ...u,
        locationId: u.locationId || defaultLocationId,
      });
    }

    console.log("Data Imported!");
    return { success: true, message: "Data imported successfully" };
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Location.deleteMany();


    console.log("Data Destroyed!");
    return { success: true, message: "Data destroyed successfully" };
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

// Only run if this file is executed directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv[2] === "-d") {
    destroyData().then(() => {
      console.log("Seeder completed");
    }).catch(() => {
      console.log("Seeder failed");
    });
  } else {
    importData().then(() => {
      console.log("Seeder completed");
      process.exit(0);
    }).catch(() => {
      console.log("Seeder failed");
      process.exit(1);
    });
  }
}

export { importData, destroyData };
