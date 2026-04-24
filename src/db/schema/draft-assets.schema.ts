// src\db\schema\draft-assets.schema.ts
import {
  bigint,
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {
  serviceListingDrafts,
  opportunityListingDrafts,
} from "./drafts.schema.js";

export const serviceListingDraftImages = pgTable(
  "service_listing_draft_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    serviceListingDraftId: uuid("service_listing_draft_id")
      .notNull()
      .references(() => serviceListingDrafts.id, { onDelete: "cascade" }),

    imageUrl: varchar("image_url", { length: 1000 }).notNull(),
    displayOrder: integer("display_order").notNull().default(0),
    isThumbnail: boolean("is_thumbnail").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    serviceListingDraftIdIdx: index(
      "service_listing_draft_images_draft_id_idx"
    ).on(table.serviceListingDraftId),
  })
);

export const serviceListingDraftDocuments = pgTable(
  "service_listing_draft_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    serviceListingDraftId: uuid("service_listing_draft_id")
      .notNull()
      .references(() => serviceListingDrafts.id, { onDelete: "cascade" }),

    documentType: varchar("document_type", { length: 100 }),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileUrl: varchar("file_url", { length: 1000 }).notNull(),
    mimeType: varchar("mime_type", { length: 100 }),
    fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    serviceListingDraftIdIdx: index(
      "service_listing_draft_documents_draft_id_idx"
    ).on(table.serviceListingDraftId),
  })
);

export const opportunityListingDraftImages = pgTable(
  "opportunity_listing_draft_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    opportunityListingDraftId: uuid("opportunity_listing_draft_id")
      .notNull()
      .references(() => opportunityListingDrafts.id, { onDelete: "cascade" }),

    imageUrl: varchar("image_url", { length: 1000 }).notNull(),
    displayOrder: integer("display_order").notNull().default(0),
    isThumbnail: boolean("is_thumbnail").notNull().default(false),
    isCover: boolean("is_cover").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    opportunityListingDraftIdIdx: index(
      "opportunity_listing_draft_images_draft_id_idx"
    ).on(table.opportunityListingDraftId),
  })
);

export const opportunityListingDraftDocuments = pgTable(
  "opportunity_listing_draft_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    opportunityListingDraftId: uuid("opportunity_listing_draft_id")
      .notNull()
      .references(() => opportunityListingDrafts.id, { onDelete: "cascade" }),

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
    opportunityListingDraftIdIdx: index(
      "opportunity_listing_draft_documents_draft_id_idx"
    ).on(table.opportunityListingDraftId),
  })
);

export const opportunityIdentityDraftDocuments = pgTable(
  "opportunity_identity_draft_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    opportunityListingDraftId: uuid("opportunity_listing_draft_id")
      .notNull()
      .references(() => opportunityListingDrafts.id, { onDelete: "cascade" }),

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
    opportunityListingDraftIdIdx: index(
      "opportunity_identity_draft_documents_draft_id_idx"
    ).on(table.opportunityListingDraftId),
  })
);