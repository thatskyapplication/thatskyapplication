import process from "node:process";
import knex from "knex";

export enum Table {
	Bonks = "bonks",
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Fights = "fights",
	Hugs = "hugs",
	Notifications = "notifications",
	Profiles = "profiles",
}

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) throw new Error("Database URL missing.");

// https://github.com/knex/knex/issues/5358
export default knex.default({
	client: "pg",
	connection: DATABASE_URL,
});
