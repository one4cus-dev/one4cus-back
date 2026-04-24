// src\modules\services\services.route.ts
import { FastifyInstance } from "fastify";
import {
  createService,
  getServiceById,
  listServices,
} from "./services.controller.js";

export async function servicesRoutes(app: FastifyInstance) {
  app.post("/services", createService);
  app.get("/services", listServices);
  app.get("/services/:id", getServiceById);
}