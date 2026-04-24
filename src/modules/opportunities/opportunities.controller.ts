// src\modules\opportunities\opportunities.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../../common/utils/response.js";
import { validateRequest } from "../../common/validation/validate-request.js";
import {
  createOpportunityBodySchema,
  opportunityParamsSchema,
} from "./opportunities.schema.js";
import * as service from "./opportunities.service.js";

export async function createOpportunity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = validateRequest(createOpportunityBodySchema, request.body);

  const result = await service.createOpportunity(body);

  return reply
    .status(201)
    .send(successResponse("Opportunity created", result));
}

export async function getOpportunityById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(opportunityParamsSchema, request.params);

  const result = await service.getOpportunityById(params.id);

  return reply
    .status(200)
    .send(successResponse("Opportunity fetched", result));
}

export async function listOpportunities(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const result = await service.listOpportunities();

  return reply
    .status(200)
    .send(successResponse("Opportunities fetched", result));
}