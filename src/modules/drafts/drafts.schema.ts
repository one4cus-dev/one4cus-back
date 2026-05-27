// src\modules\drafts\drafts.schema.ts
import { z } from "zod";

export const reviewDraftBodySchema = z.object({
  draftType: z.enum(["provider", "service", "opportunity"]),
  draftId: z.string().uuid(),
  decision: z.enum(["approve", "reject", "needs_changes"]),
  adminNotes: z.string().optional(),
  reviewedByUserId: z.string().uuid().optional(),
});

//this allows n8n to send different row data for provider, service, opportunity 
export const syncSheetDraftBodySchema = z.object({
  draftType: z.enum(["provider", "service", "opportunity"]),
  draftId: z.string().uuid(),
  data: z.record(z.string(), z.unknown()),
})

export type ReviewDraftBody = z.infer<typeof reviewDraftBodySchema>;
export type SyncSheetDraftBody = z.infer<typeof syncSheetDraftBodySchema>;