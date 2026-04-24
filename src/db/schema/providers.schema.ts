// src\db\schema\providers.schema.ts
import {
  boolean,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";

export const providers = pgTable(
  "providers",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    ownerUserId: uuid("owner_user_id").references(() => users.id, {
      onDelete: "set null",
    }),

    slug: varchar("slug", { length: 255 }).notNull(),
    providerType: varchar("provider_type", { length: 50 }).notNull(),

    status: varchar("status", { length: 50 }).notNull().default("draft"),
    claimStatus: varchar("claim_status", { length: 50 })
      .notNull()
      .default("unclaimed"),

    isPlaceholder: boolean("is_placeholder").notNull().default(false),

    businessName: varchar("business_name", { length: 255 }).notNull(),
    displayName: varchar("display_name", { length: 255 }),
    description: varchar("description", { length: 5000 }),
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

    isVerified: boolean("is_verified").notNull().default(false),

    publishedAt: timestamp("published_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("providers_slug_idx").on(table.slug),
    ownerUserIdIdx: index("providers_owner_user_id_idx").on(table.ownerUserId),
    statusIdx: index("providers_status_idx").on(table.status),
    providerTypeIdx: index("providers_provider_type_idx").on(
      table.providerType
    ),
    claimStatusIdx: index("providers_claim_status_idx").on(table.claimStatus),
  })
);

export type Provider = typeof providers.$inferSelect;
export type NewProvider = typeof providers.$inferInsert;