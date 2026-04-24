// src\modules\users\users.controller.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { successResponse } from "../../common/utils/response.js";
import { validateRequest } from "../../common/validation/validate-request.js";
import {
  createUserBodySchema,
  userParamsSchema,
} from "./users.schema.js";
import * as usersService from "./users.service.js";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const body = validateRequest(createUserBodySchema, request.body);
  const user = await usersService.createUser(body);

  return reply.status(201).send(successResponse("User created", user));
}

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const params = validateRequest(userParamsSchema, request.params);
  const user = await usersService.getUserById(params.id);

  return reply.status(200).send(successResponse("User fetched", user));
}

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  const users = await usersService.listUsers();

  return reply.status(200).send(successResponse("Users fetched", users));
}