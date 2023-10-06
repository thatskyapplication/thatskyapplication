import process from "node:process";
import knex from "knex";
import { PRODUCTION } from "./Utility/Constants.js";

export enum Table {
	Bonks = "bonks",
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Fights = "fights",
	Hearts = "hearts",
	Hugs = "hugs",
	Notifications = "notifications",
	Profiles = "profiles",
	SpiritTracker = "spirit_tracker",
}

const { DATABASE_URL, DEVELOPMENT_DATABASE_URL } = process.env;
const databaseURL = PRODUCTION ? DATABASE_URL : DEVELOPMENT_DATABASE_URL;
if (!databaseURL) throw new Error("Database URL missing.");

export default knex({
	client: "pg",
	connection: databaseURL,
	pool: { min: 0 },
});
