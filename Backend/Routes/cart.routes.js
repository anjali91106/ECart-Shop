import express from 'express';
import { addToCart, clearCart, deleteFromCart, getCartTotal, showAllProductsInCart, updateCartItemQuantity } from '../Controller/cart.controller.js';
// import {verifyToken} from '../middleware/authMiddleware.js'

const cartRoute = express.Router();

// cartRoute.post("/:id" , verifyToken, addToCart); // later use verifyToken middleware
cartRoute.post("/:id" , addToCart);
cartRoute.get("/cart-products", showAllProductsInCart);
cartRoute.delete("/delete-from-cart/:id", deleteFromCart);
cartRoute.delete("/clear-cart", clearCart);
cartRoute.put("/update-cart-item/:id", updateCartItemQuantity);
cartRoute.post('/getTotalCartValue', getCartTotal);

export default cartRoute;

