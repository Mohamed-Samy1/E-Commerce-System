const express = require("express");
const router = express.Router();
const multer = require('multer');

const productsController = require('../controllers/products');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

//CONFIG DiskStorage: GIVES YOU FULL CONTROL ON USING FILES ON DISK.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type!');
    if(isValid) uploadError = null;

    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(' ', '-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})
const uploadOptions = multer({ storage: storage })

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         brand:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         category:
 *           type: string
 *           description: The ID of the category that the product belongs to.
 *         countInStock:
 *           type: integer
 *         rating:
 *           type: number
 *           format: float
 *         numReviews:
 *           type: integer
 *         isFeatured:
 *           type: boolean
 *         dateCreated:
 *           type: string
 *           format: date-time
 *         id:
 *           type: string
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: 
 *        - Products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */
//GET ALL PRODUCTS
router.get(`/`, productsController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a specific product
 *     tags: 
 *        - Products
 *     description: Retrieve a specific product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Product not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
//GET A SPECIFIC PRODUCT
router.get(`/:id`, productsController.getProduct);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: 
 *        - Products
 *     description: Add a new product to the database.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         required: true
 *         description: Name of the new product.
 *         type: string
 *       - in: formData
 *         name: description
 *         required: true
 *         description: Description of the new product.
 *         type: string
 *       - in: formData
 *         name: image
 *         required: true
 *         description: Image of the new product.
 *         type: file
 *       - in: formData
 *         name: brand
 *         required: true
 *         description: Brand of the new product.
 *         type: string
 *       - in: formData
 *         name: price
 *         required: true
 *         description: Price of the new product.
 *         type: number
 *       - in: formData
 *         name: category
 *         required: true
 *         description: Category ID of the new product.
 *         type: string
 *       - in: formData
 *         name: countInStock
 *         required: true
 *         description: Number of units of the new product in stock.
 *         type: number
 *       - in: formData
 *         name: rating
 *         required: true
 *         description: Rating of the new product.
 *         type: number
 *       - in: formData
 *         name: numReviews
 *         required: true
 *         description: Number of reviews of the new product.
 *         type: number
 *       - in: formData
 *         name: isFeatured
 *         required: true
 *         description: Whether the new product is featured or not.
 *         type: boolean
 *     responses:
 *       201:
 *         description: A new product is created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid category or image not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid Category or Image is required to add a new product!"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
//POST A NEW PRODUCT
router.post(`/`, uploadOptions.single('image'), productsController.addProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: 
 *        - Products
 *     description: Update an existing product in the database.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to be updated.
 *         type: string
 *       - in: formData
 *         name: name
 *         required: true
 *         description: Name of the product to be updated.
 *         type: string
 *       - in: formData
 *         name: description
 *         required: true
 *         description: Description of the product to be updated.
 *         type: string
 *       - in: formData
 *         name: image
 *         required: false
 *         description: Image of the product to be updated.
 *         type: file
 *       - in: formData
 *         name: brand
 *         required: true
 *         description: Brand of the product to be updated.
 *         type: string
 *       - in: formData
 *         name: price
 *         required: true
 *         description: Price of the product to be updated.
 *         type: number
 *       - in: formData
 *         name: category
 *         required: true
 *         description: Category ID of the product to be updated.
 *         type: string
 *       - in: formData
 *         name: countInStock
 *         required: true
 *         description: Number of units of the product to be updated in stock.
 *         type: number
 *       - in: formData
 *         name: rating
 *         required: true
 *         description: Rating of the product to be updated.
 *         type: number
 *       - in: formData
 *         name: numReviews
 *         required: true
 *         description: Number of reviews of the product to be updated.
 *         type: number
 *       - in: formData
 *         name: isFeatured
 *         required: true
 *         description: Whether the product to be updated is featured or not.
 *         type: boolean
 *     responses:
 *       200:
 *         description: An existing product is updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid category or image not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid Category or Image is required to update a prodcut!"
 *       500:
 *         description: Internal server error or product cannot be updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "This product cannot be updated!"
 */
//UPDATE AN EXISTING PRODUCT
router.put("/:id", uploadOptions.single('image'), productsController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete an existing product
 *     tags:
 *       - Products
 *     description: Delete an existing product from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to be deleted.
 *         type: string
 *     responses:
 *       200:
 *         description: An existing product is deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "The product is now deleted!"
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Product not found!"
 *       500:
 *         description: Internal server error or product cannot be deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 */
//DELETE AN EXISTING PRODUCT
router.delete("/:id", productsController.deleteProduct);

/**
 * @swagger
 * /products/get/count:
 *   get:
 *     summary: Get the count of all products
 *     tags:
 *       - Products
 *     description: Get the total count of all products in the database.
 *     responses:
 *       200:
 *         description: The count of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     productCount:
 *                       type: number
 *                       example: 15
 *       500:
 *         description: Internal server error or product count cannot be retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 */
//GET THE COUNT OF PRODUCTS
router.get(`/get/count`, productsController.getProductsCount);

/**
 * @swagger
 * /products/get/featured/{count}:
 *   get:
 *     summary: Get a list of featured products
 *     tags:
 *       - Products
 *     description: Get a list of featured products from the database.
 *     parameters:
 *       - in: path
 *         name: count
 *         required: false
 *         description: Maximum number of featured products to return.
 *         type: integer
 *     responses:
 *       200:
 *         description: A list of featured products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error or featured products cannot be retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 */
//GET FEATURED PRODUCTS ONLY
router.get(`/get/featured/:count`, productsController.getFeaturedProducts);

module.exports = router;