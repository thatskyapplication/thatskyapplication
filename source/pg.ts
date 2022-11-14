import process from "node:process";
import knex from "knex";

export enum Table {
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Notifications = "notifications",
	Profiles = "profiles",
}

export default knex({
	client: "pg",
	connection: process.env.DATABASE_URL,
});
