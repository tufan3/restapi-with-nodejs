const Category = require('../models/categoryModel');

// create category
exports.createCategory = async (req, res, next) => {
    try{
        const { name, status } = req.body;
        if(!name){
            return res.status(400).json({ message: "Category name is required" });
        }

        const existingCategory = await Category.findOne({ name });
        if(existingCategory){
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = await Category.create({ name });
        res.status(201).json({ 
            message: "Category created successfully",
            category: category,
        });

    } catch(error){
        res.status(500).json({ 
            message: "Error creating category",
            error: error.message
        });
    }
}

// get all categories
exports.getAllCategories = async (req, res, next) =>{
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: "Categories fetched successfully",
            categories: categories,
        });
    }catch (error) {
        res.status(500).json({ 
            message: "Error fetching categories",
            error: error.message
        });
    }
}

// update category
exports.updateCategory = async(req, res, next) => {
    try{
        const categoryId = req.params.categoryId;
        const category = await Category.findById(categoryId);
        if(!category){
            return res.status(404).json({ message: "Category not found" });
        }
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            req.body,
            { new: true }
        );
        res.status(200).json({ 
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch(error){
        res.status(500).json({ 
            message: "Error updating category",
            error: error.message
        });
    }
}

// delete category
exports.deleteCategory = async(req, res, next) => {
    try{
        const category = req.params.categoryId;
        const existingCategory = await Category.findById(category);
        if(!existingCategory){
            return res.status(404).json({ message: "Category not found" });
        }
        const deletedCategory = await Category.findByIdAndDelete(category);
        res.status(200).json({ 
            message: "Category deleted successfully",
            category: deletedCategory
        });
    }catch(error){
        res.status(500).json({ 
            message: "Error deleting category",
            error: error.message
        });
    }
}