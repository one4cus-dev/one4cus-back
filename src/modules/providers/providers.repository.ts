// src\modules\providers\providers.repository.ts
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { providers, type NewProvider } from "../../db/schema/index.js";

export async function createProvider(data: NewProvider) {
  const [provider] = await db.insert(providers).values(data).returning();
  return provider;
}

export async function findProviderById(id: string) {
  const [provider] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);

  return provider ?? null;
}

export async function listProviders() {
  return await db.select().from(providers);
}