// src\common\constants\statuses.ts
export const USER_STATUSES = {
  ACTIVE: "active",
  INVITED: "invited",
  DISABLED: "disabled",
} as const;

export const PUBLIC_ENTITY_STATUSES = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
  SUSPENDED: "suspended",
} as const;

export const CLAIM_STATUSES = {
  UNCLAIMED: "unclaimed",
  CLAIM_PENDING: "claim_pending",
  CLAIMED: "claimed",
} as const;

export const DRAFT_STATUSES = {
  PENDING_REVIEW: "pending_review",
  APPROVED: "approved",
  REJECTED: "rejected",
  PUBLISHED: "published",
  MERGED: "merged",
} as const;

export const REVIEW_STATUSES = {
  NOT_REVIEWED: "not_reviewed",
  REVIEWED: "reviewed",
  NEEDS_CHANGES: "needs_changes",
} as const;

export const INGESTION_STATUSES = {
  UPLOADED: "uploaded",
  DUPLICATE: "duplicate",
  OCR_PENDING: "ocr_pending",
  OCR_PROCESSING: "ocr_processing",
  OCR_DONE: "ocr_done",
  AI_PENDING: "ai_pending",
  AI_PROCESSING: "ai_processing",
  AI_DONE: "ai_done",
  DRAFT_CREATED: "draft_created",
  FAILED: "failed",
} as const;

export const JOB_STATUSES = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;

export const DUPLICATE_STATUSES = {
  NOT_CHECKED: "not_checked",
  UNIQUE: "unique",
  DUPLICATE: "duplicate",
  POSSIBLE_DUPLICATE: "possible_duplicate",
} as const;

export const TOKEN_STATUSES = {
  ACTIVE: "active",
  USED: "used",
  EXPIRED: "expired",
  REVOKED: "revoked",
} as const;