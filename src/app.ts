// src\app.ts
import Fastify from "fastify";
import { registerCors } from "./plugins/cors.js";
import { registerHelmet } from "./plugins/helmet.js";
import { registerSensible } from "./plugins/sensible.js";
import {registerJwt} from "./plugins/jwt.js";
import { registerErrorHandler } from "./hooks/error-handler.js";
import { registerNotFoundHandler } from "./hooks/not-found-handler.js";

//module routes
import { healthRoutes } from "./modules/health/health.route.js";
import { usersRoutes } from "./modules/users/users.route.js";
import { providersRoutes } from "./modules/providers/providers.route.js";
import {servicesRoutes} from "./modules/services/services.route.js";
import { opportunitiesRoutes } from "./modules/opportunities/opportunities.route.js";
import {ingestionRoutes} from "./modules/ingestion/ingestion.route.js";
import { draftsRoutes } from "./modules/drafts/drafts.route.js";
import { publicRoutes } from "./modules/public/public.route.js";

export async function buildApp() {
  const app = Fastify({
    logger: {
      transport:
        process.env.NODE_ENV !== "production"
          ? {
              target: "pino-pretty",
              options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname"
              }
            }
          : undefined
    }
  });

  //register plugins
  await registerCors(app);
  await registerHelmet(app);
  await registerSensible(app);
  await registerJwt(app);

  //register routes
  await app.register(healthRoutes, { prefix: "/api" });
  await app.register(usersRoutes, { prefix: "/api" });
  await app.register(providersRoutes, { prefix: "/api" });
  await app.register(servicesRoutes, { prefix: "/api" });
  await app.register(opportunitiesRoutes, { prefix: "/api" });
  await app.register(ingestionRoutes, { prefix: "/api" });
  await app.register(draftsRoutes, { prefix: "/api" });
  await app.register(publicRoutes, { prefix: "/api" });
  
  //register hooks
  registerNotFoundHandler(app);
  registerErrorHandler(app);

  return app;
}