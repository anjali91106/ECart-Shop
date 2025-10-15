import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
      userId: { type: String, required: true }, // reference user
      productId: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      stock: { type: Number, required: true },
})

const cartModel = mongoose.model('cart', cartSchema);
export default cartModel;

