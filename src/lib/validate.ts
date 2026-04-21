// src\lib\validate.ts
import { ZodSchema } from "zod";
import { ValidationError } from "../common/errors/validation-error.js";

export function validateData<T>(schema: ZodSchema<T>, data: unknown): T {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new ValidationError("Validation failed", parsed.error.flatten());
  }

  return parsed.data;
}