// src\common\constants\review-actions.ts
export const REVIEW_ACTIONS = {
  APPROVE: "approve",
  REJECT: "reject",
  PUBLISH: "publish",
  ARCHIVE: "archive",
  MERGE: "merge",
  REQUEST_CHANGES: "request_changes",
} as const;

export const REVIEW_ENTITY_TYPES = {
  PROVIDER: "provider",
  SERVICE_LISTING: "service_listing",
  OPPORTUNITY_LISTING: "opportunity_listing",
  PROVIDER_DRAFT: "provider_draft",
  SERVICE_LISTING_DRAFT: "service_listing_draft",
  OPPORTUNITY_LISTING_DRAFT: "opportunity_listing_draft",
} as const;