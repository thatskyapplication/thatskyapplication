import process from "node:process";
import knex from "knex";

export default knex({
	client: "pg",
	connection: process.env.DATABASE_URL,
});
