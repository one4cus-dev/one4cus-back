// src\modules\opportunities\opportunities.route.ts
import { FastifyInstance } from "fastify";
import {
  createOpportunity,
  getOpportunityById,
  listOpportunities,
} from "./opportunities.controller.js";

export async function opportunitiesRoutes(app: FastifyInstance) {
  app.post("/opportunities", createOpportunity);
  app.get("/opportunities", listOpportunities);
  app.get("/opportunities/:id", getOpportunityById);
}