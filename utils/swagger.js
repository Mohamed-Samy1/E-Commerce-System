const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API with Swagger',
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