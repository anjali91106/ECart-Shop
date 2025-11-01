import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card"; // Added CardHeader, CardTitle, CardFooter
import type { Product } from "../lib/types";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Truck, Shield, Star, ShoppingCart } from 'lucide-react'; // Icons for better visual appeal

const Home = () => {
  const navigate = useNavigate();
  const api = 'https://ecart-shop.onrender.com/api/products';
  const [products, setProducts] = useState<Product[]>([]);
  
  // State to hold a subset of products for the main grid display (e.g., first 6)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(api);
        const allProducts = response.data as Product[];
        setProducts(allProducts);
        // Select the first 6 products for the Featured Grid
        setFeaturedProducts(allProducts.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [])

  const handleCart = async(productId : string) => {
    const cartApi = `https://ecart-shop.onrender.com/cart/${productId}`;
    try {
      const addCart = await axios.post(cartApi, {}, {withCredentials: true});
      console.log("Added to Cart:", addCart.data);
      navigate('/cart');
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error (e.g., show a toast notification)
    }
  }
  

  // --- Utility Component for Product Card (Reusable) ---
  const ProductItem = ({ product }: { product: Product }) => (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl group">
      {/* Image & Header */}
      <CardHeader className="p-0 border-b relative overflow-hidden">
        {/* Placeholder for a realistic image aspect ratio */}
        <div className="aspect-video w-full flex justify-center items-center p-4 bg-gray-50">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-32 object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
          />
        </div>
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          {product.rating.toFixed(1)}
        </div>
      </CardHeader>
      
      {/* Product Info */}
      <CardContent className="p-4 flex flex-col flex-grow gap-2">
        <CardTitle className="text-xl font-bold line-clamp-2 text-gray-800">
          {product.title}
        </CardTitle>
        <p className="text-xs text-indigo-600 font-medium uppercase">{product.category}</p>
        
        {/* Price and Status */}
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-2xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.availabilityStatus === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.availabilityStatus}
          </span>
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 transition"
          onClick={() => { navigate(`product/${product._id}`) }}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="w-12 h-12 p-0 border-indigo-300 text-white hover:text-gray-500"
          onClick={() => handleCart(product._id)}
        >
          <ShoppingCart className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container mx-auto p-0">

      {/* 1. HERO SECTION (Banner) */}
      <section className="relative h-[400px] md:h-[500px] bg-indigo-500/90 flex items-center justify-center mb-12 shadow-2xl rounded-lg overflow-hidden">
        {/* FAKE BACKGROUND IMAGE (for better aesthetics) */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555529699-fa2f2c8d28e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')` }}></div>
        
        <div className="relative text-center p-8 z-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
            Discover Your Next Favorite Thing
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 mb-8">
            The best deals and freshest products, delivered right to your door.
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-400 text-white hover:bg-yellow-300 text-lg font-bold py-3 px-8 transition-transform transform hover:scale-105 shadow-lg"
            onClick={() => { /* Navigate to a full catalog page, if available */ }}
          >
            Shop All Categories
          </Button>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS (Grid Display) */}
      <section className="px-4 md:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-2">
          🔥 Featured Collections
        </h2>
        
        {/* Standard Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductItem key={`feat-${product._id}`} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center py-10 text-gray-500">Loading featured products...</p>
          )}
        </div>
        
        {/* 'View All' Button */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="text-white border-indigo-600 hover:text-gray-500"
            onClick={() => { /* navigate('/products'); */ }}
          >
            View All Products
          </Button>
        </div>
      </section>
      
      {/* 3. VALUE PROPOSITION / TRUST BADGES */}
      <section className="bg-gray-100 py-10 px-4 md:px-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose E-Cart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <Truck className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Fast Global Shipping</h3>
            <p className="text-gray-600 text-sm">Delivered to your door in 3-5 business days, guaranteed.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <Shield className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">Industry-standard encryption protects every transaction.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <Star className="w-10 h-10 text-indigo-600 mx-auto mb-3 fill-indigo-600" />
            <h3 className="text-xl font-semibold mb-2">Top-Rated Quality</h3>
            <p className="text-gray-600 text-sm">We only stock products verified by customer reviews.</p>
          </div>
        </div>
      </section>


      {/* 4. PRODUCTS CAROUSEL (Original Carousel - Now for 'New Arrivals') */}
      <section className="px-4 md:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b pb-2">
          ✨ New Arrivals & Trending
        </h2>
        <Carousel
          opts={{ align: "start" }}
          className="w-full z-0"
        >
          <CarouselContent className="-ml-2">
            {products.map((product) => (
              <CarouselItem key={`carousel-${product._id}`} className="pl-2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="p-0">
                  <ProductItem product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>
    </div>
  )
}

export default Home;