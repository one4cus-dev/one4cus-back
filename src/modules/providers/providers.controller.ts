// src\modules\providers\providers.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../../common/utils/response.js";
import { validateRequest } from "../../common/validation/validate-request.js";
import {
  createProviderBodySchema,
  providerParamsSchema,
} from "./providers.schema.js";
import * as providersService from "./providers.service.js";

export async function createProvider(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = validateRequest(createProviderBodySchema, request.body);

  const provider = await providersService.createProvider(body);

  return reply
    .status(201)
    .send(successResponse("Provider created", provider));
}

export async function getProviderById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(providerParamsSchema, request.params);

  const provider = await providersService.getProviderById(params.id);

  return reply
    .status(200)
    .send(successResponse("Provider fetched", provider));
}

export async function listProviders(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const providers = await providersService.listProviders();

  return reply
    .status(200)
    .send(successResponse("Providers fetched", providers));
}