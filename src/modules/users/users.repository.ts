// src\modules\users\users.repository.ts
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users, userRoles, type NewUser } from "../../db/schema/index.js";

export async function createUser(data: NewUser) {
  const [createdUser] = await db.insert(users).values(data).returning();
  return createdUser;
}

export async function createUserRoles(userId: string, roles: string[]) {
  if (roles.length === 0) return [];

  return await db
    .insert(userRoles)
    .values(roles.map((role) => ({ userId, role })))
    .returning();
}

export async function findUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user ?? null;
}

export async function findUserRoles(userId: string) {
  return await db.select().from(userRoles).where(eq(userRoles.userId, userId));
}

export async function listUsers() {
  return await db.select().from(users);
}