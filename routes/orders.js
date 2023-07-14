const express = require("express");
const router = express.Router();

const ordersController = require('../controllers/orders');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         orderItems:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *               product:
 *                 type: string
 *             required:
 *               - quantity
 *               - product
 *         shippingAddress:
 *           type: string
 *         city:
 *           type: string
 *         zip:
 *           type: string
 *         country:
 *           type: string
 *         phone:
 *           type: string
 *         status:
 *           type: string
 *         totalPrice:
 *           type: number
 *         user:
 *           type: string
 *         dateOrdered:
 *           type: string
 *           format: date-time
 *       required:
 *         - orderItems
 *         - shippingAddress
 *         - city
 *         - zip
 *         - country
 *         - phone
 *         - status
 *         - totalPrice
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of all orders
 *     tags:
 *       - Orders
 *     description: Get a list of all orders from the database.
 *     responses:
 *       200:
 *         description: A list of all orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error or order list cannot be retrieved.
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
 *                   example: "Error message here"
 */
//GET ALL ORDERS
router.get(`/`, ordersController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags:
 *       - Orders
 *     description: Get a specific order from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order with the specified ID was not found.
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
 *                   example: "This order doesn't exist!"
 *       500:
 *         description: Internal server error or order cannot be retrieved.
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
//GET A SPECIFIC ORDER
router.get(`/:id`, ordersController.getOrder);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     description: Create a new order in the database.
 *     requestBody:
 *       description: Object containing order information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     product:
 *                       type: string
 *                       example: 615a06b14d9d8e1e8d6b0e4c
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main Street"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               zip:
 *                 type: string
 *                 example: "90001"
 *               country:
 *                 type: string
 *                 example: "United States"
 *               phone:
 *                 type: string
 *                 example: "555-555-5555"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *               user:
 *                 type: string
 *                 example: 615a06b14d9d8e1e8d6b0e4c
 *     responses:
 *       200:
 *         description: The newly created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: The order cannot be created.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "This order cannot be created!"
 *       500:
 *         description: Internal server error or order cannot be added.
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
//POST A NEW ORDER    (ERROR)
router.post("/", ordersController.addOrder);

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Update an order by ID
 *     tags:
 *       - Orders
 *     description: Update an existing order in the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Object containing updated order information.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: string
 *                 example: "123 Main Street"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               zip:
 *                 type: string
 *                 example: "90001"
 *               country:
 *                 type: string
 *                 example: "United States"
 *               phone:
 *                 type: string
 *                 example: "555-555-5555"
 *               status:
 *                 type: string
 *                 example: "Pending"
 *     responses:
 *       200:
 *         description: The updated order.
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
 *                   example: "Order updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: The order cannot be updated.
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
 *                   example: "Failed to update order"
 *       404:
 *         description: The order with the specified ID was not found.
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
 *                   example: "Order not found"
 *       500:
 *         description: Internal server error or order cannot be updated.
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
//MODIFY AN EXISTING ORDER
router.put("/:id", ordersController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags:
 *       - Orders
 *     description: Delete an existing order in the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The order was successfully deleted.
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
 *                   example: "The order is deleted!"
 *       404:
 *         description: The order with the specified ID was not found.
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
 *                   example: "Order not found!"
 *       500:
 *         description: Internal server error or order cannot be deleted.
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
//DELETE AN ORDER
router.delete("/:id", ordersController.deleteOrder);

/**
 * @swagger
 * /orders/get/sales:
 *   get:
 *     summary: Get the total sales amount of all orders
 *     tags:
 *       - Orders
 *     description: Get the total sales amount of all orders in the database.
 *     responses:
 *       200:
 *         description: The total sales amount of all orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalsales:
 *                   type: number
 *                   example: 10000
 *       400:
 *         description: The total sales cannot be generated.
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
 *                   example: "The order sales cannot be generated"
 *       500:
 *         description: Internal server error or orders cannot be retrieved.
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
//GET ALL THE TOTAL SALES WE MADE
router.get("/get/sales", ordersController.getTotalSales);

/**
 * @swagger
 * /orders/get/count:
 *   get:
 *     summary: Get the count of all orders
 *     tags:
 *       - Orders
 *     description: Get the count of all orders in the database.
 *     responses:
 *       200:
 *         description: The count of all orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderCount:
 *                   type: number
 *                   example: 50
 *       500:
 *         description: Internal server error or orders cannot be retrieved.
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
//GET THE COUNT OF ALL ORDERS
router.get(`/get/count`, ordersController.howManyOrders);

/**
 * @swagger
 * /orders/get/userorders/{userid}:
 *   get:
 *     summary: Get all orders made by a specific user
 *     tags:
 *       - Orders
 *     description: Get all orders made by a specific user in the database.
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: ID of the user to retrieve orders for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All orders made by the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error or orders cannot be retrieved.
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
//GET ALL THE ORDERS A SPECIFIC USER HAS MADE
router.get(`/get/userorders/:userid`, ordersController.getAllUserOrders);

module.exports = router;