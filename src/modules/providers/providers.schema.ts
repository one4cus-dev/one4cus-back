// src\modules\providers\providers.schema.ts
import { z } from "zod";
import {
  PROVIDER_TYPE_VALUES,
} from "../../common/constants/index.js";

export const createProviderBodySchema = z.object({
  ownerUserId: z.string().uuid().optional(),

  providerType: z.enum(PROVIDER_TYPE_VALUES as [string, ...string[]]),

  businessName: z.string().min(2).max(255),
  displayName: z.string().optional(),

  description: z.string().optional(),
  shortDescription: z.string().optional(),

  primaryPhone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  email: z.string().email().optional(),

  websiteUrl: z.string().url().optional(),

  city: z.string().optional(),
  district: z.string().optional(),
  province: z.string().optional(),
});

export const providerParamsSchema = z.object({
  id: z.string().uuid(), //validate that the id is a valid UUID
});

export type CreateProviderBody = z.infer<typeof createProviderBodySchema>;