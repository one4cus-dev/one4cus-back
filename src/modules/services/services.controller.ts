// src\modules\services\services.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../../common/utils/response.js";
import { validateRequest } from "../../common/validation/validate-request.js";
import {
  createServiceBodySchema,
  serviceParamsSchema,
} from "./services.schema.js";
import * as servicesService from "./services.service.js";

export async function createService(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = validateRequest(createServiceBodySchema, request.body);
  const service = await servicesService.createService(body);

  return reply.status(201).send(successResponse("Service created", service));
}

export async function getServiceById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(serviceParamsSchema, request.params);
  const service = await servicesService.getServiceById(params.id);

  return reply.status(200).send(successResponse("Service fetched", service));
}

export async function listServices(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const services = await servicesService.listServices();

  return reply.status(200).send(successResponse("Services fetched", services));
}