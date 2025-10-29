import productModel from "../Models/products.model.js";
// import userModel from "../Models/user.model.js";
import cartModel from "../Models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    // const userId = req.user.id;          
    const { id } = req.params;           // product id

    // const user = await userModel.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found! Please sign up first." });
    // }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist!" });
    }

    // check if product already exists in user's cart
    const existingCartItem = await cartModel.findOne({ productId: product._id });

     if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return res.status(200).json({ message: "Quantity increased", cartItem: existingCartItem });
    }

    // await user.save();
    // res.status(200).json({ message: "Product added to cart", cart: user.cart });

    const cartItem = new cartModel({
      productId: product._id,
      quantity: 1
    })

    await cartItem.save();
    res.status(200).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const showAllProductsInCart = async (req, res) => {
  try {
    const productInCart = await cartModel.find().populate('productId'); // show full product details

    if (!productInCart || productInCart.length === 0) {
      return res.status(404).json({ message: "Your Cart is Empty!!" });
    }

    res.status(200).json(productInCart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteFromCart = async (req, res) => {
  try {
    const { id } = req.params; // cart item ID
    const deletedItem = await cartModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.status(200).json({ message: "Removed from cart", deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateCartItemQuantity = async (req, res) => {
  try {
    const { id } = req.params; // cart item ID
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    const cartItem = await cartModel.findByIdAndUpdate(
      id,
      { quantity: quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.status(200).json({ message: "Cart item updated", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await cartModel.deleteMany(); // later use { userId } filter
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCartTotal = async (req, res) => {
  try {
    const cartItems = await cartModel.find().populate('productId', 'price');

    const total = cartItems.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    res.status(200).json({ total, cartItems });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





