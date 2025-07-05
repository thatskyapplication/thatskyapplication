import knex from "knex";
import { DATABASE_URL } from "./config.server";

export default knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
