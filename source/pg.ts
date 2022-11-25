import process from "node:process";
import knex from "knex";

export enum Table {
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Notifications = "notifications",
	Profiles = "profiles",
}

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) throw new Error("Databse URL missing.");

export default knex({
	client: "pg",
	connection: DATABASE_URL,
});
