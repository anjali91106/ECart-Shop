import productModel from "./Models/products.model.js";

const api = "https://dummyjson.com/products";

const fetchProducts = async () => {
  try {
    const products = await fetch(api);
    const data = await products.json();
    saveProducts(data.products);
    console.log("Data fetched from API");
    // console.log(data.products);
  } catch (error) {
    console.log(error);
  }
};

const saveProducts = async (products) => {
  try {
    await productModel.insertMany(products);
    console.log("Products saved to database");
  } catch (error) {
    console.log("Error saving products:", error);
  }
};

export default fetchProducts;
