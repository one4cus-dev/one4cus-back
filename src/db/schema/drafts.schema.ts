// src\db\schema\drafts.schema.ts
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { providers } from "./providers.schema.js";
import { serviceListings } from "./services.schema.js";
import { opportunityListings } from "./opportunities.schema.js";
import { sourceUploads, aiOutputs } from "./ingestion.schema.js";

export const providerDrafts = pgTable(
  "provider_drafts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceUploadId: uuid("source_upload_id").references(() => sourceUploads.id, {
      onDelete: "set null",
    }),
    aiOutputId: uuid("ai_output_id").references(() => aiOutputs.id, {
      onDelete: "set null",
    }),
    matchedProviderId: uuid("matched_provider_id").references(
      () => providers.id,
      { onDelete: "set null" }
    ),

    draftStatus: varchar("draft_status", { length: 50 })
      .notNull()
      .default("pending_review"),
    reviewStatus: varchar("review_status", { length: 50 })
      .notNull()
      .default("not_reviewed"),

    isPlaceholder: boolean("is_placeholder").notNull().default(false),

    businessName: varchar("business_name", { length: 255 }).notNull(),
    displayName: varchar("display_name", { length: 255 }),
    providerType: varchar("provider_type", { length: 50 }).notNull(),

    description: text("description"),
    shortDescription: varchar("short_description", { length: 500 }),

    primaryPhone: varchar("primary_phone", { length: 30 }),
    whatsappNumber: varchar("whatsapp_number", { length: 30 }),
    email: varchar("email", { length: 255 }),
    websiteUrl: varchar("website_url", { length: 1000 }),

    facebookUrl: varchar("facebook_url", { length: 1000 }),
    instagramUrl: varchar("instagram_url", { length: 1000 }),
    tiktokUrl: varchar("tiktok_url", { length: 1000 }),
    linkedinUrl: varchar("linkedin_url", { length: 1000 }),

    addressLine1: varchar("address_line_1", { length: 255 }),
    addressLine2: varchar("address_line_2", { length: 255 }),
    city: varchar("city", { length: 100 }),
    district: varchar("district", { length: 100 }),
    province: varchar("province", { length: 100 }),
    postalCode: varchar("postal_code", { length: 20 }),
    country: varchar("country", { length: 100 }).default("Sri Lanka"),

    latitude: numeric("latitude", { precision: 10, scale: 7 }),
    longitude: numeric("longitude", { precision: 10, scale: 7 }),

    logoUrl: varchar("logo_url", { length: 1000 }),
    coverImageUrl: varchar("cover_image_url", { length: 1000 }),

    confidenceScore: numeric("confidence_score", { precision: 5, scale: 2 }),
    reviewNotes: text("review_notes"),

    createdBy: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    updatedBy: uuid("updated_by").references(() => users.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    sourceUploadIdIdx: index("provider_drafts_source_upload_id_idx").on(
      table.sourceUploadId
    ),
    aiOutputIdIdx: index("provider_drafts_ai_output_id_idx").on(
      table.aiOutputId
    ),
    draftStatusIdx: index("provider_drafts_draft_status_idx").on(
      table.draftStatus
    ),
    matchedProviderIdIdx: index("provider_drafts_matched_provider_id_idx").on(
      table.matchedProviderId
    ),
  })
);

export const serviceListingDrafts = pgTable(
  "service_listing_drafts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceUploadId: uuid("source_upload_id").references(() => sourceUploads.id, {
      onDelete: "set null",
    }),
    aiOutputId: uuid("ai_output_id").references(() => aiOutputs.id, {
      onDelete: "set null",
    }),
    providerDraftId: uuid("provider_draft_id").references(
      () => providerDrafts.id,
      { onDelete: "cascade" }
    ),
    matchedServiceListingId: uuid("matched_service_listing_id").references(
      () => serviceListings.id,
      { onDelete: "set null" }
    ),

    draftStatus: varchar("draft_status", { length: 50 })
      .notNull()
      .default("pending_review"),
    reviewStatus: varchar("review_status", { length: 50 })
      .notNull()
      .default("not_reviewed"),

    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }),
    locationText: varchar("location_text", { length: 255 }),
    tagsJson: jsonb("tags_json"),
    description: text("description"),

    perWorkRate: numeric("per_work_rate", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 10 }).notNull().default("LKR"),
    availability: varchar("availability", { length: 100 }),
    warrantyType: varchar("warranty_type", { length: 100 }),
    experienceText: text("experience_text"),

    thumbnailImageUrl: varchar("thumbnail_image_url", { length: 1000 }),

    confidenceScore: numeric("confidence_score", { precision: 5, scale: 2 }),
    reviewNotes: text("review_notes"),

    createdBy: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    updatedBy: uuid("updated_by").references(() => users.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    providerDraftIdIdx: index("service_listing_drafts_provider_draft_id_idx").on(
      table.providerDraftId
    ),
    sourceUploadIdIdx: index("service_listing_drafts_source_upload_id_idx").on(
      table.sourceUploadId
    ),
    draftStatusIdx: index("service_listing_drafts_draft_status_idx").on(
      table.draftStatus
    ),
  })
);

