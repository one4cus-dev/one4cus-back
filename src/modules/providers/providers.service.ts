// src\modules\providers\providers.service.ts
import slugify from "slugify"; //for generating URL-friendly slugs from business name
import { AppError } from "../../common/errors/app-error.js";
import {
  PUBLIC_ENTITY_STATUSES,
  CLAIM_STATUSES,
} from "../../common/constants/index.js";
import type { CreateProviderBody } from "./providers.schema.js";
import * as providersRepository from "./providers.repository.js";

function generateSlug(name: string) {
  return slugify(name, { lower: true, strict: true });
}

export async function createProvider(input: CreateProviderBody) {
  const slug = generateSlug(input.businessName);

  const provider = await providersRepository.createProvider({
    ownerUserId: input.ownerUserId,

    slug,
    providerType: input.providerType,

    status: PUBLIC_ENTITY_STATUSES.DRAFT,
    claimStatus: CLAIM_STATUSES.UNCLAIMED,

    businessName: input.businessName,
    displayName: input.displayName,

    description: input.description,
    shortDescription: input.shortDescription,

    primaryPhone: input.primaryPhone,
    whatsappNumber: input.whatsappNumber,
    email: input.email,

    websiteUrl: input.websiteUrl,

    city: input.city,
    district: input.district,
    province: input.province,
  });

  return provider;
}

export async function getProviderById(id: string) {
  const provider = await providersRepository.findProviderById(id);

  if (!provider) {
    throw new AppError("Provider not found", 404, "PROVIDER_NOT_FOUND");
  }

  return provider;
}

export async function listProviders() {
  return await providersRepository.listProviders();
}