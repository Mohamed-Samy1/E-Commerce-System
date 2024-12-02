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
- [Contributing](#contributing)
- [License](#license)

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

- **Create a .env file with the following variables:**:
-  PORT=5000
-  MONGO_URI=mongodb://localhost:27017/yourDatabaseURI
-  JWT_SECRET=your_jwt_secret
-  JWT_EXPIRES_IN=7d
-  BCRYPT_SALT_ROUNDS=10

---

### Project Structure
e-commerce-system/
│
├── controllers/       # Route handlers
├── models/            # Mongoose models for MongoDB
├── routes/            # API route definitions
├── public/            # Public access photos
├── assets/           
├── utils/             # Utility functions
├── .env               # Environment variables
├── .gitignore         # Files to ignore in Git
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation


