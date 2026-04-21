// src\hooks\not-found-handler.ts
import { FastifyInstance } from "fastify";
import { errorResponse } from "../common/utils/response.js";

export function registerNotFoundHandler(app: FastifyInstance) {
  app.setNotFoundHandler((_request, reply) => {
    return reply.status(404).send(errorResponse("Route not found", "NOT_FOUND"));
  });
}