import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
      title: String,
      description: String,
      category: String,
      price: Number,
      discountPercentage: Number,
      rating: Number,
      stock: Number,
      tags: [String],
      sku: String,
      weight: Number,
      dimensions: {
          length: Number,
          width: Number,
          height: Number
      },
      warrantyInformation: String,
      shippingInformation: String,
      availabilityStatus: String,
      reviews: [Object],
      returnPolicy: String,
      minimumOrderQuantity: Number,
      meta: [Object],
      images: [String],
      thumbnail: String
});

const productModel = mongoose.model('products', productSchema);
export default productModel;
