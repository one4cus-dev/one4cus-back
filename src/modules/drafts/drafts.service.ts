// src\modules\drafts\drafts.service.ts
import { db } from "../../db/index.js";
import { AppError } from "../../common/errors/app-error.js";
import { REVIEW_ACTIONS, REVIEW_ENTITY_TYPES } from "../../common/constants/index.js";
import type { ReviewDraftBody } from "./drafts.schema.js";
import * as repo from "./drafts.repository.js";
import type { DbOrTx } from "../../db/types.js";
import { revalidateFrontend } from "../../lib/revalidate-frontend.js";

import type { SyncSheetDraftBody } from "./drafts.schema.js";
import { mapProviderSheetData, mapServiceSheetData, mapOpportunitySheetData, removeUndefinedValues } from "./drafts-sheet.mapper.js";

function toRejectedStatus(decision: "reject" | "needs_changes") {
  return decision === "reject" ? "rejected" : "needs_changes";
}

function getReviewAction(decision: ReviewDraftBody["decision"]) {
  if (decision === "approve") return REVIEW_ACTIONS.APPROVE;
  if (decision === "reject") return REVIEW_ACTIONS.REJECT;
  return REVIEW_ACTIONS.REQUEST_CHANGES;
}

async function createReviewAndAudit(
  tx: DbOrTx,
  input: ReviewDraftBody,
  entityType: string,
  oldStatus: string | null,
  newStatus: string
) {
  if (input.reviewedByUserId) {
    await repo.createReviewAction(tx, {
      entityType,
      entityId: input.draftId,
      action: getReviewAction(input.decision),
      oldStatus,
      newStatus,
      reviewedBy: input.reviewedByUserId,
      notes: input.adminNotes,
    });
  }

  await repo.createAuditLog(tx, {
    actorUserId: input.reviewedByUserId,
    entityType,
    entityId: input.draftId,
    action: `draft_${input.decision}`,
    metadataJson: {
      draftType: input.draftType,
      decision: input.decision,
      adminNotes: input.adminNotes ?? null,
    },
  });
}

async function resolveProviderForChildDraft(
  tx: DbOrTx,
  providerDraftId: string,
  adminNotes?: string
) {
  const providerDraft = await repo.findProviderDraft(tx, providerDraftId);

  if (!providerDraft) {
    throw new AppError("Provider draft not found", 404, "PROVIDER_DRAFT_NOT_FOUND");
  }

  if (providerDraft.matchedProviderId) {
    const existingProvider = await repo.findProviderById(
      tx,
      providerDraft.matchedProviderId
    );

    if (existingProvider) {
      return existingProvider;
    }
  }

  if (providerDraft.draftStatus === "published" && !providerDraft.matchedProviderId) {
    throw new AppError(
      "Provider draft is published but missing matched provider id",
      409,
      "BROKEN_PROVIDER_DRAFT_STATE"
    );
  }

  const publishedProvider = await repo.publishProviderDraft(tx, providerDraft);

  await repo.updateProviderDraftAfterPublish(
    tx,
    providerDraft.id,
    publishedProvider.id,
    adminNotes
  );

  return publishedProvider;
}

export async function reviewDraft(input: ReviewDraftBody) {
  const result = await db.transaction(async (tx) => {
    if (input.draftType === "provider") {
      return await reviewProviderDraft(tx, input);
    }

    if (input.draftType === "service") {
      return await reviewServiceDraft(tx, input);
    }

    return await reviewOpportunityDraft(tx, input);
  });

  if(input.decision === "approve"){
    await revalidateAfterDraftApproval(input.draftType, result);
  }
  return result;
}

