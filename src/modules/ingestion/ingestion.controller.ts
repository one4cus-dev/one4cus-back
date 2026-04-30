// src\modules\ingestion\ingestion.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../../common/utils/response.js";
import { validateRequest } from "../../common/validation/validate-request.js";
import { ingestAiDraftBodySchema } from "./ingestion.schema.js";
import * as ingestionService from "./ingestion.service.js";

export async function ingestAiDraft(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = validateRequest(ingestAiDraftBodySchema, request.body);
  const result = await ingestionService.ingestAiDraft(body);

  return reply.status(201).send(successResponse("AI draft ingested", result));
}