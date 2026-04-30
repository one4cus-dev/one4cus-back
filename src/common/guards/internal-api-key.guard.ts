// src\common\guards\internal-api-key.guard.ts
//validate internal API key for routes that are meant to be accessed only by internal services (like n8n or the internal AI service)

import { FastifyReply, FastifyRequest } from "fastify";
import { appConfig } from "../../config/app-config.js";
import { AppError } from "../errors/app-error.js";

export async function internalApiKeyGuard(
  request: FastifyRequest,
  _reply: FastifyReply
) {
  const apiKey = request.headers["x-internal-api-key"];

  if (!apiKey || apiKey !== appConfig.integrations.n8nInternalApiKey) {
    throw new AppError("Unauthorized internal request", 401, "UNAUTHORIZED");
  }
}