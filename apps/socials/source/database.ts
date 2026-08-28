import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "@thatskyapplication/utility";
import pino from "./pino.js";
import { DATABASE_URL } from "./utility/configuration.js";

const pool = new Pool({ connectionString: DATABASE_URL });
pool.on("error", (error) => pino.error(error, "Database pool error."));

export default new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });
