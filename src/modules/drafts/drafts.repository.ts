// src\modules\drafts\drafts.repository.ts
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  providerDrafts,
  serviceListingDrafts,
  opportunityListingDrafts,
  providers,
  serviceListings,
  opportunityListings,
  reviewActions,
  auditLogs,
} from "../../db/schema/index.js";
import type { DbOrTx } from "../../db/types.js";

export async function reviewDraftInTransaction<T>(
  callback: Parameters<typeof db.transaction>[0]
): Promise<T> {
  return await db.transaction(callback as never);
}

export async function findProviderDraft(tx: DbOrTx, id: string) {
  const [row] = await tx
    .select()
    .from(providerDrafts)
    .where(eq(providerDrafts.id, id))
    .limit(1);

  return row ?? null;
}

export async function findServiceDraft(tx: DbOrTx, id: string) {
  const [row] = await tx
    .select()
    .from(serviceListingDrafts)
    .where(eq(serviceListingDrafts.id, id))
    .limit(1);

  return row ?? null;
}

export async function findOpportunityDraft(tx: DbOrTx, id: string) {
  const [row] = await tx
    .select()
    .from(opportunityListingDrafts)
    .where(eq(opportunityListingDrafts.id, id))
    .limit(1);

  return row ?? null;
}

export async function findProviderById(tx: DbOrTx, id: string) {
  const [row] = await tx
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);

  return row ?? null;
}

export async function findServiceById(tx: DbOrTx, id: string) {
  const [row] = await tx
    .select()
    .from(serviceListings)
    .where(eq(serviceListings.id, id))
    .limit(1);

  return row ?? null;
}

export async function findOpportunityById(tx: DbOrTx, id: string) {
  const [row] = await tx
    .select()
    .from(opportunityListings)
    .where(eq(opportunityListings.id, id))
    .limit(1);

  return row ?? null;
}

export async function updateProviderDraftAfterPublish(
  tx: DbOrTx,
  id: string,
  publishedProviderId: string,
  notes?: string
) {
  const [row] = await tx
    .update(providerDrafts)
    .set({
      draftStatus: "published",
      reviewStatus: "reviewed",
      matchedProviderId: publishedProviderId,
      reviewNotes: notes,
      updatedAt: new Date(),
    })
    .where(eq(providerDrafts.id, id))
    .returning();

  return row;
}

export async function updateServiceDraftAfterPublish(
  tx: DbOrTx,
  id: string,
  publishedServiceId: string,
  notes?: string
) {
  const [row] = await tx
    .update(serviceListingDrafts)
    .set({
      draftStatus: "published",
      reviewStatus: "reviewed",
      matchedServiceListingId: publishedServiceId,
      reviewNotes: notes,
      updatedAt: new Date(),
    })
    .where(eq(serviceListingDrafts.id, id))
    .returning();

  return row;
}

export async function updateOpportunityDraftAfterPublish(
  tx: DbOrTx,
  id: string,
  publishedOpportunityId: string,
  notes?: string
) {
  const [row] = await tx
    .update(opportunityListingDrafts)
    .set({
      draftStatus: "published",
      reviewStatus: "reviewed",
      matchedOpportunityListingId: publishedOpportunityId,
      reviewNotes: notes,
      updatedAt: new Date(),
    })
    .where(eq(opportunityListingDrafts.id, id))
    .returning();

  return row;
}

export async function updateProviderDraftStatus(
  tx: DbOrTx,
  id: string,
  status: string,
  notes?: string
) {
  const [row] = await tx
    .update(providerDrafts)
    .set({
      draftStatus: status,
      reviewStatus: "reviewed",
      reviewNotes: notes,
      updatedAt: new Date(),
    })
    .where(eq(providerDrafts.id, id))
    .returning();

  return row;
}

export async function updateServiceDraftStatus(
  tx: DbOrTx,
  id: string,
  status: string,
  notes?: string
) {
  const [row] = await tx
    .update(serviceListingDrafts)
    .set({
      draftStatus: status,
      reviewStatus: "reviewed",
      reviewNotes: notes,
      updatedAt: new Date(),
    })
    .where(eq(serviceListingDrafts.id, id))
    .returning();

  return row;
}

export async function updateOpportunityDraftStatus(
  tx: DbOrTx,
  id: string,
  status: string,
  notes?: string
) {
  const [row] = await tx
    .update(opportunityListingDrafts)
    .set({
      draftStatus: status,
      reviewStatus: "reviewed",
      reviewNotes: notes,
      updatedAt: new Date(),
    })
    .where(eq(opportunityListingDrafts.id, id))
    .returning();

  return row;
}

export async function publishProviderDraft(
  tx: DbOrTx,
  draft: typeof providerDrafts.$inferSelect
) {
  const [row] = await tx
    .insert(providers)
    .values({
      slug: `${draft.businessName.toLowerCase().replaceAll(" ", "-")}-${draft.id.slice(0, 6)}`,
      providerType: draft.providerType,
      status: "published",
      claimStatus: "unclaimed",
      isPlaceholder: draft.isPlaceholder,

      businessName: draft.businessName,
      displayName: draft.displayName,
      description: draft.description,
      shortDescription: draft.shortDescription,

      primaryPhone: draft.primaryPhone,
      whatsappNumber: draft.whatsappNumber,
      email: draft.email,
      websiteUrl: draft.websiteUrl,

      facebookUrl: draft.facebookUrl,
      instagramUrl: draft.instagramUrl,
      tiktokUrl: draft.tiktokUrl,
      linkedinUrl: draft.linkedinUrl,

      addressLine1: draft.addressLine1,
      addressLine2: draft.addressLine2,
      city: draft.city,
      district: draft.district,
      province: draft.province,
      postalCode: draft.postalCode,
      country: draft.country,

      latitude: draft.latitude,
      longitude: draft.longitude,

      logoUrl: draft.logoUrl,
      coverImageUrl: draft.coverImageUrl,

      publishedAt: new Date(),
    })
    .returning();

  return row;
}

export async function publishServiceDraft(
  tx: DbOrTx,
  draft: typeof serviceListingDrafts.$inferSelect,
  providerId: string
) {
  const [row] = await tx
    .insert(serviceListings)
    .values({
      providerId,
      slug: `${draft.title.toLowerCase().replaceAll(" ", "-")}-${draft.id.slice(0, 6)}`,
      status: "published",

      title: draft.title,
      category: draft.category,
      locationText: draft.locationText,
      tagsJson: draft.tagsJson,
      description: draft.description,

      perWorkRate: draft.perWorkRate,
      currency: draft.currency,
      availability: draft.availability,
      warrantyType: draft.warrantyType,
      experienceText: draft.experienceText,
      thumbnailImageUrl: draft.thumbnailImageUrl,

      publishedAt: new Date(),
    })
    .returning();

  return row;
}

export async function publishOpportunityDraft(
  tx: DbOrTx,
  draft: typeof opportunityListingDrafts.$inferSelect,
  providerId: string
) {
  const [row] = await tx
    .insert(opportunityListings)
    .values({
      providerId,
      slug: `${draft.title.toLowerCase().replaceAll(" ", "-")}-${draft.id.slice(0, 6)}`,
      status: "published",

      title: draft.title,
      category: draft.category,
      shortSummary: draft.shortSummary,
      fullDescription: draft.fullDescription,

      province: draft.province,
      district: draft.district,
      city: draft.city,
      postalCode: draft.postalCode,

      projectStartDate: draft.projectStartDate,
      expectedCompletionDate: draft.expectedCompletionDate,

      coverImageUrl: draft.coverImageUrl,

      investmentType: draft.investmentType,
      expectedRoiText: draft.expectedRoiText,
      fundingGoal: draft.fundingGoal,
      minimumRaiseAmount: draft.minimumRaiseAmount,
      minimumInvestment: draft.minimumInvestment,
      maximumInvestment: draft.maximumInvestment,

      dealDurationValue: draft.dealDurationValue,
      dealDurationUnit: draft.dealDurationUnit,
      fundingDeadline: draft.fundingDeadline,
      investorBenefitsText: draft.investorBenefitsText,

      riskLevel: draft.riskLevel,
      riskInvestorsMayLoseCapital: draft.riskInvestorsMayLoseCapital,
      riskReturnsNotGuaranteed: draft.riskReturnsNotGuaranteed,
      riskTimelineMayChange: draft.riskTimelineMayChange,

      complianceInfoAccurate: draft.complianceInfoAccurate,
      compliancePlatformPolicies: draft.compliancePlatformPolicies,

      publishedAt: new Date(),
    })
    .returning();

  return row;
}

export async function createReviewAction(
  tx: DbOrTx,
  data: typeof reviewActions.$inferInsert
) {
  const [row] = await tx.insert(reviewActions).values(data).returning();
  return row;
}

export async function createAuditLog(
  tx: DbOrTx,
  data: typeof auditLogs.$inferInsert
) {
  const [row] = await tx.insert(auditLogs).values(data).returning();
  return row;
}