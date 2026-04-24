// src\modules\services\services.service.ts
import slugify from "slugify";
import { AppError } from "../../common/errors/app-error.js";
import { PUBLIC_ENTITY_STATUSES } from "../../common/constants/index.js";
import type { CreateServiceBody } from "./services.schema.js";
import * as servicesRepository from "./services.repository.js";

function generateSlug(title: string) {
  return slugify(title, { lower: true, strict: true });
}

export async function createService(input: CreateServiceBody) {
  const provider = await servicesRepository.findProviderById(input.providerId);

  if (!provider) {
    throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND");
  }

  const slug = generateSlug(`${provider.businessName}-${input.title}`);

  return await servicesRepository.createServiceListing({
    providerId: input.providerId,
    slug,
    status: PUBLIC_ENTITY_STATUSES.DRAFT,

    title: input.title,
    category: input.category,
    locationText: input.locationText,
    tagsJson: input.tags ?? [],

    description: input.description,

    perWorkRate: input.perWorkRate?.toString(),
    currency: input.currency,

    availability: input.availability,
    warrantyType: input.warrantyType,
    experienceText: input.experienceText,

    thumbnailImageUrl: input.thumbnailImageUrl,
  });
}

export async function getServiceById(id: string) {
  const service = await servicesRepository.findServiceById(id);

  if (!service) {
    throw new AppError("Service listing not found", 404, "SERVICE_NOT_FOUND");
  }

  return service;
}

export async function listServices() {
  return await servicesRepository.listServices();
}