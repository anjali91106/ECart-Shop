import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import type { Product } from "../lib/types";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
// import ExtraDetails from "./ExtraDetails";

// type CartProduct = {
//   title: string;
//   // add other properties as needed
// };

const Home = () => {
  const navigate = useNavigate();
  const api = 'http://localhost:3000/api/products';
  const [products, setProducts] = useState<Product[]>([]);
  // const [cartProduct, setCartProduct] = useState<CartProduct[]>([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await axios.get(api);
      setProducts(product.data);
      // console.log(product.data);
    }

    fetchProducts();
  }, [])

    const handleCart = async(productId : string) => {
    const api = `http://localhost:3000/cart/${productId}`;
    const addCart = await axios.post(api, {}, {withCredentials: true});
    console.log("ProductId", productId);

    // setCartProduct(addCart.data);
    console.log(addCart.data, "ADDED TO CART");
    }

  return (
    <>
      {/* <ExtraDetails/> */}
      <Carousel
        opts={{ align: "start" }}
        className="w-full z-0"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="h-full flex flex-col">
                  {/* Product Image */}
                  <CardContent className="flex justify-center items-center p-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-40 object-contain rounded-lg"
                    />
                  </CardContent>

                  {/* Product Info */}
                  <div className="px-4 pb-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-sm line-clamp-2">{product.description}</p>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold">${product.price}</span>
                      <span className="text-sm text-green-600">
                        {product.availabilityStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-yellow-500">
                      ⭐ {product.rating.toFixed(1)}
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      navigate(`product/${product._id}`)
                    }}
                  >View</Button>
                    <Button
                    onClick={() => handleCart(product._id)}
                  >Add To Cart</Button>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </>
  )
}

export default Home
