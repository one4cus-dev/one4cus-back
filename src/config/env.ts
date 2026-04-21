// src\config\env.ts
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  APP_NAME: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive(),
  HOST: z.string().min(1),
  API_BASE_URL: z.string().url(),

  DATABASE_URL: z.string().optional(),

  JWT_SECRET: z.string().optional(),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  DEBUG: z.coerce.boolean().default(true),
  ENABLE_PAYMENTS: z.coerce.boolean().default(false),
  MAINTENANCE_MODE: z.coerce.boolean().default(false)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;