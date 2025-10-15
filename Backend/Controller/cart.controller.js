import productModel from "../Models/products.model.js";
import userModel from "../Models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;          // from JWT/session
    const { id } = req.params;           // product id

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found! Please sign up first." });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist!" });
    }

    // check if product already exists in user's cart
    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === product._id.toString()
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1; // increase quantity
    } else {
      user.cart.push({ 
        product: product._id, 
        quantity: 1 
      });
    }

    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const showAllProductsInCart = async(req, res) => {
  try {   
    const productInCart = await productModel.find();
    if (!productInCart) {
      return res.status(404).json({ message: "Your Cart is Empty!!" });
    }

    res.json(productInCart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params; // product id
    const deleteProduct = await cartModel.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(400).json({ message: "Product does not exist!" });
    }
    res.status(200).json({ message: "Removed From cart", deleteProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



