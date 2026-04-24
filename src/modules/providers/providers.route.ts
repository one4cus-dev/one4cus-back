// src\modules\providers\providers.route.ts
import { FastifyInstance } from "fastify";
import {
  createProvider,
  getProviderById,
  listProviders,
} from "./providers.controller.js";

export async function providersRoutes(app: FastifyInstance) {
  app.post("/providers", createProvider);
  app.get("/providers", listProviders);
  app.get("/providers/:id", getProviderById);
}