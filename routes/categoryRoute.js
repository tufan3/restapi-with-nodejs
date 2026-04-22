const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('../contrelloler/categoryController');
// const { authMiddleware } = require('../middlewares/authMiddleware');

const categoryRouter = require('express').Router();

// create category
categoryRouter.post("/categories", createCategory);
// all categories
categoryRouter.get("/categories", getAllCategories);
// update category
categoryRouter.put("/categories/:categoryId", updateCategory);
// delete category
categoryRouter.delete("/categories/:categoryId", deleteCategory);

module.exports = categoryRouter;