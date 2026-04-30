// src\db\types.ts
//this file create for the pass the type of transaction or database connection to the repository functions, so we can use the same functions for both transaction and database connection without changing the code.

import type { NodePgDatabase, NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type * as schema from "./schema/index.js";

export type DbOrTx =
  | NodePgDatabase<typeof schema>
  | PgTransaction<NodePgQueryResultHKT, typeof schema, any>;