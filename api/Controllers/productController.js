const {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService
} = require('../Services/productService');

const getProductsController = async(req, res) => {
    try{
        const products = await getProductsService();
        res.status(200).json({products});
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const getProductByIdController = async(req, res) => {
    try{
        const { product_id } = req.body;
        const productById = await getProductByIdService(product_id);
        
        if (productById) {
            res.status(200).json({ productById });
          } else {
            res.status(404).json({ message: 'Product not found' });
          }

    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const createProductController = async(req, res) => {
    try{
        const product = req.body;
        const newProduct = await createProductService(product);
        res.status(200).json({product: newProduct});
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}
const updateProductController = async(req, res) => {
    try{
        const {product_id} = req.params;
        const product = req.body;
        const updatedProduct = await updateProductService(product_id, product);
        res.status(200).json({updatedProduct});
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const deleteProductController = async(req, res) => {
    try{
        const { product_id } = req.params; 
        const productDeleted = await deleteProductService(product_id);
    
        if (productDeleted) {
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

module.exports = {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
};