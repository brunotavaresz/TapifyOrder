const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Restaurante',
      version: '1.0.0',
      description: 'API para gerenciar pedidos e produtos do restaurante',
    },
    servers: [
      {
        url: 'http://localhost:3001',  // Ajuste a porta que usar para a API
      },
    ],
  },
  apis: ['./routes/*.js'], // Aqui você vai documentar seus endpoints dentro das rotas
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
