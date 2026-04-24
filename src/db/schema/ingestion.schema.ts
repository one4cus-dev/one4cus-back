// src\db\schema\ingestion.schema.ts
import {
  bigint,
  index,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const sourceUploads = pgTable(
  "source_uploads",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    driveFileId: text("drive_file_id").notNull(),
    driveFolderId: text("drive_folder_id"),

    fileName: varchar("file_name", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),

    checksumMd5: text("checksum_md5"),
    checksumSha256: text("checksum_sha256"),
    imageHash: text("image_hash"),

    sourcePlatform: varchar("source_platform", { length: 100 }),
    uploadedByEmployee: varchar("uploaded_by_employee", { length: 255 }),
    uploadedAtDrive: timestamp("uploaded_at_drive", { withTimezone: true }),
    importedAt: timestamp("imported_at", { withTimezone: true })
      .notNull()
      .defaultNow(),

    status: varchar("status", { length: 50 }).notNull().default("uploaded"),
    duplicateStatus: varchar("duplicate_status", { length: 50 })
      .notNull()
      .default("not_checked"),

    originalUploadId: uuid("original_upload_id"),

    ocrStatus: varchar("ocr_status", { length: 50 }).notNull().default("pending"),
    aiStatus: varchar("ai_status", { length: 50 }).notNull().default("pending"),

    errorMessage: text("error_message"),
    rawMetadataJson: jsonb("raw_metadata_json"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    driveFileIdIdx: uniqueIndex("source_uploads_drive_file_id_idx").on(
      table.driveFileId
    ),
    statusIdx: index("source_uploads_status_idx").on(table.status),
    duplicateStatusIdx: index("source_uploads_duplicate_status_idx").on(
      table.duplicateStatus
    ),
    ocrStatusIdx: index("source_uploads_ocr_status_idx").on(table.ocrStatus),
    aiStatusIdx: index("source_uploads_ai_status_idx").on(table.aiStatus),
  })
);

export const uploadDuplicateMatches = pgTable(
  "upload_duplicate_matches",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceUploadId: uuid("source_upload_id")
      .notNull()
      .references(() => sourceUploads.id, { onDelete: "cascade" }),

    matchedUploadId: uuid("matched_upload_id")
      .notNull()
      .references(() => sourceUploads.id, { onDelete: "cascade" }),

    matchType: varchar("match_type", { length: 50 }).notNull(),
    matchScore: numeric("match_score", { precision: 5, scale: 2 }),

    decision: varchar("decision", { length: 50 }).notNull(),
    reason: text("reason"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    sourceUploadIdIdx: index("upload_duplicate_matches_source_upload_id_idx").on(
      table.sourceUploadId
    ),
    matchedUploadIdIdx: index(
      "upload_duplicate_matches_matched_upload_id_idx"
    ).on(table.matchedUploadId),
  })
);

export const ocrResults = pgTable(
  "ocr_results",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceUploadId: uuid("source_upload_id")
      .notNull()
      .references(() => sourceUploads.id, { onDelete: "cascade" }),

    ocrProvider: varchar("ocr_provider", { length: 100 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("pending"),

    rawText: text("raw_text"),
    cleanedText: text("cleaned_text"),
    textHash: text("text_hash"),

    confidenceScore: numeric("confidence_score", { precision: 5, scale: 2 }),

    errorMessage: text("error_message"),
    rawResponseJson: jsonb("raw_response_json"),

    processedAt: timestamp("processed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    sourceUploadIdIdx: index("ocr_results_source_upload_id_idx").on(
      table.sourceUploadId
    ),
    statusIdx: index("ocr_results_status_idx").on(table.status),
    textHashIdx: index("ocr_results_text_hash_idx").on(table.textHash),
  })
);

export const aiJobs = pgTable(
  "ai_jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceUploadId: uuid("source_upload_id")
      .notNull()
      .references(() => sourceUploads.id, { onDelete: "cascade" }),

    ocrResultId: uuid("ocr_result_id")
      .notNull()
      .references(() => ocrResults.id, { onDelete: "cascade" }),

    status: varchar("status", { length: 50 }).notNull().default("pending"),

    requestPayloadJson: jsonb("request_payload_json"),
    responsePayloadJson: jsonb("response_payload_json"),

    errorMessage: text("error_message"),

    startedAt: timestamp("started_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    sourceUploadIdIdx: index("ai_jobs_source_upload_id_idx").on(
      table.sourceUploadId
    ),
    ocrResultIdIdx: index("ai_jobs_ocr_result_id_idx").on(table.ocrResultId),
    statusIdx: index("ai_jobs_status_idx").on(table.status),
  })
);

export const aiOutputs = pgTable(
  "ai_outputs",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    aiJobId: uuid("ai_job_id")
      .notNull()
      .references(() => aiJobs.id, { onDelete: "cascade" }),

    sourceUploadId: uuid("source_upload_id")
      .notNull()
      .references(() => sourceUploads.id, { onDelete: "cascade" }),

    providerDataJson: jsonb("provider_data_json"),
    servicesDataJson: jsonb("services_data_json"),
    opportunitiesDataJson: jsonb("opportunities_data_json"),

    confidenceScore: numeric("confidence_score", { precision: 5, scale: 2 }),

    warningsJson: jsonb("warnings_json"),
    missingFieldsJson: jsonb("missing_fields_json"),
    rawOutputJson: jsonb("raw_output_json"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    aiJobIdIdx: uniqueIndex("ai_outputs_ai_job_id_idx").on(table.aiJobId),
    sourceUploadIdIdx: index("ai_outputs_source_upload_id_idx").on(
      table.sourceUploadId
    ),
  })
);

export type SourceUpload = typeof sourceUploads.$inferSelect;
export type NewSourceUpload = typeof sourceUploads.$inferInsert;

export type OcrResult = typeof ocrResults.$inferSelect;
export type NewOcrResult = typeof ocrResults.$inferInsert;

export type AiJob = typeof aiJobs.$inferSelect;
export type NewAiJob = typeof aiJobs.$inferInsert;

export type AiOutput = typeof aiOutputs.$inferSelect;
export type NewAiOutput = typeof aiOutputs.$inferInsert;