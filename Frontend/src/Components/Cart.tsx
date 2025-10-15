import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

type CartProduct = {
  title: string;
  // add other properties as needed
};

const Cart = () => {
   const { productId } = useParams();
   const [cartProduct, setCartProduct] = useState<CartProduct[]>([]);
  //  const cartApt = `http://localhost:3000/cart/cart-products`

  useEffect(() => {
    const handleCart = async() => {
    const api = `http://localhost:3000/cart/${productId}`;
    const addCart = await axios.post(api, `${productId}` ,{withCredentials: true});

    setCartProduct(addCart.data);
    console.log(addCart.data, "ADDED TO CART");

    handleCart();
  }
  } , [])

  return (
    <div>
      {cartProduct.map((product, index) => (
        <div key={index}>
          {product.title}
        </div>
      ))}
    </div>
  )
}

export default Cart
