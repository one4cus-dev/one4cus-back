// src\modules\public\public.repository.ts
import { and, count, eq, ilike, or, sql } from "drizzle-orm";
import type {SQL} from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  providers,
  serviceListings,
  opportunityListings,
} from "../../db/schema/index.js";
import { PUBLIC_ENTITY_STATUSES } from "../../common/constants/index.js";

type PublicListQuery = {
  search?: string;
  category?: string[];
  city?: string;
  type?: string; // provider, service, opportunity
  verified?: boolean;
  page: number;
  limit: number;
};

//helper function
function getPagination(query: PublicListQuery) {
  const page = query.page;
  const limit = query.limit;
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

function buildPaginationMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPreviousPage: page > 1,
  };
}

function createServiceCategoryConditions(categories?: string[]) {
  if (!categories || categories.length === 0) {
    return undefined;
  }

  const categoryConditions = categories
    .map((category) => category.trim())
    .filter(Boolean)
    .map((category) =>
      or(
        ilike(serviceListings.category, `%${category}%`),
        ilike(serviceListings.title, `%${category}%`),
        ilike(serviceListings.description, `%${category}%`)
      )
    )
    .filter((condition): condition is SQL => Boolean(condition));


  if (categoryConditions.length === 0) {
    return undefined;
  }

  return or(...categoryConditions);
}

function createOpportunityCategoryConditions(categories?: string[]) {
  if (!categories || categories.length === 0) {
    return undefined;
  }

  const categoryConditions = categories
    .map((category) => category.trim())
    .filter(Boolean)
    .map((category) =>
      or(
        ilike(opportunityListings.category, `%${category}%`),
        ilike(opportunityListings.title, `%${category}%`),
        ilike(opportunityListings.shortSummary, `%${category}%`),
        ilike(opportunityListings.fullDescription, `%${category}%`),
        ilike(opportunityListings.investmentType, `%${category}%`)
      )
    )
    .filter((condition): condition is SQL => Boolean(condition));

  if (categoryConditions.length === 0) {
    return undefined;
  }

  return or(...categoryConditions);
}

export async function listPublishedProviders(query: PublicListQuery) {
  const { page, limit, offset } = getPagination(query);

  const conditions = [eq(providers.status, PUBLIC_ENTITY_STATUSES.PUBLISHED)];

  if (query.search) {
    conditions.push(
      or(
        ilike(providers.businessName, `%${query.search}%`),
        ilike(providers.description, `%${query.search}%`),
        ilike(providers.shortDescription, `%${query.search}%`)
      )!
    );
  }

  if (query.city) {
    conditions.push(ilike(providers.city, `%${query.city}%`));
  }

  if (query.type) {
    conditions.push(eq(providers.providerType, query.type));
  }

  const whereClause = and(...conditions);

  const [totalRow] = await db
    .select({ count: count() })
    .from(providers)
    .where(whereClause);

  const data = await db
    .select()
    .from(providers)
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy(sql`${providers.publishedAt} DESC NULLS LAST`);

  return {
    data,
    meta: buildPaginationMeta(totalRow.count, page, limit),
  };
}

export async function findPublishedProviderById(id: string) {
  const [row] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, id))
    .limit(1);

  if (!row || row.status !== PUBLIC_ENTITY_STATUSES.PUBLISHED) {
    return null;
  }

  return row;
}

//slug function for provider
export async function findPublishedProviderBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(providers)
    .where(eq(providers.slug, slug))
    .limit(1);

  if (!row || row.status !== PUBLIC_ENTITY_STATUSES.PUBLISHED) {
    return null;
  }

  return row;
}

