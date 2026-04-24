// src\plugins\jwt.ts
import jwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import { appConfig } from "../config/app-config.js";

export async function registerJwt(app: FastifyInstance) {
    await app.register(jwt,{
        secret: appConfig.auth.jwtSecret
    });
}