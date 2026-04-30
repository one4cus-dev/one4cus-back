// src\modules\ingestion\ingestion.repository.ts
import { db } from "../../db/index.js";
import {
  sourceUploads,
  ocrResults,
  aiJobs,
  aiOutputs,
  providerDrafts,
  serviceListingDrafts,
  opportunityListingDrafts,
} from "../../db/schema/index.js";

export async function createSourceUpload(data: typeof sourceUploads.$inferInsert) {
  const [row] = await db.insert(sourceUploads).values(data).returning();
  return row;
}

export async function createOcrResult(data: typeof ocrResults.$inferInsert) {
  const [row] = await db.insert(ocrResults).values(data).returning();
  return row;
}

export async function createAiJob(data: typeof aiJobs.$inferInsert) {
  const [row] = await db.insert(aiJobs).values(data).returning();
  return row;
}

export async function createAiOutput(data: typeof aiOutputs.$inferInsert) {
  const [row] = await db.insert(aiOutputs).values(data).returning();
  return row;
}

export async function createProviderDraft(data: typeof providerDrafts.$inferInsert) {
  const [row] = await db.insert(providerDrafts).values(data).returning();
  return row;
}

export async function createServiceDraft(
  data: typeof serviceListingDrafts.$inferInsert
) {
  const [row] = await db.insert(serviceListingDrafts).values(data).returning();
  return row;
}

export async function createOpportunityDraft(
  data: typeof opportunityListingDrafts.$inferInsert
) {
  const [row] = await db.insert(opportunityListingDrafts).values(data).returning();
  return row;
}