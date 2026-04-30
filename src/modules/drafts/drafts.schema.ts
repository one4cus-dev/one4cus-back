// src\modules\drafts\drafts.schema.ts
import { z } from "zod";

export const reviewDraftBodySchema = z.object({
  draftType: z.enum(["provider", "service", "opportunity"]),
  draftId: z.string().uuid(),
  decision: z.enum(["approve", "reject", "needs_changes"]),
  adminNotes: z.string().optional(),
  reviewedByUserId: z.string().uuid().optional(),
});

export type ReviewDraftBody = z.infer<typeof reviewDraftBodySchema>;