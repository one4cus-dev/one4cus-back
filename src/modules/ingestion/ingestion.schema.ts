// src\modules\ingestion\ingestion.schema.ts
import { z } from "zod";

export const ingestAiDraftBodySchema = z.object({
  source: z.object({
    driveFileId: z.string(),
    driveFolderId: z.string().optional(),
    fileName: z.string(),
    mimeType: z.string().optional(),
    fileSizeBytes: z.number().optional(),
    sourcePlatform: z.string().optional(),
    uploadedByEmployee: z.string().optional(),
    rawMetadataJson: z.record(z.string(),z.unknown()).optional(),
  }),

  ocr: z.object({
    ocrProvider: z.string().default("n8n"),
    rawText: z.string().optional(),
    cleanedText: z.string().optional(),
    confidenceScore: z.number().optional(),
    rawResponseJson: z.record(z.string(), z.unknown()).optional(),
  }),

  ai: z.object({
    providerDataJson: z.record(z.string(), z.unknown()).optional(),
    servicesDataJson: z.array(z.record(z.string(), z.unknown())).optional(),
    opportunitiesDataJson: z.array(z.record(z.string(), z.unknown())).optional(),
    confidenceScore: z.number().optional(),
    warningsJson: z.array(z.record(z.string(), z.unknown())).optional(),
    missingFieldsJson: z.array(z.record(z.string(), z.unknown())).optional(),
    rawOutputJson: z.record(z.string(), z.unknown()).optional(),
  }),
});

export type IngestAiDraftBody = z.infer<typeof ingestAiDraftBodySchema>;