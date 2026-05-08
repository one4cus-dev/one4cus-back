// src\modules\public\public.route.ts
import { FastifyInstance } from "fastify";
import {
  getOpportunityById,
  getProviderById,
  getServiceById,
  getProviderBySlug,
  getServiceBySlug,
  getOpportunityBySlug,
  listOpportunities,
  listProviders,
  listServices,
} from "./public.controller.js";

export async function publicRoutes(app: FastifyInstance) {
  app.get("/public/providers", listProviders);
  app.get("/public/providers/:id", getProviderById);
  app.get("/public/providers/slug/:slug", getProviderBySlug);

  app.get("/public/services", listServices);
  app.get("/public/services/:id", getServiceById);
  app.get("/public/services/slug/:slug", getServiceBySlug);

  app.get("/public/opportunities", listOpportunities);
  app.get("/public/opportunities/:id", getOpportunityById);
  app.get("/public/opportunities/slug/:slug", getOpportunityBySlug);
}