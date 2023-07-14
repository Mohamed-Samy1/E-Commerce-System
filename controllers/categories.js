const express = require("express");

const { Category } = require("../models/category");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categoryList = await Category.find();

    if (!categoryList) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).json({ success: true, data: categoryList });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//GET A SPECIFIC CATEGORY
exports.getSpecificCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
    } else {
      res.status(200).json({ success: true, data: category });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//Add A NEW CATEGORY
exports.addCategory = async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    category = await category.save();

    if (!category) {
      res
        .status(400)
        .json({ success: false, message: "Category could not be created" });
    } else {
      res.status(201).json({ success: true, data: category });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//UPDATE AN EXISTING CATEGORY
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon || category.icon,
        color: req.body.color,
      },
      { new: true }
    );

    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
    } else {
      res.status(200).json({ success: true, data: category });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

//DELETE AN EXISTING CATEGORY
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
    } else {
      res.status(200).json({ success: true, message: "Category deleted" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
