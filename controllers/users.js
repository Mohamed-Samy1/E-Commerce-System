const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

//GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
};

//GET A SPECIFIC USER
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found." });
  }
  res.status(200).send(user);
};

//POST A NEW USER
exports.addUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
};

//UPDATE AN EXISTING USER
exports.updateUser = async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
};

//USER LOGIN
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send("password is wrong!");
  }
};

//USER SIGN UP
exports.signUp = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
};

//DELETE AN EXISTING USER
exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};

//GET USERS COUNT STORED IN THE DATABASE 
exports.getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments((count) => count);

    if (!userCount) {
      res.status(500).json({ success: false });
    }
    res.status(200).json({
      userCount: userCount
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error, could not count users."
    });
  }
};