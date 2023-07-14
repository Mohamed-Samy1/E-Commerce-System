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

//GET A SPECIFIC PRODUCT
router.get(`/:id`, productsController.getProduct);

//POST A NEW PRODUCT
router.post(`/`, uploadOptions.single('image'), productsController.addProduct);

//UPDATE AN EXISTING PRODUCT
router.put("/:id", uploadOptions.single('image'), productsController.updateProduct);

//DELETE AN EXISTING PRODUCT
router.delete("/:id", productsController.deleteProduct);

//GET THE COUNT OF PRODUCTS
router.get(`/get/count`, productsController.howManyProducts);

//GET FEATURED PRODUCTS ONLY
router.get(`/get/featured/:count`, productsController.getFeaturedProducts);

module.exports = router;