// src\config\app-config.ts
import { env } from "./env.js";

export const appConfig = {
  appName: env.APP_NAME,
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  host: env.HOST,
  apiBaseUrl: env.API_BASE_URL,

  database: {
    url: env.DATABASE_URL ?? ""
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
  }
};