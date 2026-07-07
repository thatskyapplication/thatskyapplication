import type { DB } from "@thatskyapplication/utility";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DATABASE_URL } from "./utility/configuration.js";

export default new Kysely<DB>({
	dialect: new PostgresDialect({ pool: new Pool({ connectionString: DATABASE_URL }) }),
});
