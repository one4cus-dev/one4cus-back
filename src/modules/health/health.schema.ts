// src\modules\health\health.schema.ts
import { z } from "zod";

export const healthResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    status: z.string(),
    service: z.string(),
    environment: z.string()
  })
});