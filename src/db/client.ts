// src\db\client.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { appConfig } from "../config/app-config.js";
import * as schema from "./schema/index.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: appConfig.database.url
});

export const db = drizzle(pool, { schema });
export { pool };