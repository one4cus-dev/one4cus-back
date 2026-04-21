// src\hooks\error-handler.ts
import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../common/errors/app-error.js";
import { errorResponse } from "../common/utils/response.js";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: FastifyError | AppError, _request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof AppError) {
        return reply
          .status(error.statusCode)
          .send(errorResponse(error.message, error.code, error.details));
      }

      app.log.error(error);

      return reply
        .status(500)
        .send(errorResponse("Internal server error", "INTERNAL_SERVER_ERROR"));
    }
  );
}