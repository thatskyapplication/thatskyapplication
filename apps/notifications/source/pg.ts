import knex from "knex";
import { DATABASE_URL } from "./utility/configuration.js";

export const pg = knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
