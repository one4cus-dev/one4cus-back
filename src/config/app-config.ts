// src\config\app-config.ts
import { env } from "./env.js";

const fallbackApiBaseUrl =
  env.NODE_ENV === "production"
    ? undefined
    : `http://${env.HOST === "0.0.0.0" ? "localhost" : env.HOST}:${env.PORT}/api`;

export const appConfig = {
  appName: env.APP_NAME,
  nodeEnv: env.NODE_ENV,
  isProduction: env.NODE_ENV === "production",
  isDevelopment: env.NODE_ENV === "development",

  port: env.PORT,
  host: env.HOST,

  apiBaseUrl: env.API_BASE_URL ?? fallbackApiBaseUrl,

  database: {
    url: env.DATABASE_URL
  },

  auth: {
    jwtSecret: env.JWT_SECRET ?? "",
    supabaseUrl: env.SUPABASE_URL ?? "",
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  },

  featureFlags: {
    debug: env.DEBUG,
    enablePayments: env.ENABLE_PAYMENTS,
    maintenanceMode: env.MAINTENANCE_MODE
  },

  integrations: {
    
    n8nInternalApiKey: env.N8N_INTERNAL_API_KEY,
    frontendRevalidationUrl: env.FRONTEND_REVALIDATION_URL,
    frontendRevalidationSecret: env.FRONTEND_REVALIDATION_SECRET,
  },
};