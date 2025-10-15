import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import type { Product } from "src/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");  // e.g. /search-products?q=apple
    const [products, setProducts] = useState<Product[]>([]);

    const searchApi = `http://localhost:3000/api/search?q=${query}`;

    useEffect(() => {
        async function productFind() {
            const searchedProducts = await axios.get(searchApi)
            setProducts(searchedProducts.data);
        }

        productFind();
    })


    return (
        <>
            {products.length === 0 ? (

                <h1 className="text-center text-xl font-semibold">No Results Found!!</h1>
            ) : (
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
                                                window.location.href = `product/${product._id}`
                                            }}
                                        >View</Button>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )
            }
        </>
    )
}

export default SearchProducts
