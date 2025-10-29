import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
      // userId: { type: String, required: true }, 
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" ,required: true },
      quantity: { type: Number, required: true },
})

const cartModel = mongoose.model('cart', cartSchema);
export default cartModel;

