// src\app.ts
import Fastify from "fastify";
import { registerCors } from "./plugins/cors.js";
import { registerHelmet } from "./plugins/helmet.js";
import { registerSensible } from "./plugins/sensible.js";
import { registerErrorHandler } from "./hooks/error-handler.js";
import { registerNotFoundHandler } from "./hooks/not-found-handler.js";
import { healthRoutes } from "./modules/health/health.route.js";

export async function buildApp() {
  const app = Fastify({
    logger: true
  });

  await registerCors(app);
  await registerHelmet(app);
  await registerSensible(app);

  await app.register(healthRoutes, { prefix: "/api" });

  registerNotFoundHandler(app);
  registerErrorHandler(app);

  return app;
}