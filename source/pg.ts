import process from "node:process";
import knex from "knex";
import { PRODUCTION } from "./utility/constants-2.js";

export enum Table {
	AI = "ai",
	Configuration = "configuration",
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Guess = "guess",
	Hearts = "hearts",
	Notifications = "notifications",
	Profiles = "profiles",
	SkyProfileLikes = "sky_profile_likes",
	Catalogue = "catalogue",
}

const { DATABASE_URL, DEVELOPMENT_DATABASE_URL } = process.env;
const databaseURL = PRODUCTION ? DATABASE_URL : DEVELOPMENT_DATABASE_URL;

if (!databaseURL) {
	throw new Error("Database URL missing.");
}

export default knex({
	client: "pg",
	connection: databaseURL,
	pool: { min: 0 },
});
