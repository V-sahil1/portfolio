import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './env.js';

/**
 * Build the OpenAPI spec from JSDoc @swagger annotations in the route files.
 * Served by swagger-ui-express at `${API_PREFIX}/docs`.
 */
const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Portfolio Analytics API',
    version: '1.0.0',
    description:
      'REST API for capturing and reporting portfolio visitor analytics. ' +
      'Public endpoints ingest visitors/sessions/events/contacts; admin endpoints ' +
      '(JWT-protected) expose dashboard + analytics.',
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
  definition: swaggerDefinition,
  // Scan route files (and this repo's controllers) for @swagger blocks.
  apis: ['./src/routes/*.js'],
});
