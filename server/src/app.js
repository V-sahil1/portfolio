import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { config } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { globalLimiter } from './middlewares/rateLimiter.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import apiRoutes from './routes/index.js';

/**
 * Build and configure the Express app (no side effects — no listen/DB connect),
 * so it can be imported by tests as well as server.js.
 * @returns {import('express').Express}
 */
export const createApp = () => {
  const app = express();

  // Trust the proxy so req.ip / X-Forwarded-For resolve correctly behind Nginx/hosts.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  // Security + CORS
  app.use(helmet());
  app.use(
    cors({
      origin: config.corsOrigins.length ? config.corsOrigins : true,
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
    }),
  );

  // Body parsing + logging
  app.use(express.json({ limit: '256kb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // Global rate limiting
  app.use(config.apiPrefix, globalLimiter);

  // Swagger docs
  app.use(`${config.apiPrefix}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
  app.get(`${config.apiPrefix}/docs.json`, (_req, res) => res.json(swaggerSpec));

  // API
  app.use(config.apiPrefix, apiRoutes);
  app.get('/', (_req, res) => res.redirect(`${config.apiPrefix}/docs`));

  // 404 + global error handler (must be last)
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
