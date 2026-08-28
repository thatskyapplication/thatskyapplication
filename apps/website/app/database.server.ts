import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "@thatskyapplication/utility";
import { DATABASE_URL } from "./config.server";
import pino from "./pino";

const pool = new Pool({
	connectionString: DATABASE_URL,
	connectionTimeoutMillis: 5000,
	idle_in_transaction_session_timeout: 30000,
});

pool.on("error", (error) => pino.error(error, "Database pool error."));

export default new Kysely<DB>({ dialect: new PostgresDialect({ pool }) });
