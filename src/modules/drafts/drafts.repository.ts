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
import {
  booleanOrFalse,
  emptyToUndefined,
  numberStringOrUndefined,
} from "../../common/utils/db-value.js";

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
  const businessName =
    emptyToUndefined(draft.businessName) ?? "Unknown Provider";

  const providerType = emptyToUndefined(draft.providerType) ?? "both";

  const slug = `${businessName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")}-${draft.id.slice(0, 6)}`;

  const [row] = await tx
    .insert(providers)
    .values({
      slug,
      providerType,
      status: "published",
      claimStatus: "unclaimed",
      isPlaceholder: booleanOrFalse(draft.isPlaceholder),

      businessName,
      displayName: emptyToUndefined(draft.displayName),
      description: emptyToUndefined(draft.description),
      shortDescription: emptyToUndefined(draft.shortDescription),

      primaryPhone: emptyToUndefined(draft.primaryPhone),
      whatsappNumber: emptyToUndefined(draft.whatsappNumber),
      email: emptyToUndefined(draft.email),
      websiteUrl: emptyToUndefined(draft.websiteUrl),

      facebookUrl: emptyToUndefined(draft.facebookUrl),
      instagramUrl: emptyToUndefined(draft.instagramUrl),
      tiktokUrl: emptyToUndefined(draft.tiktokUrl),
      linkedinUrl: emptyToUndefined(draft.linkedinUrl),

      addressLine1: emptyToUndefined(draft.addressLine1),
      addressLine2: emptyToUndefined(draft.addressLine2),
      city: emptyToUndefined(draft.city),
      district: emptyToUndefined(draft.district),
      province: emptyToUndefined(draft.province),
      postalCode: emptyToUndefined(draft.postalCode),
      country: emptyToUndefined(draft.country) ?? "Sri Lanka",

      latitude: numberStringOrUndefined(draft.latitude),
      longitude: numberStringOrUndefined(draft.longitude),

      logoUrl: emptyToUndefined(draft.logoUrl),
      coverImageUrl: emptyToUndefined(draft.coverImageUrl),

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
  const title = emptyToUndefined(draft.title) ?? "Untitled Service";

  const slug = `${title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")}-${draft.id.slice(0, 6)}`;

  const [row] = await tx
    .insert(serviceListings)
    .values({
      providerId,
      slug,
      status: "published",

      title,
      category: emptyToUndefined(draft.category),
      locationText: emptyToUndefined(draft.locationText),
      tagsJson: draft.tagsJson ?? [],
      description: emptyToUndefined(draft.description),

      perWorkRate: numberStringOrUndefined(draft.perWorkRate),
      currency: emptyToUndefined(draft.currency) ?? "LKR",
      availability: emptyToUndefined(draft.availability),
      warrantyType: emptyToUndefined(draft.warrantyType),
      experienceText: emptyToUndefined(draft.experienceText),
      thumbnailImageUrl: emptyToUndefined(draft.thumbnailImageUrl),

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
  const title = emptyToUndefined(draft.title) ?? "Untitled Opportunity";

  const slug = `${title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")}-${draft.id.slice(0, 6)}`;

  const [row] = await tx
    .insert(opportunityListings)
    .values({
      providerId,
      slug,
      status: "published",

      title,
      category: emptyToUndefined(draft.category),
      shortSummary: emptyToUndefined(draft.shortSummary),
      fullDescription: emptyToUndefined(draft.fullDescription),

      province: emptyToUndefined(draft.province),
      district: emptyToUndefined(draft.district),
      city: emptyToUndefined(draft.city),
      postalCode: emptyToUndefined(draft.postalCode),

      projectStartDate: draft.projectStartDate ?? undefined,
      expectedCompletionDate: draft.expectedCompletionDate ?? undefined,

      coverImageUrl: emptyToUndefined(draft.coverImageUrl),

      investmentType: emptyToUndefined(draft.investmentType),
      expectedRoiText: emptyToUndefined(draft.expectedRoiText),

      fundingGoal: numberStringOrUndefined(draft.fundingGoal),
      minimumRaiseAmount: numberStringOrUndefined(draft.minimumRaiseAmount),
      minimumInvestment: numberStringOrUndefined(draft.minimumInvestment),
      maximumInvestment: numberStringOrUndefined(draft.maximumInvestment),

      dealDurationValue: draft.dealDurationValue ?? undefined,
      dealDurationUnit: emptyToUndefined(draft.dealDurationUnit),
      fundingDeadline: draft.fundingDeadline ?? undefined,
      investorBenefitsText: emptyToUndefined(draft.investorBenefitsText),

      riskLevel: emptyToUndefined(draft.riskLevel),
      riskInvestorsMayLoseCapital: booleanOrFalse(
        draft.riskInvestorsMayLoseCapital
      ),
      riskReturnsNotGuaranteed: booleanOrFalse(
        draft.riskReturnsNotGuaranteed
      ),
      riskTimelineMayChange: booleanOrFalse(draft.riskTimelineMayChange),

      complianceInfoAccurate: booleanOrFalse(draft.complianceInfoAccurate),
      compliancePlatformPolicies: booleanOrFalse(
        draft.compliancePlatformPolicies
      ),

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

//these functions only update draft tables not the permenent published tables
export async function updateProviderDraftFromSheet(
  tx: DbOrTx,
  id: string,
  data: Partial<typeof providerDrafts.$inferInsert>
) {
  const [row] = await tx
    .update(providerDrafts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(providerDrafts.id, id))
    .returning();

  return row ?? null;
}

export async function updateServiceDraftFromSheet(
  tx: DbOrTx,
  id: string,
  data: Partial<typeof serviceListingDrafts.$inferInsert>
) {
  const [row] = await tx
    .update(serviceListingDrafts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(serviceListingDrafts.id, id))
    .returning();

  return row ?? null;
}

export async function updateOpportunityDraftFromSheet(
  tx: DbOrTx,
  id: string,
  data: Partial<typeof opportunityListingDrafts.$inferInsert>
) {
  const [row] = await tx
    .update(opportunityListingDrafts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(opportunityListingDrafts.id, id))
    .returning();

  return row ?? null;
}