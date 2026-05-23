// src\modules\public\public.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { successResponse } from "../../common/utils/response.js";
import { validateRequest } from "../../common/validation/validate-request.js";
import * as service from "./public.service.js";

const idParamsSchema = z.object({
  id: z.string().uuid(),
});

const slugParamsSchema = z.object({
  slug: z.string().min(2).max(255),
});

function parseCommaList(value: unknown){
  if(!value)return undefined;

  if (Array.isArray(value)){
    return value
      .flatMap((item) => String(item).split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBooleanQuery(value: unknown){
  if(value === undefined || value === null || value === "") return undefined;
  if(value=== true || value === "true" || value === "1")return true;
  if(value === false || value === "false" || value === "0") return false;
  return undefined;
}
const publicListQuerySchema = z.object({
    search: z.string().trim().optional(),
    city: z.string().trim().optional(),
    type: z.string().trim().optional(),
    category: z.preprocess(parseCommaList, z.array(z.string().trim()).optional()),
    verified: z.preprocess(parseBooleanQuery, z.boolean().optional()),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(12),
});

export async function listProviders(
  request: FastifyRequest,
  reply: FastifyReply
) {
    const query = validateRequest(publicListQuerySchema, request.query);
  const result = await service.listProviders(query);
  return reply.status(200).send(successResponse("Providers fetched", result));
}

export async function getProviderById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(idParamsSchema, request.params);
  const result = await service.getProviderById(params.id);
  return reply.status(200).send(successResponse("Provider fetched", result));
}

//slug create functions for provider, service, opportunity
export async function getProviderBySlug(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(slugParamsSchema, request.params);
  const result = await service.getProviderBySlug(params.slug);

  return reply.status(200).send(successResponse("Provider fetched", result));
}

export async function getServiceBySlug(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(slugParamsSchema, request.params);
  const result = await service.getServiceBySlug(params.slug);

  return reply.status(200).send(successResponse("Service fetched", result));
}

export async function getOpportunityBySlug(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(slugParamsSchema, request.params);
  const result = await service.getOpportunityBySlug(params.slug);

  return reply
    .status(200)
    .send(successResponse("Opportunity fetched", result));
}

export async function listServices(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const query = validateRequest(publicListQuerySchema, request.query);
  const result = await service.listServices(query);
  return reply.status(200).send(successResponse("Services fetched", result));
}

export async function getServiceById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(idParamsSchema, request.params);
  const result = await service.getServiceById(params.id);
  return reply.status(200).send(successResponse("Service fetched", result));
}

export async function listOpportunities(
  request: FastifyRequest,
  reply: FastifyReply
) {
    const query = validateRequest(publicListQuerySchema, request.query);
  const result = await service.listOpportunities(query);

  return reply
    .status(200)
    .send(successResponse("Opportunities fetched", result));
}

export async function getOpportunityById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(idParamsSchema, request.params);
  const result = await service.getOpportunityById(params.id);

  return reply
    .status(200)
    .send(successResponse("Opportunity fetched", result));
}