export async function listPublishedServices(query: PublicListQuery) {
  const { page, limit, offset } = getPagination(query);

  const conditions = [
    eq(serviceListings.status, PUBLIC_ENTITY_STATUSES.PUBLISHED),
  ];

  if (query.search) {
    conditions.push(
      or(
        ilike(serviceListings.title, `%${query.search}%`),
        ilike(serviceListings.category, `%${query.search}%`),
        ilike(serviceListings.description, `%${query.search}%`),
        ilike(serviceListings.locationText, `%${query.search}%`),
        ilike(providers.businessName, `%${query.search}%`),
        ilike(providers.city, `%${query.search}%`),
      )!,
    );
  }

  const categoryCondition = createServiceCategoryConditions(query.category);

if (categoryCondition) {
  conditions.push(categoryCondition);
}

  if (query.city) {
  conditions.push(
    or(
      ilike(providers.city, `%${query.city}%`),
      ilike(serviceListings.locationText, `%${query.city}%`)
    )!
  );
}

  const whereClause = and(...conditions);

  const [totalRow] = await db
    .select({ count: count() })
    .from(serviceListings)
    .leftJoin(providers, eq(serviceListings.providerId, providers.id))
    .where(whereClause);

  const data = await db
    .select({
      id: serviceListings.id,
      providerId: serviceListings.providerId,
      slug: serviceListings.slug,
      status: serviceListings.status,
      title: serviceListings.title,
      category: serviceListings.category,
      locationText: serviceListings.locationText,
      tagsJson: serviceListings.tagsJson,
      description: serviceListings.description,
      perWorkRate: serviceListings.perWorkRate,
      currency: serviceListings.currency,
      availability: serviceListings.availability,
      warrantyType: serviceListings.warrantyType,
      experienceText: serviceListings.experienceText,
      thumbnailImageUrl: serviceListings.thumbnailImageUrl,
      publishedAt: serviceListings.publishedAt,
      providerBusinessName: providers.businessName,
      providerPhone: providers.primaryPhone,
      providerCity: providers.city,
    })
    .from(serviceListings)
    .leftJoin(providers, eq(serviceListings.providerId, providers.id))
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy(sql`${serviceListings.publishedAt} DESC NULLS LAST`);

  return {
    data,
    meta: buildPaginationMeta(totalRow.count, page, limit),
  };
}

export async function findPublishedServiceById(id: string) {
  const [row] = await db
    .select({
      id: serviceListings.id,
      providerId: serviceListings.providerId,
      slug: serviceListings.slug,
      status: serviceListings.status,
      title: serviceListings.title,
      category: serviceListings.category,
      locationText: serviceListings.locationText,
      tagsJson: serviceListings.tagsJson,
      description: serviceListings.description,
      perWorkRate: serviceListings.perWorkRate,
      currency: serviceListings.currency,
      availability: serviceListings.availability,
      warrantyType: serviceListings.warrantyType,
      experienceText: serviceListings.experienceText,
      thumbnailImageUrl: serviceListings.thumbnailImageUrl,
      publishedAt: serviceListings.publishedAt,
      providerBusinessName: providers.businessName,
      providerPhone: providers.primaryPhone,
      providerCity: providers.city,
    })
    .from(serviceListings)
    .leftJoin(providers, eq(serviceListings.providerId, providers.id))
    .where(eq(serviceListings.id, id))
    .limit(1);

  if (!row || row.status !== PUBLIC_ENTITY_STATUSES.PUBLISHED) {
    return null;
  }

  return row;
}

//slug function for service
export async function findPublishedServiceBySlug(slug: string) {
  const [row] = await db
    .select({
      id: serviceListings.id,
      providerId: serviceListings.providerId,
      slug: serviceListings.slug,
      status: serviceListings.status,
      title: serviceListings.title,
      category: serviceListings.category,
      locationText: serviceListings.locationText,
      tagsJson: serviceListings.tagsJson,
      description: serviceListings.description,
      perWorkRate: serviceListings.perWorkRate,
      currency: serviceListings.currency,
      availability: serviceListings.availability,
      warrantyType: serviceListings.warrantyType,
      experienceText: serviceListings.experienceText,
      thumbnailImageUrl: serviceListings.thumbnailImageUrl,
      publishedAt: serviceListings.publishedAt,

      providerBusinessName: providers.businessName,
      providerPhone: providers.primaryPhone,
      providerWhatsapp: providers.whatsappNumber,
      providerCity: providers.city,
      providerDistrict: providers.district,
      providerProvince: providers.province,
      providerLogoUrl: providers.logoUrl,
      providerCoverImageUrl: providers.coverImageUrl,
    })
    .from(serviceListings)
    .leftJoin(providers, eq(serviceListings.providerId, providers.id))
    .where(eq(serviceListings.slug, slug))
    .limit(1);

  if (!row || row.status !== PUBLIC_ENTITY_STATUSES.PUBLISHED) {
    return null;
  }

  return row;
}


