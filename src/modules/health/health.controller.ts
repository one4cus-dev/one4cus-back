// src\modules\health\health.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { appConfig } from "../../config/app-config.js";
import { successResponse } from "../../common/utils/response.js";

export async function getHealth(_request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send(
    successResponse("Health check passed", {
      status: "ok",
      service: appConfig.appName,
      environment: appConfig.nodeEnv
    })
  );
}