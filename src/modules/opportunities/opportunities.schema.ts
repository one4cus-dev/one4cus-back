// src\modules\opportunities\opportunities.schema.ts
import { z } from "zod";

export const createOpportunityBodySchema = z.object({
  providerId: z.string().uuid(),

  title: z.string().min(2).max(255),
  category: z.string().optional(),

  shortSummary: z.string().optional(),
  fullDescription: z.string().optional(),

  province: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),

  projectStartDate: z.string().optional(),
  expectedCompletionDate: z.string().optional(),

  investmentType: z.string().optional(),
  expectedRoiText: z.string().optional(),

  fundingGoal: z.number().optional(),
  minimumInvestment: z.number().optional(),
  maximumInvestment: z.number().optional(),

  dealDurationValue: z.number().optional(),
  dealDurationUnit: z.string().optional(),

  fundingDeadline: z.string().optional(),

  riskLevel: z.string().optional(),
});

export const opportunityParamsSchema = z.object({
  id: z.string().uuid(),
});

export type CreateOpportunityBody = z.infer<
  typeof createOpportunityBodySchema
>;

export type OpportunityParams = z.infer<typeof opportunityParamsSchema>;