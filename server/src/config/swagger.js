import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './env.js';

/**
 * OpenAPI spec built from the @swagger JSDoc blocks in the route files.
 * Served by swagger-ui-express at `${API_PREFIX}/docs`.
 */
const definition = {
  openapi: '3.0.3',
  info: {
    title: 'Portfolio Contact API',
    version: '1.0.0',
    description:
      'Stores portfolio contact-form submissions in PostgreSQL and notifies the ' +
      'owner via the WhatsApp Business Cloud API.',
  },
  servers: [{ url: config.apiPrefix, description: 'v1' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      SuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { type: 'object', nullable: true },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string' },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
  },
  tags: [{ name: 'System', description: 'Health + meta' }],
};

export const swaggerSpec = swaggerJSDoc({
  definition,
  apis: ['./src/routes/*.js'],
});
