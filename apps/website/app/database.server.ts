import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import type { DB } from "@thatskyapplication/utility";
import { DATABASE_URL } from "./config.server";

export default new Kysely<DB>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: DATABASE_URL,
			connectionTimeoutMillis: 5000,
			idle_in_transaction_session_timeout: 30000,
		}),
	}),
});
