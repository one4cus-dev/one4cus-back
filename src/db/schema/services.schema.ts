// src\db\schema\services.schema.ts
import {
  boolean,
  bigint,
  index,
  integer,
  jsonb,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { providers } from "./providers.schema.js";

export const serviceListings = pgTable(
  "service_listings",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),

    slug: varchar("slug", { length: 255 }).notNull(),
    status: varchar("status", { length: 50 }).notNull().default("draft"),

    title: varchar("title", { length: 255 }).notNull(),
    category: varchar("category", { length: 100 }),
    locationText: varchar("location_text", { length: 255 }),

    tagsJson: jsonb("tags_json"),

    description: varchar("description", { length: 5000 }),

    perWorkRate: numeric("per_work_rate", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 10 }).notNull().default("LKR"),

    availability: varchar("availability", { length: 100 }),
    warrantyType: varchar("warranty_type", { length: 100 }),
    experienceText: varchar("experience_text", { length: 3000 }),

    thumbnailImageUrl: varchar("thumbnail_image_url", { length: 1000 }),

    publishedAt: timestamp("published_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("service_listings_slug_idx").on(table.slug),
    providerIdIdx: index("service_listings_provider_id_idx").on(
      table.providerId
    ),
    statusIdx: index("service_listings_status_idx").on(table.status),
    categoryIdx: index("service_listings_category_idx").on(table.category),
  })
);

export const serviceListingImages = pgTable(
  "service_listing_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    serviceListingId: uuid("service_listing_id")
      .notNull()
      .references(() => serviceListings.id, { onDelete: "cascade" }),

    imageUrl: varchar("image_url", { length: 1000 }).notNull(),
    displayOrder: integer("display_order").notNull().default(0),
    isThumbnail: boolean("is_thumbnail").notNull().default(false),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    serviceListingIdIdx: index("service_listing_images_listing_id_idx").on(
      table.serviceListingId
    ),
  })
);

export const serviceListingDocuments = pgTable(
  "service_listing_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    serviceListingId: uuid("service_listing_id")
      .notNull()
      .references(() => serviceListings.id, { onDelete: "cascade" }),

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
    serviceListingIdIdx: index("service_listing_documents_listing_id_idx").on(
      table.serviceListingId
    ),
  })
);

export type ServiceListing = typeof serviceListings.$inferSelect;
export type NewServiceListing = typeof serviceListings.$inferInsert;

export type ServiceListingImage = typeof serviceListingImages.$inferSelect;
export type NewServiceListingImage = typeof serviceListingImages.$inferInsert;

export type ServiceListingDocument =
  typeof serviceListingDocuments.$inferSelect;
export type NewServiceListingDocument =
  typeof serviceListingDocuments.$inferInsert;