// src\db\schema\users.schema.ts
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    authUserId: uuid("auth_user_id"),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 30 }),

    fullName: varchar("full_name", { length: 255 }).notNull(),
    avatarUrl: varchar("avatar_url", { length: 1000 }),

    status: varchar("status", { length: 50 }).notNull().default("active"),
    isActive: boolean("is_active").notNull().default(true),

    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    authUserIdIdx: uniqueIndex("users_auth_user_id_idx").on(table.authUserId),
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
    phoneIdx: uniqueIndex("users_phone_idx").on(table.phone),
  })
);

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    role: varchar("role", { length: 50 }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userRoleUniqueIdx: uniqueIndex("user_roles_user_id_role_idx").on(
      table.userId,
      table.role
    ),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;