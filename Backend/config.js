import dotenv from "dotenv";
dotenv.config();

export const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MONGODB_CONNECTION_STRING,
  SECRET_KEY,
  PORT
} = process.env;