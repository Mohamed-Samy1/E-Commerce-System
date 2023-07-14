express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *         street:
 *           type: string
 *         apartment:
 *           type: string
 *         zip:
 *           type: string
 *         city:
 *           type: string
 *         country:
 *           type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: 
 *        - Users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */

//GET ALL USERS
router.get(`/`, usersController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user
 *     tags: 
 *        - Users
 *     description: Retrieve a specific user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */

//GET A SPECIFIC USER
router.get("/:id", usersController.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     tags: 
 *        - Users
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. The user cannot be created.
 */

//POST A NEW USER
router.post("/", usersController.addUser);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update an existing user
 *     tags: 
 *        - Users
 *     description: Update an existing user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request. The user cannot be updated.
 */

//UPDATE AN EXISTING USER
router.put("/:id", usersController.updateUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: 
 *        - Users
 *     description: Authenticate a user and generate a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: The email of the logged-in user.
 *                 token:
 *                   type: string
 *                   description: The generated authentication token.
 *       400:
 *         description: Invalid credentials.
 */
//USER LOGIN
router.post("/login", usersController.login);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registers a new user
 *     tags: 
 *        - Users
 *     description: Registers a new user with their name, email, password, phone, and address details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               isAdmin:
 *                 type: boolean
 *                 description: Indicates whether the user is an admin
 *               street:
 *                 type: string
 *                 description: The user's street address
 *               apartment:
 *                 type: string
 *                 description: The user's apartment or unit number
 *               zip:
 *                 type: string
 *                 description: The user's zip or postal code
 *               city:
 *                 type: string
 *                 description: The user's city
 *               country:
 *                 type: string
 *                 description: The user's country
 *     responses:
 *       '200':
 *         description: A successful registration response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                 phone:
 *                   type: string
 *                   description: The user's phone number
 *                 isAdmin:
 *                   type: boolean
 *                   description: Indicates whether the user is an admin
 *                 street:
 *                   type: string
 *                   description: The user's street address
 *                 apartment:
 *                   type: string
 *                   description: The user's apartment or unit number
 *                 zip:
 *                   type: string
 *                   description: The user's zip or postal code
 *                 city:
 *                   type: string
 *                   description: The user's city
 *                 country:
 *                   type: string
 *                   description: The user's country
 *       '400':
 *         description: A bad request error response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 'the user cannot be created!'
 */
//USER SIGN UP
router.post("/register", usersController.signUp);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletes a user by ID
 *     tags: 
 *        - Users
 *     description: Deletes an existing user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful delete response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the delete was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message confirming the deletion
 *                   example: 'the user is deleted!'
 *       '404':
 *         description: A not found error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the user was found
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: An error message indicating the user was not found
 *                   example: 'user not found!'
 *       '500':
 *         description: An internal server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether an error occurred
 *                   example: false
 *                 error:
 *                   type: string
 *                   description: The error message
 */
//DELETE AN EXISTING USER
router.delete("/:id", usersController.deleteUser);

/**
 * @swagger
 * /users/get/count:
 *   get:
 *     summary: Retrieves the number of users in the database
 *     tags: 
 *        - Users
 *     description: Retrieves the number of users currently stored in the database
 *     responses:
 *       '200':
 *         description: A successful count response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userCount:
 *                   type: integer
 *                   description: The number of users currently stored in the database
 *                   example: 75
 *       '500':
 *         description: An internal server error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the count was successful
 *                   example: false
 */
//GET USERS COUNT STORED IN THE DATABASE
router.get('/get/count', usersController.getUserCount);

module.exports = router;
