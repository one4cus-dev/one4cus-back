// src\modules\users\users.route.ts
import { FastifyInstance } from "fastify";
import { createUser, getUserById, listUsers } from "./users.controller.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
  app.get("/users", listUsers);
  app.get("/users/:id", getUserById);
}