//this function allows n8n to sync the draft data from google sheet to our database when the admin updates the data in google sheet, it will be called in n8n workflow after the admin updates the data in google sheet and it will update the draft data in our database with the updated data from google sheet
//this do find draft->reject update if already published->map google sheet fields to DB fields->normalize category->update draft table
export async function syncSheetDraftRow(input: SyncSheetDraftBody) {
  return await db.transaction(async (tx) => {
    if (input.draftType === "provider") {
      const draft = await repo.findProviderDraft(tx, input.draftId);

      if (!draft) {
        throw new AppError("Provider draft not found", 404, "DRAFT_NOT_FOUND");
      }

      if (draft.draftStatus === "published") {
        throw new AppError(
          "Cannot update a published provider draft from Google Sheet",
          409,
          "DRAFT_ALREADY_PUBLISHED"
        );
      }

      const mappedData = removeUndefinedValues(mapProviderSheetData(input.data));

      const updated = await repo.updateProviderDraftFromSheet(
        tx,
        input.draftId,
        mappedData
      );

      return {
        action: "draft_synced",
        draftType: input.draftType,
        draft: updated,
      };
    }

    if (input.draftType === "service") {
      const draft = await repo.findServiceDraft(tx, input.draftId);

      if (!draft) {
        throw new AppError("Service draft not found", 404, "DRAFT_NOT_FOUND");
      }

      if (draft.draftStatus === "published") {
        throw new AppError(
          "Cannot update a published service draft from Google Sheet",
          409,
          "DRAFT_ALREADY_PUBLISHED"
        );
      }

      const mappedData = removeUndefinedValues(mapServiceSheetData(input.data));

      const updated = await repo.updateServiceDraftFromSheet(
        tx,
        input.draftId,
        mappedData
      );

      return {
        action: "draft_synced",
        draftType: input.draftType,
        draft: updated,
      };
    }

    const draft = await repo.findOpportunityDraft(tx, input.draftId);

    if (!draft) {
      throw new AppError("Opportunity draft not found", 404, "DRAFT_NOT_FOUND");
    }

    if (draft.draftStatus === "published") {
      throw new AppError(
        "Cannot update a published opportunity draft from Google Sheet",
        409,
        "DRAFT_ALREADY_PUBLISHED"
      );
    }

    const mappedData = removeUndefinedValues(mapOpportunitySheetData(input.data));

    const updated = await repo.updateOpportunityDraftFromSheet(
      tx,
      input.draftId,
      mappedData
    );

    return {
      action: "draft_synced",
      draftType: input.draftType,
      draft: updated,
    };
  });
}

async function revalidateAfterDraftApproval(
  draftType: ReviewDraftBody["draftType"],
  result: unknown
) {
  const data = result as {
    action?: string;
    publishedProvider?: { slug: string };
    publishedService?: { slug: string };
    publishedOpportunity?: { slug: string };
  };

  if (data.action === "already_published") {
    return;
  }

  if (draftType === "provider") {
    await revalidateFrontend({
      type: "all",
    });

    return;
  }

  if (draftType === "service" && data.publishedService?.slug) {
    await revalidateFrontend({
      type: "service",
      slug: data.publishedService.slug,
    });

    await revalidateFrontend({
      type: "services",
    });

    await revalidateFrontend({
      type: "home",
    });

    return;
  }

  if (draftType === "opportunity" && data.publishedOpportunity?.slug) {
    await revalidateFrontend({
      type: "deal",
      slug: data.publishedOpportunity.slug,
    });

    await revalidateFrontend({
      type: "deals",
    });

    await revalidateFrontend({
      type: "home",
    });
  }
}

async function reviewProviderDraft(tx: DbOrTx, input: ReviewDraftBody) {
  const draft = await repo.findProviderDraft(tx, input.draftId);

  if (!draft) {
    throw new AppError("Provider draft not found", 404, "DRAFT_NOT_FOUND");
  }

  if (input.decision !== "approve") {
    const newStatus = toRejectedStatus(input.decision);
    const updated = await repo.updateProviderDraftStatus(
      tx,
      input.draftId,
      newStatus,
      input.adminNotes
    );

    await createReviewAndAudit(
      tx,
      input,
      REVIEW_ENTITY_TYPES.PROVIDER_DRAFT,
      draft.draftStatus,
      newStatus
    );

    return { action: newStatus, draft: updated };
  }

  if (draft.matchedProviderId) {
    const existing = await repo.findProviderById(tx, draft.matchedProviderId);

    if (existing) {
      await createReviewAndAudit(
        tx,
        input,
        REVIEW_ENTITY_TYPES.PROVIDER_DRAFT,
        draft.draftStatus,
        "published"
      );

      return {
        action: "already_published",
        publishedProvider: existing,
      };
    }
  }

  if (draft.draftStatus === "published") {
    throw new AppError(
      "Provider draft already published but linked provider was not found",
      409,
      "BROKEN_PUBLISHED_DRAFT"
    );
  }

  const published = await repo.publishProviderDraft(tx, draft);

  const updatedDraft = await repo.updateProviderDraftAfterPublish(
    tx,
    input.draftId,
    published.id,
    input.adminNotes
  );

  await createReviewAndAudit(
    tx,
    input,
    REVIEW_ENTITY_TYPES.PROVIDER_DRAFT,
    draft.draftStatus,
    "published"
  );

  return {
    action: "approved",
    draft: updatedDraft,
    publishedProvider: published,
  };
}

