import express from 'express';
import { addToCart, showAllProductsInCart } from '../Controller/cart.controller.js';
import {verifyToken} from '../middleware/authMiddleware.js'

const cartRoute = express.Router();

cartRoute.post("/:id" , verifyToken, addToCart);
cartRoute.get("/cart-products", showAllProductsInCart);

export default cartRoute;

