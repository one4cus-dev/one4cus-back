// src\modules\opportunities\opportunities.service.ts
import slugify from "slugify";
import { AppError } from "../../common/errors/app-error.js";
import { PUBLIC_ENTITY_STATUSES } from "../../common/constants/index.js";
import type { CreateOpportunityBody } from "./opportunities.schema.js";
import * as repo from "./opportunities.repository.js";

function generateSlug(title: string) {
  return slugify(title, { lower: true, strict: true });
}

export async function createOpportunity(input: CreateOpportunityBody) {
  const provider = await repo.findProviderById(input.providerId);

  if (!provider) {
    throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND");
  }

  const slug = generateSlug(`${provider.businessName}-${input.title}`);

  return await repo.createOpportunity({
    providerId: input.providerId,

    slug,
    status: PUBLIC_ENTITY_STATUSES.DRAFT,

    title: input.title,
    category: input.category,

    shortSummary: input.shortSummary,
    fullDescription: input.fullDescription,

    province: input.province,
    district: input.district,
    city: input.city,

    projectStartDate: input.projectStartDate
      ?? undefined,

    expectedCompletionDate: input.expectedCompletionDate
      ?? undefined,

    investmentType: input.investmentType,
    expectedRoiText: input.expectedRoiText,

    fundingGoal: input.fundingGoal?.toString(),
    minimumInvestment: input.minimumInvestment?.toString(),
    maximumInvestment: input.maximumInvestment?.toString(),

    dealDurationValue: input.dealDurationValue,
    dealDurationUnit: input.dealDurationUnit,

    fundingDeadline: input.fundingDeadline
      ?? undefined,

    riskLevel: input.riskLevel,
  });
}

export async function getOpportunityById(id: string) {
  const row = await repo.findOpportunityById(id);

  if (!row) {
    throw new AppError("Opportunity not found", 404, "OPPORTUNITY_NOT_FOUND");
  }

  return row;
}

export async function listOpportunities() {
  return await repo.listOpportunities();
}