async function reviewServiceDraft(tx: DbOrTx, input: ReviewDraftBody) {
  const draft = await repo.findServiceDraft(tx, input.draftId);

  if (!draft) {
    throw new AppError("Service draft not found", 404, "DRAFT_NOT_FOUND");
  }

  if (input.decision !== "approve") {
    const newStatus = toRejectedStatus(input.decision);
    const updated = await repo.updateServiceDraftStatus(
      tx,
      input.draftId,
      newStatus,
      input.adminNotes
    );

    await createReviewAndAudit(
      tx,
      input,
      REVIEW_ENTITY_TYPES.SERVICE_LISTING_DRAFT,
      draft.draftStatus,
      newStatus
    );

    return { action: newStatus, draft: updated };
  }

  if (draft.matchedServiceListingId) {
    const existing = await repo.findServiceById(tx, draft.matchedServiceListingId);

    if (existing) {
      await createReviewAndAudit(
        tx,
        input,
        REVIEW_ENTITY_TYPES.SERVICE_LISTING_DRAFT,
        draft.draftStatus,
        "published"
      );

      return {
        action: "already_published",
        publishedService: existing,
      };
    }
  }

  if (draft.draftStatus === "published") {
    throw new AppError(
      "Service draft already published but linked service was not found",
      409,
      "BROKEN_PUBLISHED_DRAFT"
    );
  }

  if (!draft.providerDraftId) {
    throw new AppError(
      "Service draft has no provider draft",
      400,
      "MISSING_PROVIDER_DRAFT"
    );
  }

  const provider = await resolveProviderForChildDraft(
    tx,
    draft.providerDraftId,
    input.adminNotes
  );

  const published = await repo.publishServiceDraft(tx, draft, provider.id);

  const updatedDraft = await repo.updateServiceDraftAfterPublish(
    tx,
    input.draftId,
    published.id,
    input.adminNotes
  );

  await createReviewAndAudit(
    tx,
    input,
    REVIEW_ENTITY_TYPES.SERVICE_LISTING_DRAFT,
    draft.draftStatus,
    "published"
  );

  return {
    action: "approved",
    provider,
    draft: updatedDraft,
    publishedService: published,
  };
}

async function reviewOpportunityDraft(tx: DbOrTx, input: ReviewDraftBody) {
  const draft = await repo.findOpportunityDraft(tx, input.draftId);

  if (!draft) {
    throw new AppError("Opportunity draft not found", 404, "DRAFT_NOT_FOUND");
  }

  if (input.decision !== "approve") {
    const newStatus = toRejectedStatus(input.decision);
    const updated = await repo.updateOpportunityDraftStatus(
      tx,
      input.draftId,
      newStatus,
      input.adminNotes
    );

    await createReviewAndAudit(
      tx,
      input,
      REVIEW_ENTITY_TYPES.OPPORTUNITY_LISTING_DRAFT,
      draft.draftStatus,
      newStatus
    );

    return { action: newStatus, draft: updated };
  }

  if (draft.matchedOpportunityListingId) {
    const existing = await repo.findOpportunityById(
      tx,
      draft.matchedOpportunityListingId
    );

    if (existing) {
      await createReviewAndAudit(
        tx,
        input,
        REVIEW_ENTITY_TYPES.OPPORTUNITY_LISTING_DRAFT,
        draft.draftStatus,
        "published"
      );

      return {
        action: "already_published",
        publishedOpportunity: existing,
      };
    }
  }

  if (draft.draftStatus === "published") {
    throw new AppError(
      "Opportunity draft already published but linked opportunity was not found",
      409,
      "BROKEN_PUBLISHED_DRAFT"
    );
  }

  if (!draft.providerDraftId) {
    throw new AppError(
      "Opportunity draft has no provider draft",
      400,
      "MISSING_PROVIDER_DRAFT"
    );
  }

  const provider = await resolveProviderForChildDraft(
    tx,
    draft.providerDraftId,
    input.adminNotes
  );

  const published = await repo.publishOpportunityDraft(tx, draft, provider.id);

  const updatedDraft = await repo.updateOpportunityDraftAfterPublish(
    tx,
    input.draftId,
    published.id,
    input.adminNotes
  );

  await createReviewAndAudit(
    tx,
    input,
    REVIEW_ENTITY_TYPES.OPPORTUNITY_LISTING_DRAFT,
    draft.draftStatus,
    "published"
  );

  return {
    action: "approved",
    provider,
    draft: updatedDraft,
    publishedOpportunity: published,
  };
}