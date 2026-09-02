import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "@thatskyapplication/utility";
import { DATABASE_URL } from "./config.js";
import pino from "./pino.js";

const POOL_SIZE = 20 as const;

const pool = new Pool({
	connectionString: DATABASE_URL,
	max: POOL_SIZE,
	connectionTimeoutMillis: 5000,
	idle_in_transaction_session_timeout: 30000,
});

pool.on("error", (error) => pino.error(error, "Database pool error."));

export default new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });
