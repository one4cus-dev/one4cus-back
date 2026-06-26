// src\common\utils\normalize-category.ts

export type ServiceCategory =
  | "Plumbing"
  | "Electrical"
  | "Cleaning"
  | "Landscaping"
  | "IT Support"
  | "Carpentry"
  | "Caregiver"
  | "Consulting"
  | "Architectural Design"
  | "Other";

export type DealCategory =
  | "Investment"
  | "Real Estate"
  | "Natural Resources"
  | "Startups / Tech"
  | "Agriculture / Export"
  | "Renewable Energy"
  | "Tourism / Hospitality";

export function normalizeServiceCategory(input: unknown): ServiceCategory {
  const value = String(input ?? "").toLowerCase().trim();

  if (!value) return "Other";

  if (
    value.includes("plumb") ||
    value.includes("leak") ||
    value.includes("pipe") ||
    value.includes("bathroom renovation") ||
    value.includes("septic") ||
    value.includes("tank cleaning") ||
    value.includes("water line")
  ) {
    return "Plumbing";
  }

  if (
    value.includes("electric") ||
    value.includes("wiring") ||
    value.includes("power") ||
    value.includes("light") ||
    value.includes("circuit") ||
    value.includes("electrician")
  ) {
    return "Electrical";
  }

  if (
    value.includes("clean") ||
    value.includes("maid") ||
    value.includes("housekeeping") ||
    value.includes("janitor")
  ) {
    return "Cleaning";
  }

  if (
    value.includes("garden") ||
    value.includes("landscap") ||
    value.includes("lawn") ||
    value.includes("grass") ||
    value.includes("outdoor maintenance")
  ) {
    return "Landscaping";
  }

  if (
    value.includes("it") ||
    value.includes("computer") ||
    value.includes("software") ||
    value.includes("network") ||
    value.includes("cctv") ||
    value.includes("tech") ||
    value.includes("printer") ||
    value.includes("laptop")
  ) {
    return "IT Support";
  }

  if (
    value.includes("carpentry") ||
    value.includes("carpenter") ||
    value.includes("wood") ||
    value.includes("furniture")
  ) {
    return "Carpentry";
  }

  if (
    value.includes("care") ||
    value.includes("elder") ||
    value.includes("nursing") ||
    value.includes("dementia") ||
    value.includes("home care") ||
    value.includes("caregiver") ||
    value.includes("patient")
  ) {
    return "Caregiver";
  }

  if (
    value.includes("consult") ||
    value.includes("advisor") ||
    value.includes("advisory") ||
    value.includes("business advice")
  ) {
    return "Consulting";
  }

  if (
    value.includes("architect") ||
    value.includes("architecture") ||
    value.includes("house plan") ||
    value.includes("building design") ||
    value.includes("draftsman") ||
    value.includes("architectural")
  ) {
    return "Architectural Design";
  }

  return "Other";
}

export function normalizeDealCategory(input: unknown): DealCategory {
  const value = String(input ?? "").toLowerCase().trim();

  if (!value) return "Investment";

  if (
    value.includes("real estate") ||
    value.includes("land") ||
    value.includes("property") ||
    value.includes("apartment") ||
    value.includes("house") ||
    value.includes("villa") ||
    value.includes("building") ||
    value.includes("rent") ||
    value.includes("lease")
  ) {
    return "Real Estate";
  }

  if (
    value.includes("natural") ||
    value.includes("resource") ||
    value.includes("mining") ||
    value.includes("gem") ||
    value.includes("mineral") ||
    value.includes("timber") ||
    value.includes("water resource")
  ) {
    return "Natural Resources";
  }

  if (
    value.includes("startup") ||
    value.includes("tech") ||
    value.includes("software") ||
    value.includes("saas") ||
    value.includes("app") ||
    value.includes("platform") ||
    value.includes("ai") ||
    value.includes("ecommerce")
  ) {
    return "Startups / Tech";
  }

  if (
    value.includes("agriculture") ||
    value.includes("farm") ||
    value.includes("export") ||
    value.includes("tea") ||
    value.includes("coconut") ||
    value.includes("spice") ||
    value.includes("fruit") ||
    value.includes("vegetable") ||
    value.includes("crop")
  ) {
    return "Agriculture / Export";
  }

  if (
    value.includes("renewable") ||
    value.includes("solar") ||
    value.includes("wind") ||
    value.includes("hydro") ||
    value.includes("energy") ||
    value.includes("battery") ||
    value.includes("green power")
  ) {
    return "Renewable Energy";
  }

  if (
    value.includes("tourism") ||
    value.includes("hotel") ||
    value.includes("villa") ||
    value.includes("resort") ||
    value.includes("travel") ||
    value.includes("hospitality") ||
    value.includes("restaurant") ||
    value.includes("guest house")
  ) {
    return "Tourism / Hospitality";
  }

  if (
    value.includes("investment") ||
    value.includes("invest") ||
    value.includes("funding") ||
    value.includes("roi") ||
    value.includes("return") ||
    value.includes("equity") ||
    value.includes("profit share")
  ) {
    return "Investment";
  }

  return "Investment";
}