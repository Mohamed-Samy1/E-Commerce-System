const express = require("express");
const mongoose = require('mongoose');

const { Category } = require("../models/category");
const { Product } = require("../models/product");

//GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  // localhost:3000/api/v1/products?categories=2342342,234234
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
};

//GET A SPECIFIC PRODUCT
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
};

//POST A NEW PRODUCT
exports.addProduct = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const file = req.file;
  if (!file) return res.status(400).send('Image is required to add a new product!');

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: `${basePath}${fileName}`, //http://localhost:3000/public/public/fileName
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.status(200).send(product);
};

//UPDATE AN EXISTING PRODUCT
exports.updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id!");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category!");

  const product = await Product.findById(req.params.id);
  if (!product) return res.status(400).send("Invalid Product!");

  const file = req.file;
  let imagePath;

  if (file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
    imagePath = `${basePath}${fileName}`;
  } else {
    imagePath = product.image;
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      image: imagePath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    },
    { new: true }
  );

  if (!updatedProduct) return res.status(500).send("This product cannot be updated!");

  res.send(updatedProduct);
};

//DELETE AN EXISTING PRODUCT
exports.deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "The product is now deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};

//GET THE COUNT OF PRODUCTS
exports.howManyProducts = async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCount,
  });
};

//GET FEATURED PRODUCTS ONLY
exports.getFeaturedProducts = async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
};