export async function listPublishedOpportunities(query: PublicListQuery) {
  const { page, limit, offset } = getPagination(query);

  const conditions = [
    eq(opportunityListings.status, PUBLIC_ENTITY_STATUSES.PUBLISHED),
  ];

  if (query.search) {
    conditions.push(
      or(
        ilike(opportunityListings.title, `%${query.search}%`),
        ilike(opportunityListings.category, `%${query.search}%`),
        ilike(opportunityListings.shortSummary, `%${query.search}%`),
        ilike(opportunityListings.fullDescription, `%${query.search}%`),
        ilike(opportunityListings.investmentType, `%${query.search}%`),
        ilike(opportunityListings.expectedRoiText, `%${query.search}%`),
        ilike(providers.businessName, `%${query.search}%`),
        ilike(providers.city, `%${query.search}%`),
      )!
    );
  }

  const categoryCondition = createOpportunityCategoryConditions(query.category);

if (categoryCondition) {
  conditions.push(categoryCondition);
}

  if(query.city){
    conditions.push(
      or(
        ilike(opportunityListings.city, `%${query.city}%`),
        ilike(opportunityListings.district, `%${query.city}%`),
        ilike(opportunityListings.province, `%${query.city}%`),
        ilike(providers.city, `%${query.city}%`)
      )!,
    );
  }

  const whereClause = and(...conditions);

  const [totalRow] = await db
    .select({ count: count() })
    .from(opportunityListings)
    .leftJoin(providers, eq(opportunityListings.providerId, providers.id))
    .where(whereClause);

  const data = await db
    .select({
      id: opportunityListings.id,
      providerId: opportunityListings.providerId,
      slug: opportunityListings.slug,
      status: opportunityListings.status,
      title: opportunityListings.title,
      category: opportunityListings.category,
      shortSummary: opportunityListings.shortSummary,
      fullDescription: opportunityListings.fullDescription,
      province: opportunityListings.province,
      district: opportunityListings.district,
      city: opportunityListings.city,
      postalCode: opportunityListings.postalCode,
      coverImageUrl: opportunityListings.coverImageUrl,
      investmentType: opportunityListings.investmentType,
      expectedRoiText: opportunityListings.expectedRoiText,
      fundingGoal: opportunityListings.fundingGoal,
      minimumInvestment: opportunityListings.minimumInvestment,
      maximumInvestment: opportunityListings.maximumInvestment,
      riskLevel: opportunityListings.riskLevel,
      publishedAt: opportunityListings.publishedAt,
      providerBusinessName: providers.businessName,
      providerPhone: providers.primaryPhone,
      providerCity: providers.city,
    })
    .from(opportunityListings)
    .leftJoin(providers, eq(opportunityListings.providerId, providers.id))
    .where(whereClause)
    .limit(limit)
    .offset(offset)
    .orderBy(sql`${opportunityListings.publishedAt} DESC NULLS LAST`);

  return {
    data,
    meta: buildPaginationMeta(totalRow.count, page, limit),
  };
}


