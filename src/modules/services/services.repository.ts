// src\modules\services\services.repository.ts
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  serviceListings,
  providers,
  type NewServiceListing,
} from "../../db/schema/index.js";

export async function createServiceListing(data: NewServiceListing) {
  const [service] = await db.insert(serviceListings).values(data).returning();
  return service;
}

export async function findServiceById(id: string) {
  const [service] = await db
    .select()
    .from(serviceListings)
    .where(eq(serviceListings.id, id))
    .limit(1);

  return service ?? null;
}

export async function listServices() {
  return await db.select().from(serviceListings);
}

export async function findProviderById(id: string) {
  const [provider] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);

  return provider ?? null;
}