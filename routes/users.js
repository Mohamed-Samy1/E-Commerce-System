const express = require("express");
const router = express.Router();

const usersController = require('../controllers/users');

//GET ALL USERS
router.get(`/`, usersController.getAllUsers);

//GET A SPECIFIC USER
router.get("/:id", usersController.getUser);

//POST A NEW USER
router.post("/", usersController.addUser);

//UPDATE AN EXISTING USER
router.put("/:id", usersController.updateUser);

//USER LOGIN
router.post("/login", usersController.login);

//USER SIGN UP
router.post("/register", usersController.signUp);

//DELETE AN EXISTING USER
router.delete("/:id", usersController.deleteUser);

//GET USERS COUNT STORED IN THE DATABASE
router.get(`/get/count`, usersController.howManyUsers);

module.exports = router;