export const opportunityListingDrafts = pgTable(
  "opportunity_listing_drafts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    sourceUploadId: uuid("source_upload_id").references(() => sourceUploads.id, {
      onDelete: "set null",
    }),
    aiOutputId: uuid("ai_output_id").references(() => aiOutputs.id, {
      onDelete: "set null",
    }),
    providerDraftId: uuid("provider_draft_id").references(
      () => providerDrafts.id,
      { onDelete: "cascade" }
    ),
    matchedOpportunityListingId: uuid(
      "matched_opportunity_listing_id"
    ).references(() => opportunityListings.id, { onDelete: "set null" }),

    draftStatus: varchar("draft_status", { length: 50 })
      .notNull()
      .default("pending_review"),
    reviewStatus: varchar("review_status", { length: 50 })
      .notNull()
      .default("not_reviewed"),

    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }),
    shortSummary: text("short_summary"),
    fullDescription: text("full_description"),

    province: varchar("province", { length: 100 }),
    district: varchar("district", { length: 100 }),
    city: varchar("city", { length: 100 }),
    postalCode: varchar("postal_code", { length: 20 }),

    projectStartDate: date("project_start_date"),
    expectedCompletionDate: date("expected_completion_date"),

    coverImageUrl: varchar("cover_image_url", { length: 1000 }),

    investmentType: varchar("investment_type", { length: 50 }),
    expectedRoiText: varchar("expected_roi_text", { length: 100 }),

    fundingGoal: numeric("funding_goal", { precision: 14, scale: 2 }),
    fundingGoalCurrency: varchar("funding_goal_currency", { length: 10 })
      .notNull()
      .default("LKR"),

    minimumRaiseAmount: numeric("minimum_raise_amount", {
      precision: 14,
      scale: 2,
    }),
    minimumRaiseCurrency: varchar("minimum_raise_currency", { length: 10 })
      .notNull()
      .default("LKR"),

    minimumInvestment: numeric("minimum_investment", {
      precision: 14,
      scale: 2,
    }),
    minimumInvestmentCurrency: varchar("minimum_investment_currency", {
      length: 10,
    })
      .notNull()
      .default("LKR"),

    maximumInvestment: numeric("maximum_investment", {
      precision: 14,
      scale: 2,
    }),
    maximumInvestmentCurrency: varchar("maximum_investment_currency", {
      length: 10,
    })
      .notNull()
      .default("LKR"),

    dealDurationValue: integer("deal_duration_value"),
    dealDurationUnit: varchar("deal_duration_unit", { length: 20 }),

    fundingDeadline: date("funding_deadline"),
    investorBenefitsText: text("investor_benefits_text"),

    riskLevel: varchar("risk_level", { length: 50 }),
    riskInvestorsMayLoseCapital: boolean(
      "risk_investors_may_lose_capital"
    )
      .notNull()
      .default(false),
    riskReturnsNotGuaranteed: boolean("risk_returns_not_guaranteed")
      .notNull()
      .default(false),
    riskTimelineMayChange: boolean("risk_timeline_may_change")
      .notNull()
      .default(false),

    complianceInfoAccurate: boolean("compliance_info_accurate")
      .notNull()
      .default(false),
    compliancePlatformPolicies: boolean("compliance_platform_policies")
      .notNull()
      .default(false),

    confidenceScore: numeric("confidence_score", { precision: 5, scale: 2 }),
    reviewNotes: text("review_notes"),

    createdBy: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    updatedBy: uuid("updated_by").references(() => users.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    providerDraftIdIdx: index(
      "opportunity_listing_drafts_provider_draft_id_idx"
    ).on(table.providerDraftId),
    sourceUploadIdIdx: index(
      "opportunity_listing_drafts_source_upload_id_idx"
    ).on(table.sourceUploadId),
    draftStatusIdx: index("opportunity_listing_drafts_draft_status_idx").on(
      table.draftStatus
    ),
  })
);

export type ProviderDraft = typeof providerDrafts.$inferSelect;
export type NewProviderDraft = typeof providerDrafts.$inferInsert;

export type ServiceListingDraft = typeof serviceListingDrafts.$inferSelect;
export type NewServiceListingDraft = typeof serviceListingDrafts.$inferInsert;

export type OpportunityListingDraft =
  typeof opportunityListingDrafts.$inferSelect;
export type NewOpportunityListingDraft =
  typeof opportunityListingDrafts.$inferInsert;