export async function findPublishedOpportunityById(id: string) {
  const [row] = await db
    .select({
      id: opportunityListings.id,
      providerId: opportunityListings.providerId,
      slug: opportunityListings.slug,
      status: opportunityListings.status,
      title: opportunityListings.title,
      category: opportunityListings.category,
      shortSummary: opportunityListings.shortSummary,
      fullDescription: opportunityListings.fullDescription,
      province: opportunityListings.province,
      district: opportunityListings.district,
      city: opportunityListings.city,
      postalCode: opportunityListings.postalCode,
      coverImageUrl: opportunityListings.coverImageUrl,
      investmentType: opportunityListings.investmentType,
      expectedRoiText: opportunityListings.expectedRoiText,
      fundingGoal: opportunityListings.fundingGoal,
      minimumInvestment: opportunityListings.minimumInvestment,
      maximumInvestment: opportunityListings.maximumInvestment,
      riskLevel: opportunityListings.riskLevel,
      publishedAt: opportunityListings.publishedAt,
      providerBusinessName: providers.businessName,
      providerPhone: providers.primaryPhone,
      providerCity: providers.city,
    })
    .from(opportunityListings)
    .leftJoin(providers, eq(opportunityListings.providerId, providers.id))
    .where(eq(opportunityListings.id, id))
    .limit(1);

  if (!row || row.status !== PUBLIC_ENTITY_STATUSES.PUBLISHED) {
    return null;
  }

  return row;
}

//slug function for opportunity
export async function findPublishedOpportunityBySlug(slug: string) {
  const [row] = await db
    .select({
      id: opportunityListings.id,
      providerId: opportunityListings.providerId,
      slug: opportunityListings.slug,
      status: opportunityListings.status,

      title: opportunityListings.title,
      category: opportunityListings.category,
      shortSummary: opportunityListings.shortSummary,
      fullDescription: opportunityListings.fullDescription,

      province: opportunityListings.province,
      district: opportunityListings.district,
      city: opportunityListings.city,
      postalCode: opportunityListings.postalCode,

      projectStartDate: opportunityListings.projectStartDate,
      expectedCompletionDate: opportunityListings.expectedCompletionDate,

      coverImageUrl: opportunityListings.coverImageUrl,

      investmentType: opportunityListings.investmentType,
      expectedRoiText: opportunityListings.expectedRoiText,
      fundingGoal: opportunityListings.fundingGoal,
      fundingGoalCurrency: opportunityListings.fundingGoalCurrency,
      minimumRaiseAmount: opportunityListings.minimumRaiseAmount,
      minimumRaiseCurrency: opportunityListings.minimumRaiseCurrency,
      minimumInvestment: opportunityListings.minimumInvestment,
      minimumInvestmentCurrency: opportunityListings.minimumInvestmentCurrency,
      maximumInvestment: opportunityListings.maximumInvestment,
      maximumInvestmentCurrency: opportunityListings.maximumInvestmentCurrency,
      dealDurationValue: opportunityListings.dealDurationValue,
      dealDurationUnit: opportunityListings.dealDurationUnit,
      fundingDeadline: opportunityListings.fundingDeadline,
      investorBenefitsText: opportunityListings.investorBenefitsText,

      riskLevel: opportunityListings.riskLevel,
      riskInvestorsMayLoseCapital:
        opportunityListings.riskInvestorsMayLoseCapital,
      riskReturnsNotGuaranteed: opportunityListings.riskReturnsNotGuaranteed,
      riskTimelineMayChange: opportunityListings.riskTimelineMayChange,

      publishedAt: opportunityListings.publishedAt,

      providerBusinessName: providers.businessName,
      providerPhone: providers.primaryPhone,
      providerWhatsapp: providers.whatsappNumber,
      providerCity: providers.city,
      providerDistrict: providers.district,
      providerProvince: providers.province,
      providerLogoUrl: providers.logoUrl,
      providerCoverImageUrl: providers.coverImageUrl,
    })
    .from(opportunityListings)
    .leftJoin(providers, eq(opportunityListings.providerId, providers.id))
    .where(eq(opportunityListings.slug, slug))
    .limit(1);

  if (!row || row.status !== PUBLIC_ENTITY_STATUSES.PUBLISHED) {
    return null;
  }

  return row;
}