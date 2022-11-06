const express = require("express");
const router = express.Router();

const categoriesController = require('../controllers/categories');

//GET ALL CATEGORIES
router.get(`/`, categoriesController.getAllCategories);

//GET A SPECIFIC CATEGORY
router.get("/:id", categoriesController.getSpecificCategory);

//POST A NEW CATEGORY
router.post("/", categoriesController.AddCategory);

//UPDATE AN EXISTING CATEGORY
router.put("/:id", categoriesController.UpdateCategory);

//DELETE AN EXISTING CATEGORY
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;