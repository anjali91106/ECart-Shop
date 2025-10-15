import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Product } from "src/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "lucide-react";
import { Button } from "./ui/button";

const ProductDetails = () => {
    const { id } = useParams();
    const api = `http://localhost:3000/api/products/${id}`;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const productDetails = await axios.get(api);
            setProduct(productDetails.data);
            // console.log(productDetails.data);
        }

        fetchProducts();
    }, [])

    return (
        <Card className="w-full w-screen-md mx-auto shadow-lg rounded-2xl">
            {product ? (
                <>
                    {/* Header with Title & Thumbnail */}
                    <CardHeader className="flex flex-col items-center gap-2">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-max h-max object-contain rounded-md"
                        />
                        <CardTitle className="text-xl font-semibold text-center">
                            {product.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <Button>Add To Cart</Button>
                    </CardHeader>

                    {/* Main Content */}
                    <CardContent className="space-y-3 text-sm">
                        <p>{product.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-gray-700">
                            <p><span className="font-medium">Price:</span> ${product.price}</p>
                            <p><span className="font-medium">Discount:</span> {product.discountPercentage}%</p>
                            <p><span className="font-medium">Stock:</span> {product.stock} ({product.availabilityStatus})</p>
                            <p><span className="font-medium">Rating:</span> ⭐ {product.rating}</p>
                            <p><span className="font-medium">Min. Order:</span> {product.minimumOrderQuantity}</p>
                            <p><span className="font-medium">Weight:</span> {product.weight}g</p>
                            <p><span className="font-medium">Dimensions:</span> {product.dimensions.width} x {product.dimensions.height}</p>
                        </div>

                        <div>
                            <span className="font-medium">Tags: </span>
                            {product.tags.map((tag, index) => (
                                <Badge key={index} className="mr-1">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="text-xs text-gray-500">
                            <p><span className="font-medium">SKU:</span> {product.sku}</p>
                            <p><span className="font-medium">Shipping:</span> {product.shippingInformation}</p>
                            <p><span className="font-medium">Return Policy:</span> {product.returnPolicy}</p>
                            <p><span className="font-medium">Warranty:</span> {product.warrantyInformation}</p>
                        </div>
                    </CardContent>

                    {/* Footer with images */}
                    <CardFooter className="flex flex-col gap-2 justify-center">
                        {product.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`${product.title}-${i}`}
                                className="w-max h-max object-contain rounded-md border"
                            />
                        ))}

                        <div className="mt-4 space-y-4">
                            <h3 className="text-lg font-semibold">Customer Reviews</h3>
                            <div className="space-y-3">
                                {product.reviews.map((review, i) => (
                                    <div
                                        key={i}
                                        className="border rounded-lg p-3 shadow-sm space-y-1"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{review.reviewerName}</span>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>

                                        <p className="text-sm text-gray-700">{review.comment}</p>

                                        <div className="text-sm text-gray-600">
                                            Rating: ⭐ {review.rating}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </CardFooter>
                </>
            ) : (
                <div className="p-8 text-center text-gray-500">Loading...</div>
            )}
        </Card>
    )
}

export default ProductDetails
