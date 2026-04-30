// src\modules\ingestion\ingestion.route.ts
import { FastifyInstance } from "fastify";
import { internalApiKeyGuard } from "../../common/guards/internal-api-key.guard.js";
import {ingestAiDraft} from "./ingestion.controller.js";

export async function ingestionRoutes(app: FastifyInstance) {
    app.post(
        "/ingestion/ai-draft", 
        { 
            preHandler: internalApiKeyGuard 
        }, 
        
        ingestAiDraft
    );
}