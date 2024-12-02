# E-commerce API Backend System

Welcome to the **E-commerce API Backend System**! This project is a RESTful API developed using **Node.js** and **Express.js**, with authentication and authorization managed by **JWT (JSON Web Token)**. The system is designed to serve as the backend for an e-commerce platform, providing essential functionalities like user management, product management, order processing, and authentication.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)

---

## Features

### User Authentication and Authorization
- **JWT-based Authentication**: Secure user authentication with tokens.
- **Role-Based Access Control**: Different roles (admin, customer) with permissions.

### Product Management
- Add, update, delete, and view products.
- Product categories and detailed specifications.

### Order Management
- Place and track orders.
- Manage order status (pending, completed, canceled).

### User Management
- Registration and login functionality.
- Manage user profiles and roles.

### Additional Features
- **Pagination and Filtering**: Easily manage large datasets with pagination and filtering for products and orders.
- **Secure Passwords**: Passwords are hashed using bcrypt.
- **Environment Configuration**: Environment variables for easy configuration.

---

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT**: Authentication via JSON Web Tokens.
- **Bcrypt**: Secure password hashing.

---

## Installation

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14 or higher)
- **MongoDB**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   
2. Install dependencies:
   ```bash
   npm install
   
3. Create a .env file in the root directory with the required environment variables:
   
4. Start the server:
   ```bash
   npm start

---

### Configuration

**Create a .env file with the following variables:**:
-  PORT=5000
-  MONGO_URI=mongodb://localhost:27017/yourDatabaseURI
-  JWT_SECRET=your_jwt_secret
-  JWT_EXPIRES_IN=7d
-  BCRYPT_SALT_ROUNDS=10

---

# Project Structure

```plaintext
ecommerce-api/
│
├── controllers/       # Route handlers for business logic
│   ├── users.js       # Handles user-related operations
│   ├── products.js    # Manages product-related operations
│   ├── orders.js      # Handles order-related operations
│   └── categories.js  # Manages category-related operations
│
├── routes/            # API route definitions
│   ├── users.js       # Routes for user operations
│   ├── products.js    # Routes for product operations
│   ├── orders.js      # Routes for order operations
│   └── categories.js  # Routes for category operations
│
├── models/            # Mongoose models for MongoDB
│   ├── User.js        # User schema
│   ├── Product.js     # Product schema
│   ├── Order.js       # Order schema
│   └── Category.js    # Category schema
│
├── utils/             # Utility functions
│   ├── jwt.js         # Helper for generating and verifying JWT tokens
│   ├── error-handling.js # Utility for centralized error handling
│   └── swagger.js     # Helper for setting up Swagger documentation
│
├── assets/            # Static assets like images or media files
│   └── sample.jpg     # Example image file
│
├── public/            # Publicly accessible files like HTML, CSS, and JS
│   ├── index.html     # Example HTML file
│   ├── styles.css     # Example CSS file
│   └── script.js      # Example JavaScript file
│
├── .env               # Environment variables
├── .gitignore         # Files to ignore in Git
├── package.json       # Project dependencies and scripts
├── README.md          # Project documentation
└── app.js             # Entry point for the application
```

---

## API Documentation

This project includes complete API documentation created using **Swagger.js**.  
To access the documentation, visit the following link:  

**[https://e-commerce-api-ac78.onrender.com/docs/](https://e-commerce-api-ac78.onrender.com/docs/)**  

Below is a preview of the documentation:  

![Swagger Documentation Preview](/assets/swaggerDoc.png)
