import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TEMPLATE Backend API',
      version: '1.0.0',
      description: 'API documentation for the ULTIMATE TEMPLATE Backend',
    },
  },
  apis: ["./src/routes/*.js", './src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerSpec, { explorer: true });
