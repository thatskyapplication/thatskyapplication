import knex from "knex";
import { DATABASE_URL } from "./config.server";

if (!DATABASE_URL) {
	throw new Error("Database URL missing.");
}

export default knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
