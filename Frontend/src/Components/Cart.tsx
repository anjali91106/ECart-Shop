import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Heart,  Trash } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState<any[]>([]);

  useEffect(() => {
    const handleCart = async () => {
      const api = `http://localhost:3000/cart/cart-products`;
      const addCart = await axios.get(api);
      // console.log(addCart.data[0].productId, "CART PRODUCTS Id");
      // console.log(addCart.data[0].quantity, "CART PRODUCTS QUANTITY");
      // console.log(addCart.data[0].title, "CART PRODUCTS title");

      setCartProducts(addCart.data);
    }

    handleCart();
  }, [cartProducts])

  const handleItemDelete = async (itemId: string) => {
    try {
      const deleteApi = `http://localhost:3000/cart/delete-from-cart/${itemId}`;
      const { data } = await axios.delete(deleteApi);

      toast.success(`Item Deleted: ${data.deletedItem.productId}`);
      // console.log(data.deletedItem, "deleteddata")
    } catch (error) {
      toast.error("Failed to delete item");
    }
  }

  const handleQuantityChange = (id: string, newQuantity: any) => {
    // Prevent going below 1
    if (newQuantity < 1) return;

    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };


  return (
    <div className="p-4 max-w-5xl mx-auto">
      {cartProducts.length === 0 ? (
        <p className="text-center mt-10 text-gray-500  text-xl font-semibold">
          Your cart is empty. <hr />
          <Link to={'/'} className="text-white">Start</Link> Shopping Now.
        </p>
      ) : (
        <>
          {cartProducts.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 p-4 mb-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300"
            >
              {/* Product Image */}
              <img
                src={item.productId.images[0]}
                alt={item.productId.title}
                className="w-28 h-28 sm:w-24 sm:h-24 object-cover rounded-lg mx-auto sm:mx-0"
              />

              {/* Product Info */}
              <div className="flex flex-col flex-1 sm:ml-4 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-800">{item.productId.title}</h2>
                <p className="text-gray-600 mt-1">Price: ₹{item.productId.price * item.quantity}</p>

                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                  <Button
                    className="text-white m-0 p-0 h-0 w-0 text-center"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    -
                  </Button>

                  <span className="text-sm font-medium text-gray-700">
                    Quantity: {item.quantity}
                  </span>

                  <Button
                    className="text-white m-0 p-0 h-0 w-0 text-center"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 mt-3 sm:mt-0">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center gap-2"
                  onClick={() => handleItemDelete(item._id)}
                >
                  <Trash className="w-4 h-4" /> Remove
                </Button>

                <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Add To Wishlist
                </Button>

                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md flex items-center gap-2">
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
      <Toaster position="top-right" />
    </div>

  )
}


export default Cart
