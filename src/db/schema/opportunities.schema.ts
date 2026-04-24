// src\db\schema\opportunities.schema.ts
import {
  bigint,
  boolean,
  date,
  index,
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { providers } from "./providers.schema.js";

export const opportunityListings = pgTable(
  "opportunity_listings",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),

    slug: varchar("slug", { length: 255 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("draft"),

    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }),

    shortSummary: varchar("short_summary", { length: 1000 }),
    fullDescription: varchar("full_description", { length: 8000 }),

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
    investorBenefitsText: varchar("investor_benefits_text", { length: 5000 }),

    riskLevel: varchar("risk_level", { length: 50 }),
    riskInvestorsMayLoseCapital: boolean(
      "risk_investors_may_lose_capital"
    ).notNull().default(false),
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

    publishedAt: timestamp("published_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("opportunity_listings_slug_idx").on(table.slug),
    providerIdIdx: index("opportunity_listings_provider_id_idx").on(
      table.providerId
    ),
    statusIdx: index("opportunity_listings_status_idx").on(table.status),
    categoryIdx: index("opportunity_listings_category_idx").on(table.category),
  })
);

export const opportunityListingImages = pgTable(
  "opportunity_listing_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    opportunityListingId: uuid("opportunity_listing_id")
      .notNull()
      .references(() => opportunityListings.id, { onDelete: "cascade" }),

    imageUrl: varchar("image_url", { length: 1000 }).notNull(),
    displayOrder: integer("display_order").notNull().default(0),
    isThumbnail: boolean("is_thumbnail").notNull().default(false),
    isCover: boolean("is_cover").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    opportunityListingIdIdx: index(
      "opportunity_listing_images_listing_id_idx"
    ).on(table.opportunityListingId),
  })
);

export const opportunityListingDocuments = pgTable(
  "opportunity_listing_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    opportunityListingId: uuid("opportunity_listing_id")
      .notNull()
      .references(() => opportunityListings.id, { onDelete: "cascade" }),

    documentType: varchar("document_type", { length: 100 }).notNull(),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileUrl: varchar("file_url", { length: 1000 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    opportunityListingIdIdx: index(
      "opportunity_listing_documents_listing_id_idx"
    ).on(table.opportunityListingId),
  })
);

export const opportunityIdentityDocuments = pgTable(
  "opportunity_identity_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    opportunityListingId: uuid("opportunity_listing_id")
      .notNull()
      .references(() => opportunityListings.id, { onDelete: "cascade" }),

    identityType: varchar("identity_type", { length: 50 }).notNull(),
    frontImageUrl: varchar("front_image_url", { length: 1000 }),
    backImageUrl: varchar("back_image_url", { length: 1000 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    opportunityListingIdIdx: index(
      "opportunity_identity_documents_listing_id_idx"
    ).on(table.opportunityListingId),
  })
);

export type OpportunityListing = typeof opportunityListings.$inferSelect;
export type NewOpportunityListing = typeof opportunityListings.$inferInsert;

export type OpportunityListingImage =
  typeof opportunityListingImages.$inferSelect;
export type NewOpportunityListingImage =
  typeof opportunityListingImages.$inferInsert;

export type OpportunityListingDocument =
  typeof opportunityListingDocuments.$inferSelect;
export type NewOpportunityListingDocument =
  typeof opportunityListingDocuments.$inferInsert;

export type OpportunityIdentityDocument =
  typeof opportunityIdentityDocuments.$inferSelect;
export type NewOpportunityIdentityDocument =
  typeof opportunityIdentityDocuments.$inferInsert;