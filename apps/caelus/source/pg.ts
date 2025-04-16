import knex from "knex";
import { DATABASE_URL } from "./utility/constants.js";

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

export default knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
