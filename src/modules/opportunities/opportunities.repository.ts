// src\modules\opportunities\opportunities.repository.ts
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  opportunityListings,
  providers,
  type NewOpportunityListing,
} from "../../db/schema/index.js";

export async function createOpportunity(data: NewOpportunityListing) {
  const [row] = await db
    .insert(opportunityListings)
    .values(data)
    .returning();

  return row;
}

export async function findOpportunityById(id: string) {
  const [row] = await db
    .select()
    .from(opportunityListings)
    .where(eq(opportunityListings.id, id))
    .limit(1);

  return row ?? null;
}

export async function listOpportunities() {
  return await db.select().from(opportunityListings);
}

export async function findProviderById(id: string) {
  const [row] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);

  return row ?? null;
}