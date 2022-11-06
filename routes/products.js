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