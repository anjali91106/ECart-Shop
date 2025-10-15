import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // every address belongs to a user
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
    match: [/^\d{6}$/, "Please enter a valid 6-digit postal code"], // for India, adjust if needed
  },
  country: {
    type: String,
    required: true,
    default: "India",
  },
  isDefault: {
    type: Boolean,
    default: false, // you can mark one address as default for shipping
  }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);
export default Address;
