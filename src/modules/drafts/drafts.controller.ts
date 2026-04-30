// src\modules\drafts\drafts.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../../common/utils/response.js";
import { validateRequest } from "../../common/validation/validate-request.js";
import { reviewDraftBodySchema } from "./drafts.schema.js";
import * as draftsService from "./drafts.service.js";

export async function reviewDraft(request: FastifyRequest, reply: FastifyReply) {
  const body = validateRequest(reviewDraftBodySchema, request.body);
  const result = await draftsService.reviewDraft(body);

  return reply.status(200).send(successResponse("Draft review synced", result));
}