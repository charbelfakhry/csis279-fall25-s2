const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');


const getCategoriesController = async(req, res) => {
    try{
        const categories = await getCategories();
        res.status(200).json({categories});
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const getCategoryByIdController = async(req, res) => {
    try {
        const { category_id }= req.body;
        const category = await getCategoryById(category_id);

        if (category) {
        res.status(200).json({ category });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const createCategoryController = async(req, res) => {
    try{
        const { category_name } = req.body;
        const newCategory = await createCategory(category_name);
        res.status(200).json({category: newCategory});
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const updateCategoryController = async(req, res) => {
    try{
        const { category_id } = req.params;
        const { category_name } = req.body;
        const updatedCategory = await updateCategory(category_id, category_name);
        res.status(200).json({updatedCategory});
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}

const deleteCategoryController = async(req, res) => {
    try{
        const { category_id } = req.params;
        const deleted = await deleteCategory(category_id);
  
      if (deleted) {
        res.status(200).json({ message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    
    }catch(error) {
        res.status(500).json({message:error?.message});
    }
}


module.exports = {
    getCategoriesController,
    getCategoryByIdController,
    createCategoryController,
    updateCategoryController,
    deleteCategoryController,
}; 