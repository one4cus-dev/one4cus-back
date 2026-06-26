// src\common\utils\db-value.ts
//data assign for the null values
export function emptyToNull(value: unknown): string | null {
  if (value === undefined || value === null) return null;

  const stringValue = String(value).trim();

  return stringValue ? stringValue : null;
}

export function emptyToUndefined(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;

  const stringValue = String(value).trim();

  return stringValue ? stringValue : undefined;
}

export function numberStringOrNull(value: unknown): string | null {
  if (value === undefined || value === null || value === "") return null;

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) return null;

  return numberValue.toString();
}

export function numberStringOrUndefined(value: unknown): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) return undefined;

  return numberValue.toString();
}

export function booleanOrFalse(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return false;

  if (typeof value === "boolean") return value;

  const normalized = String(value).toLowerCase().trim();

  if (["true", "yes", "1"].includes(normalized)) return true;

  return false;
}