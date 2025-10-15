import productModel from "../Models/products.model.js";

//show all the products
export const showProducts = async(req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message  });
    }
}

//show one product by id
export const findById = async(req, res) => {
    try{
        const {id} = req.params;
        const product = await productModel.findById(id);

        if(!product){
            res.status(400).json({message: "Sorry the product does not exists."});
        }

        res.json(product);

    }catch (error) {
        res.status(500).json({ message: "Something went wrong with products fetching!!", error: error.message });
    }
}

export const searchByQuery = async(req, res) => {
    try {
        const {q} = req.query;

    if(!q){
        return res.status(401).json({message: "Query is Required for search!"});
    }

     // Search in multiple fields using $or and regex
    const products = await productModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    });

     res.json(products);
    }catch (error) {
        res.status(500).json({ message: "Something went wrong with products fetching!!", error: error.message });
    }
}

