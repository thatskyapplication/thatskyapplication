export enum Table {
	BlueskyWebhooks = "bluesky_webhooks",
	Catalogue = "catalogue",
	Checklist = "checklist",
	DailyGuides = "daily_guides",
	DailyGuidesDistribution = "daily_guides_distribution",
	Feedback = "feedback",
	FeedbackUpsell = "feedback_upsell",
	Giveaway = "giveaway",
	GiveawayUpsell = "giveaway_upsell",
	Guess = "guess",
	Hearts = "hearts",
	Messages = "messages",
	Notifications = "notifications",
	Profiles = "profiles",
	RedditWebhooks = "reddit_webhooks",
	SkyProfileLikes = "sky_profile_likes",
	Users = "users",
	Welcome = "welcome",
}

export interface BlueskyWebhooksPacket {
	guild_id: string;
	webhook_id: string;
	webhook_token: string;
	did: string;
}

export interface RedditWebhooksPacket {
	guild_id: string;
	webhook_id: string;
	webhook_token: string;
}
