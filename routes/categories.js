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

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a specific category
 *     tags:
 *       - Categories
 *     description: Retrieve a specific category by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to retrieve.
 *     responses:
 *       200:
 *         description: The requested category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */

//GET A SPECIFIC CATEGORY
router.get("/:id", categoriesController.getSpecificCategory);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a new category
 *     tags:
 *       - Categories
 *     description: Create a new category with the specified name, icon, and color.
 *     requestBody:
 *       description: The category object to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new category.
 *               icon:
 *                 type: string
 *                 description: The icon for the new category.
 *               color:
 *                 type: string
 *                 description: The color for the new category.
 *             example:
 *               name: Category 1
 *               icon: icon1
 *               color: #000000
 *     responses:
 *       201:
 *         description: The newly created category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Category could not be created.
 *       500:
 *         description: Internal server error.
 */
//POST A NEW CATEGORY
router.post("/", categoriesController.addCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags:
 *       - Categories
 *     description: Update the specified category with the specified name, icon, and color.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update.
 *     requestBody:
 *       description: The category object to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *               icon:
 *                 type: string
 *                 description: The icon for the category.
 *               color:
 *                 type: string
 *                 description: The color for the category.
 *             example:
 *               name: Category 1
 *               icon: icon1
 *               color: #000000
 *     responses:
 *       200:
 *         description: The updated category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
//UPDATE AN EXISTING CATEGORY
router.put("/:id", categoriesController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete an existing category
 *     tags:
 *       - Categories
 *     description: Delete the specified category by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to delete.
 *     responses:
 *       200:
 *         description: The category was successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful.
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                 data:
 *                   type: object
 *                   description: The deleted category.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the category.
 *                     name:
 *                       type: string
 *                       description: The name of the category.
 *                     icon:
 *                       type: string
 *                       description: The icon of the category.
 *                     color:
 *                       type: string
 *                       description: The color of the category.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
//DELETE AN EXISTING CATEGORY
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;