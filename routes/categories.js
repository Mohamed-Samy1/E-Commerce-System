const express = require("express");
const router = express.Router();

const categoriesController = require('../controllers/categories');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         icon:
 *           type: string
 *         color:
 *           type: string
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: 
 *        - Categories
 *     description: Retrieve a list of all categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */
//GET ALL CATEGORIES
router.get(`/`, categoriesController.getAllCategories);

//GET A SPECIFIC CATEGORY
router.get("/:id", categoriesController.getSpecificCategory);

//POST A NEW CATEGORY
router.post("/", categoriesController.addCategory);

//UPDATE AN EXISTING CATEGORY
router.put("/:id", categoriesController.updateCategory);

//DELETE AN EXISTING CATEGORY
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;