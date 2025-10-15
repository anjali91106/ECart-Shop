import mongoose from "mongoose";
import { MONGODB_CONNECTION_STRING } from "../config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_STRING);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
