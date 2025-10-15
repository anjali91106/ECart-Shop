type Review = {
  rating: number;
  comment: string;
  date: string; // ISO string
  reviewerName: string;
  reviewerEmail: string;
};

type Dimensions = {
  width: number;
  height: number;
};

type Meta = {
  [key: string]: any; // If you don’t know exact shape
};

export type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  images: string[];
  thumbnail: string;
  dimensions: Dimensions;
  weight: number;
  availabilityStatus: string;
  minimumOrderQuantity: number;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  reviews: Review[];
  sku: string;
  meta: Meta[];
};

export type err = string;