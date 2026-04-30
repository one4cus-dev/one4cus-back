// src\db\schema\governance.schema.ts
import {
  index,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
  jsonb,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema.js";
import { providers } from "./providers.schema.js";

export const reviewActions = pgTable(
  "review_actions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    entityType: varchar("entity_type", { length: 50 }).notNull(),
    entityId: uuid("entity_id").notNull(),

    action: varchar("action", { length: 50 }).notNull(),

    oldStatus: varchar("old_status", { length: 50 }),
    newStatus: varchar("new_status", { length: 50 }),

    reviewedBy: uuid("reviewed_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),

    notes: text("notes"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    entityIdx: index("review_actions_entity_idx").on(
      table.entityType,
      table.entityId
    ),
    reviewedByIdx: index("review_actions_reviewed_by_idx").on(
      table.reviewedBy
    ),
  })
);

export const providerClaimTokens = pgTable(
  "provider_claim_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),

    tokenHash: text("token_hash").notNull(),

    status: varchar("status", { length: 50 }).notNull().default("active"),

    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),

    generatedBy: uuid("generated_by")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    tokenHashIdx: uniqueIndex("provider_claim_tokens_token_hash_idx").on(
      table.tokenHash
    ),
    providerIdIdx: index("provider_claim_tokens_provider_id_idx").on(
      table.providerId
    ),
    statusIdx: index("provider_claim_tokens_status_idx").on(table.status),
  })
);

export const providerAccountLinks = pgTable(
  "provider_account_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    linkSource: varchar("link_source", { length: 50 }).notNull(),

    linkedBy: uuid("linked_by").references(() => users.id, {
      onDelete: "set null",
    }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    providerUserUniqueIdx: uniqueIndex(
      "provider_account_links_provider_user_idx"
    ).on(table.providerId, table.userId),
    providerIdIdx: index("provider_account_links_provider_id_idx").on(
      table.providerId
    ),
    userIdIdx: index("provider_account_links_user_id_idx").on(table.userId),
  })
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    actorUserId: uuid("actor_user_id").references(() => users.id, {
      onDelete: "set null",
    }),

    entityType: varchar("entity_type", { length: 50 }).notNull(),
    entityId: uuid("entity_id"),

    action: varchar("action", { length: 100 }).notNull(),

    metadataJson: jsonb("metadata_json"),

    ipAddress: varchar("ip_address", { length: 100 }),
    userAgent: text("user_agent"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    actorUserIdIdx: index("audit_logs_actor_user_id_idx").on(
      table.actorUserId
    ),
    entityIdx: index("audit_logs_entity_idx").on(
      table.entityType,
      table.entityId
    ),
    actionIdx: index("audit_logs_action_idx").on(table.action),
  })
);

export type ReviewAction = typeof reviewActions.$inferSelect;
export type NewReviewAction = typeof reviewActions.$inferInsert;

export type ProviderClaimToken = typeof providerClaimTokens.$inferSelect;
export type NewProviderClaimToken = typeof providerClaimTokens.$inferInsert;

export type ProviderAccountLink = typeof providerAccountLinks.$inferSelect;
export type NewProviderAccountLink = typeof providerAccountLinks.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;