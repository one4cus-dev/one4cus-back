// src\modules\services\services.schema.ts
import { z } from "zod";

export const createServiceBodySchema = z.object({
  providerId: z.string().uuid(),
  title: z.string().min(2).max(255),
  category: z.string().optional(),
  locationText: z.string().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().optional(),
  perWorkRate: z.number().positive().optional(),
  currency: z.string().default("LKR"),
  availability: z.string().optional(),
  warrantyType: z.string().optional(),
  experienceText: z.string().optional(),
  thumbnailImageUrl: z.string().url().optional(),
});

export const serviceParamsSchema = z.object({
  id: z.string().uuid(),
});

export type CreateServiceBody = z.infer<typeof createServiceBodySchema>;