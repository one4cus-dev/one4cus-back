// src\modules\health\health.route.ts
import { FastifyInstance } from "fastify";
import { getHealth } from "./health.controller.js";

export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", getHealth);
}