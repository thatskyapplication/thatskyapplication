import type { DB } from "@thatskyapplication/utility";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DATABASE_URL } from "./config.server";

export default new Kysely<DB>({
	dialect: new PostgresDialect({ pool: new Pool({ connectionString: DATABASE_URL }) }),
});
