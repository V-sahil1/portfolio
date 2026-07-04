import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { config } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import { requestLogger } from './middleware/requestLogger.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

/**
 * Build and configure the Express application. Kept free of side effects
 * (no listen, no DB connect) so it can be imported by tests as well as server.js.
 * @returns {import('express').Express}
 */
export const createApp = () => {
  const app = express();

  // Behind a proxy/load balancer (Render, Nginx) so req.ip / secure cookies work.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  /* ---------------------------- Security ---------------------------- */
  app.use(helmet());
  app.use(
    cors({
      origin: config.corsOrigins.length ? config.corsOrigins : true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  );

  /* ------------------------- Body / parsing ------------------------- */
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  /* --------------------------- Observability ------------------------ */
  app.use(requestLogger);

  /* ---------------------------- Rate limit -------------------------- */
  app.use(config.apiPrefix, globalLimiter);

  /* ------------------------------ Docs ------------------------------ */
  app.use(
    `${config.apiPrefix}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );
  // Raw spec (useful for Postman import / codegen).
  app.get(`${config.apiPrefix}/docs.json`, (_req, res) => res.json(swaggerSpec));

  /* ------------------------------ API ------------------------------- */
  app.use(config.apiPrefix, apiRoutes);

  // Root convenience redirect to docs.
  app.get('/', (_req, res) => res.redirect(`${config.apiPrefix}/docs`));

  /* --------------------- 404 + global error ------------------------- */
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
