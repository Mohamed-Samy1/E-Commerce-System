const express = require("express");
const router = express.Router();

const ordersController = require('../controllers/orders');

//GET ALL ORDERS
router.get(`/`, ordersController.getAllOrders);

//GET A SPECIFIC ORDER
router.get(`/:id`, ordersController.getOrder);

//POST A NEW ORDER
router.post("/", ordersController.addOrder);

//MODIFY AN EXISTING ORDER
router.put("/:id", ordersController.updateOrder);

//DELETE AN ORDER
router.delete("/:id", ordersController.deleteOrder);

//GET ALL THE TOTAL SALES WE MADE
router.get("/get/totalsales", ordersController.getTotalSales);

//GET THE COUNT OF ALL ORDERS
router.get(`/get/count`, ordersController.howManyOrders);

//GET ALL THE ORDERS A SPECIFIC USER HAS MADE
router.get(`/get/userorders/:userid`, ordersController.getAllUserOrders);

module.exports = router;