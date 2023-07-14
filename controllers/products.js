const express = require("express");
const mongoose = require("mongoose");

const { Category } = require("../models/category");
const { Product } = require("../models/product");

//GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  // localhost:3000/api/v1/products?categories=2342342,234234
  try {
    const productList = await Product.find().populate("category");

    if (!productList) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).json({ success: true, data: productList });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//GET A SPECIFIC PRODUCT
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
    } else {
      res.status(200).json({ success: true, data: product });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//POST A NEW PRODUCT
exports.addProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category)
      return res
        .status(400)
        .json({ success: false, message: "Invalid Category" });

    const file = req.file;
    if (!file)
      return res
        .status(400)
        .json({
          success: false,
          message: "Image is required to add a new product!",
        });

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
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

    if (!product)
      return res
        .status(500)
        .json({ success: false, message: "The product cannot be created" });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//UPDATE AN EXISTING PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid Product Id!" });
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).json({ success: false, message: "Invalid Category!" });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).json({ success: false, message: "Invalid Product!" });

    const file = req.file;
    let imagePath;

    if (file) {
      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
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
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(500).json({ success: false, message: "This product cannot be updated!" });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//DELETE AN EXISTING PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.id);

    if (deletedProduct) {
      return res.status(200).json({ success: true, message: "The product is now deleted!" });
    } else {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

//GET THE COUNT OF PRODUCTS
exports.getProductsCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (!productCount) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({ success: true, data: { productCount } });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//GET FEATURED PRODUCTS ONLY
exports.getFeaturedProducts = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);

    if (!products) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
