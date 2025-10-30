import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import type { Product } from "src/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Star, Tag, ShoppingCart } from 'lucide-react'; // Added icons

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const api = `http://localhost:3000/api/products/${id}`;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productDetails = await axios.get(api);
                setProduct(productDetails.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }
        fetchProducts();
    }, [api]) // Added 'api' to dependency array for correctness (though URL is constant)

    const handleCart = async(productId : string) => {
        const cartApi = `http://localhost:3000/cart/${productId}`;
        try {
            // Your original cart logic is preserved
            const addCart = await axios.post(cartApi, {}, {withCredentials: true});
            console.log("Added to Cart:", addCart.data);
            navigate('/cart');
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    if (!product) {
        return <div className="p-8 text-center text-gray-500">Loading Product Details...</div>;
    }

    // Determine badge color based on stock status
    const stockStatusClasses = product.availabilityStatus === 'In Stock'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700';

    return (
        <div className="container mx-auto p-4 md:p-8">
            <Card className="shadow-2xl rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5">
                    
                    {/* LEFT COLUMN: Image Gallery (Span 2 on large screens) */}
                    <div className="lg:col-span-2 p-4 md:p-8 border-r border-gray-100 bg-white">
                        
                        {/* Main Thumbnail */}
                        <div className="mb-6 bg-gray-50 rounded-lg p-4 flex justify-center items-center shadow-inner">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full max-h-[400px] object-contain rounded-md"
                            />
                        </div>

                        {/* Image Thumbnails (Footer Content moved here) */}
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {product.images.slice(0, 4).map((img, i) => ( // Show max 4 images
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product.title} image ${i + 1}`}
                                    className="w-20 h-20 object-cover rounded-md border-2 border-transparent hover:border-indigo-500 cursor-pointer transition"
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Product Information & Actions (Span 3 on large screens) */}
                    <div className="lg:col-span-3 p-4 md:p-8">
                        <CardHeader className="p-0 mb-4">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
                                {product.title}
                            </h1>
                            <p className="text-lg text-indigo-600 font-medium">{product.category}</p>
                        </CardHeader>
                        
                        {/* Price & Rating Section */}
                        <div className="flex items-center justify-between border-b pb-4 mb-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                <span className="text-sm text-gray-500 line-through">
                                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)} 
                                    ({product.discountPercentage}% OFF)
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xl font-bold text-yellow-500">
                                <Star className="w-6 h-6 fill-current" />
                                {product.rating.toFixed(1)}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button 
                                className="flex-1 text-white bg-indigo-600 hover:bg-gray-500 font-semibold py-3 transition duration-300 transform hover:scale-[1.01]"
                                onClick={() => handleCart(product._id)}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add To Cart
                            </Button>
                            <Button 
                                variant="outline" 
                                className="flex-1 text-indigo-600 border-indigo-600 hover:bg-indigo-50 font-semibold py-3"
                                onClick={() => { /* Placeholder for Buy Now functionality */ }}
                            >
                                Buy Now
                            </Button>
                        </div>
                        
                        {/* Product Description */}
                        <CardContent className="p-0 space-y-4">
                            <h3 className="text-xl font-semibold border-b pb-2 mb-2 text-gray-800">
                                Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Key Details Grid */}
                            <div className="grid grid-cols-2 gap-y-2 text-sm bg-gray-50 p-4 rounded-lg">
                                <p><span className="font-medium">Stock Status:</span> <span className={`font-bold ${stockStatusClasses}`}>{product.availabilityStatus}</span></p>
                                <p><span className="font-medium">Stock Qty:</span> {product.stock}</p>
                                {/* <p><span className="font-medium">Brand:</span> {product.brand}</p> */}
                                <p><span className="font-medium">Min. Order:</span> {product.minimumOrderQuantity}</p>
                                <p><span className="font-medium">Dimensions:</span> {product.dimensions.width} x {product.dimensions.height} 
                                {/* x {product.dimensions.depth}  */}
                                cm</p>
                                <p><span className="font-medium">Weight:</span> {product.weight}g</p>
                            </div>
                            
                            
                            {/* Tags Section */}
                            <div className="pt-2">
                                <span className="font-medium text-gray-800 flex items-center mb-2"><Tag className="w-4 h-4 mr-2"/> Product Tags: </span>
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>
            
            {/* Reviews Section (Moved outside the main Card for separation) */}
            <Card className="mt-8 p-6 shadow-xl rounded-xl">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Customer Reviews ({product.reviews.length})
                    </CardTitle>
                    <p className="text-sm text-gray-500">What others are saying about this product.</p>
                </CardHeader>
                <div className="space-y-4">
                    {product.reviews.map((review, i) => (
                        <div
                            key={i}
                            className="border-b last:border-b-0 pb-4"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="font-semibold text-gray-900">{review.reviewerName}</span>
                                    <div className="text-sm text-yellow-500">Rating: ⭐ {review.rating}</div>
                                </div>
                                <span className="text-xs text-gray-500 mt-1">{review.date}</span>
                            </div>

                            <p className="text-sm text-gray-700 italic">"{review.comment}"</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

export default ProductDetails;