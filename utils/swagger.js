const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce System API',
      version: '1.0.0',
      description: 'My API documentation with Swagger',
    },
    tags: [
      {
        name: 'Categories',
        description: 'Endpoints related to categories',
      },
      {
        name: 'Users',
        description: 'Endpoints related to users',
      },
      {
        name: 'Products',
        description: 'Endpoints related to Products',
      },
      {
        name: 'Orders',
        description: 'Endpoints related to Orders',
      }
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

exports.swaggerDocs = async (app, port) => {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
};