import process from "node:process";
import knex from "knex";
import { production } from "./Utility/Constants.js";

export enum Table {
	Bonks = "bonks",
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Fights = "fights",
	Hearts = "hearts",
	Hugs = "hugs",
	Notifications = "notifications",
	Profiles = "profiles",
}

const { DATABASE_URL, DEVELOPMENT_DATABASE_URL } = process.env;
const databaseURL = production ? DATABASE_URL : DEVELOPMENT_DATABASE_URL;
if (!databaseURL) throw new Error("Database URL missing.");

// https://github.com/knex/knex/issues/5358
export default knex.default({
	client: "pg",
	connection: databaseURL,
	pool: { min: 0 },
});
