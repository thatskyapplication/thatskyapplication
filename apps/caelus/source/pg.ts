import knex from "knex";
import { DATABASE_URL } from "./utility/constants.js";

export enum Table {
	AI = "ai",
	Configuration = "configuration",
	ContentCreators = "content_creators",
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Guess = "guess",
	Hearts = "hearts",
	Notifications = "notifications",
	Profiles = "profiles",
	SkyProfileLikes = "sky_profile_likes",
	TravellingSpirits = "travelling_spirits",
	Catalogue = "catalogue",
}

export default knex({
	client: "pg",
	connection: DATABASE_URL,
	pool: { min: 0 },
});
