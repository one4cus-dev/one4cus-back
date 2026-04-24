// src\common\constants\provider-types.ts
export const PROVIDER_TYPES = {
  SERVICE_PROVIDER: "service_provider",
  OPPORTUNITY_PROVIDER: "opportunity_provider",
  BOTH: "both",
} as const;

export type ProviderTypeValue =
  (typeof PROVIDER_TYPES)[keyof typeof PROVIDER_TYPES];

export const PROVIDER_TYPE_VALUES = Object.values(PROVIDER_TYPES);