// src\modules\drafts\drafts-sheet.mapper.ts
//mapper file for updated columns data
import {
  normalizeDealCategory,
  normalizeServiceCategory,
} from "../../common/utils/normalize-category.js";

function asString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;

  const stringValue = String(value).trim();

  return stringValue ? stringValue : undefined;
}

function asNullableString(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;

  const stringValue = String(value).trim();

  return stringValue ? stringValue : null;
}

function asNumberString(value: unknown): string | undefined {
  if (value === null || value === undefined || value === "") return undefined;

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) return undefined;

  return numberValue.toString();
}

function asInteger(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;

  const numberValue = Number(value);

  if (!Number.isInteger(numberValue)) return undefined;

  return numberValue;
}

function asBoolean(value: unknown): boolean | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  if (typeof value === "boolean") return value;

  const normalized = String(value).toLowerCase().trim();

  if (["true", "yes", "1"].includes(normalized)) return true;
  if (["false", "no", "0"].includes(normalized)) return false;

  return undefined;
}

function parseTags(value: unknown): string[] | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  const raw = String(value).trim();

  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed.map(String).map((item) => item.trim()).filter(Boolean);
    }
  } catch {
    // fallback to comma-separated values
  }

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function mapProviderSheetData(data: Record<string, unknown>) {
  return {
    businessName: asString(data.business_name),
    displayName: asNullableString(data.display_name),
    providerType: asString(data.provider_type),

    description: asNullableString(data.description),
    shortDescription: asNullableString(data.short_description),

    primaryPhone: asNullableString(data.primary_phone),
    whatsappNumber: asNullableString(data.whatsapp_number),
    email: asNullableString(data.email),
    websiteUrl: asNullableString(data.website_url),

    facebookUrl: asNullableString(data.facebook_url),
    instagramUrl: asNullableString(data.instagram_url),
    tiktokUrl: asNullableString(data.tiktok_url),
    linkedinUrl: asNullableString(data.linkedin_url),

    addressLine1: asNullableString(data.address_line_1),
    addressLine2: asNullableString(data.address_line_2),
    city: asNullableString(data.city),
    district: asNullableString(data.district),
    province: asNullableString(data.province),
    postalCode: asNullableString(data.postal_code),
    country: asString(data.country) ?? "Sri Lanka",

    logoUrl: asNullableString(data.logo_url),
    coverImageUrl: asNullableString(data.cover_image_url),
  };
}

export function mapServiceSheetData(data: Record<string, unknown>) {
  const category = asString(data.category);

  return {
    title: asString(data.title),
    category: category ? normalizeServiceCategory(category) : undefined,
    locationText: asNullableString(data.location_text),
    tagsJson: parseTags(data.tags),
    description: asNullableString(data.description),

    perWorkRate: asNumberString(data.per_work_rate),
    currency: asString(data.currency) ?? "LKR",

    availability: asNullableString(data.availability),
    warrantyType: asNullableString(data.warranty_type),
    experienceText: asNullableString(data.experience_text),
    thumbnailImageUrl: asNullableString(data.thumbnail_image_url),
  };
}

export function mapOpportunitySheetData(data: Record<string, unknown>) {
  const category = asString(data.category);

  return {
    title: asString(data.title),
    category: category ? normalizeDealCategory(category) : undefined,

    shortSummary: asNullableString(data.short_summary),
    fullDescription: asNullableString(data.full_description),

    province: asNullableString(data.province),
    district: asNullableString(data.district),
    city: asNullableString(data.city),
    postalCode: asNullableString(data.postal_code),

    coverImageUrl: asNullableString(data.cover_image_url),

    investmentType: asNullableString(data.investment_type),
    expectedRoiText: asNullableString(data.expected_roi_text),

    fundingGoal: asNumberString(data.funding_goal),
    fundingGoalCurrency: asString(data.funding_goal_currency) ?? "LKR",

    minimumRaiseAmount: asNumberString(data.minimum_raise_amount),
    minimumRaiseCurrency: asString(data.minimum_raise_currency) ?? "LKR",

    minimumInvestment: asNumberString(data.minimum_investment),
    minimumInvestmentCurrency: asString(data.minimum_investment_currency) ?? "LKR",

    maximumInvestment: asNumberString(data.maximum_investment),
    maximumInvestmentCurrency: asString(data.maximum_investment_currency) ?? "LKR",

    dealDurationValue: asInteger(data.deal_duration_value),
    dealDurationUnit: asNullableString(data.deal_duration_unit),

    fundingDeadline: asNullableString(data.funding_deadline),
    investorBenefitsText: asNullableString(data.investor_benefits_text),

    riskLevel: asNullableString(data.risk_level),

    riskInvestorsMayLoseCapital: asBoolean(
      data.risk_investors_may_lose_capital
    ),
    riskReturnsNotGuaranteed: asBoolean(data.risk_returns_not_guaranteed),
    riskTimelineMayChange: asBoolean(data.risk_timeline_may_change),

    complianceInfoAccurate: asBoolean(data.compliance_info_accurate),
    compliancePlatformPolicies: asBoolean(data.compliance_platform_policies),
  };
}

export function removeUndefinedValues<T extends Record<string, unknown>>(
  data: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}