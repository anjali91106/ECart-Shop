import mongoose from "mongoose";
import Address from "./address.model.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [120, "Age seems unrealistic"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    email: {
      type: String,
      required: true,
      unique: true, // prevent duplicates
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // password required only if not OAuth
      },
      minlength: [8, "Password must be at least 8 characters long"], // min length 6
    },
    phoneNo: {
      type: String,
      required: function () {
        return !this.googleId; // password required only if not OAuth
      },
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    googleId: {
      type: String, // store Google OAuth ID here
    },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: [
      Address.schema  // embedding address sub-documents
    ]
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
