import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
      // userId: { type: String, required: true }, // reference user
      productId: { type: String, required: true },
      title: { type: String },
      price: { type: Number},
      quantity: { type: Number, required: true },
      stock: { type: Number },
})

const cartModel = mongoose.model('cart', cartSchema);
export default cartModel;

