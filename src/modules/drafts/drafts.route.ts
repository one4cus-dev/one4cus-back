// src\modules\drafts\drafts.route.ts
import { FastifyInstance } from "fastify";
import {internalApiKeyGuard} from "../../common/guards/internal-api-key.guard.js";
import { reviewDraft } from "./drafts.controller.js";

export async function draftsRoutes(app: FastifyInstance) {
  app.patch(
    "/drafts/review-status", 
    { 
        preHandler: internalApiKeyGuard 
    }, 
    reviewDraft
);
}