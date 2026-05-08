// src\modules\public\public.service.ts
import { AppError } from "../../common/errors/app-error.js";
import * as repo from "./public.repository.js";

export type PublicListQuery = {
    search?: string;
    category?: string;
    city?: string;
    type?: string; // provider, service, opportunity
    page: number;
    limit: number;
};

export async function listProviders(query: PublicListQuery) {
  return await repo.listPublishedProviders(query);
}

export async function getProviderById(id: string) {
  const provider = await repo.findPublishedProviderById(id);

  if (!provider) {
    throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND");
  }

  return provider;
}

export async function listServices(query: PublicListQuery) {
  return await repo.listPublishedServices(query);
}

export async function getServiceById(id: string) {
  const service = await repo.findPublishedServiceById(id);

  if (!service) {
    throw new AppError("Service not found", 404, "SERVICE_NOT_FOUND");
  }

  return service;
}

export async function listOpportunities(query: PublicListQuery) {
  return await repo.listPublishedOpportunities(query);
}

export async function getOpportunityById(id: string) {
  const opportunity = await repo.findPublishedOpportunityById(id);

  if (!opportunity) {
    throw new AppError("Opportunity not found", 404, "OPPORTUNITY_NOT_FOUND");
  }

  return opportunity;
}

//slug functions for provider, service, opportunity
export async function getProviderBySlug(slug: string) {
  const provider = await repo.findPublishedProviderBySlug(slug);

  if (!provider) {
    throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND");
  }

  return provider;
}

export async function getServiceBySlug(slug: string) {
  const service = await repo.findPublishedServiceBySlug(slug);

  if (!service) {
    throw new AppError("Service not found", 404, "SERVICE_NOT_FOUND");
  }

  return service;
}

export async function getOpportunityBySlug(slug: string) {
  const opportunity = await repo.findPublishedOpportunityBySlug(slug);

  if (!opportunity) {
    throw new AppError("Opportunity not found", 404, "OPPORTUNITY_NOT_FOUND");
  }

  return opportunity;
}