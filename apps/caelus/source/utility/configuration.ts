import process from "node:process";
import { ComponentType, MessageFlags } from "@discordjs/core";
import { CDN_URL as CDN_URL_PRODUCTION, WEBSITE_URL } from "@thatskyapplication/utility";
import { z } from "zod/v4";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

const envSchema = z.object({
	DISCORD_TOKEN: z.string().min(1),
	THAT_WINGLESS_COMMUNITY_INVITE_URL: z.url(),
	MAXIMUM_CONCURRENCY_LIMIT: z.coerce.number().int().min(1),
	APPLICATION_ID: z.string().min(1),
	SUPPORT_SERVER_GUILD_ID: z.string().min(1),
	ANNOUNCEMENTS_CHANNEL_ID: z.string().min(1),
	FEEDBACK_CHANNEL_ID: z.string().min(1),
	SKY_PROFILE_REPORTS_CHANNEL_ID: z.string().min(1),
	SHOP_SUGGESTIONS_CHANNEL_ID: z.string().min(1),
	DAILY_GUIDES_LOG_CHANNEL_ID: z.string().min(1),
	IDEA_TAG_ID: z.string().min(1),
	ISSUE_TAG_ID: z.string().min(1),
	DEVELOPER_ROLE_ID: z.string().min(1),
	SUPPORTER_ROLE_ID: z.string().min(1),
	TRANSLATOR_ROLE_ID: z.string().min(1),
	GIVEAWAY_ACCOUNT_CREATION_TIMESTAMP_LIMIT: z.coerce.number().int().min(0),
	DATABASE_URL: z.url(),
	OPENAI_API_KEY: z.string().min(1),
	OPENAI_BASE_URL: z.url(),
	AI_GATEWAY_TOKEN: z.string().min(1),
	S3_ACCESS_KEY_ID: z.string().min(1),
	S3_ACCOUNT_ID: z.string().min(1),
	S3_SECRET_ACCESS_KEY: z.string().min(1),
	// Production-only.
	BETTER_STACK_TOKEN: z.string().min(1).optional(),
	FLIGHT_CHECK: z.string().min(1).optional(),
});

const productionEnvSchema = envSchema.extend({
	BETTER_STACK_TOKEN: z.string().min(1),
	FLIGHT_CHECK: z.string().min(1),
});

export const {
	DISCORD_TOKEN,
	THAT_WINGLESS_COMMUNITY_INVITE_URL,
	MAXIMUM_CONCURRENCY_LIMIT,
	APPLICATION_ID,
	SUPPORT_SERVER_GUILD_ID,
	ANNOUNCEMENTS_CHANNEL_ID,
	FEEDBACK_CHANNEL_ID,
	SKY_PROFILE_REPORTS_CHANNEL_ID,
	SHOP_SUGGESTIONS_CHANNEL_ID,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	IDEA_TAG_ID,
	ISSUE_TAG_ID,
	DEVELOPER_ROLE_ID,
	SUPPORTER_ROLE_ID,
	TRANSLATOR_ROLE_ID,
	GIVEAWAY_ACCOUNT_CREATION_TIMESTAMP_LIMIT,
	DATABASE_URL,
	OPENAI_API_KEY,
	OPENAI_BASE_URL,
	AI_GATEWAY_TOKEN,
	S3_ACCESS_KEY_ID,
	S3_ACCOUNT_ID,
	S3_SECRET_ACCESS_KEY,
	BETTER_STACK_TOKEN,
	FLIGHT_CHECK,
} = (PRODUCTION ? productionEnvSchema : envSchema).parse(process.env);

// Content delivery network buckets.
const CDN_BUCKET_DEVELOPMENT = "thatskyapplication-dev" as const;
const CDN_BUCKET_PRODUCTION = "thatskyapplication" as const;
export const CDN_BUCKET = PRODUCTION ? CDN_BUCKET_PRODUCTION : CDN_BUCKET_DEVELOPMENT;

// Content delivery network links.
const CDN_URL_DEVELOPMENT = "https://cdn-development.thatskyapplication.com" as const;
export const CDN_URL = PRODUCTION ? CDN_URL_PRODUCTION : CDN_URL_DEVELOPMENT;

// Application invite URL.
export const APPLICATION_INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${APPLICATION_ID}`;

// SKU ids.
const SERVER_UPGRADE_SKU_ID_DEVELOPMENT = "1270975828481806428" as const;
const SERVER_UPGRADE_SKU_ID_PRODUCTION = "1270871254316089515" as const;

export const SERVER_UPGRADE_SKU_ID = PRODUCTION
	? SERVER_UPGRADE_SKU_ID_PRODUCTION
	: SERVER_UPGRADE_SKU_ID_DEVELOPMENT;

// Support server invite URL.
export const SUPPORT_SERVER_INVITE_URL = String(new URL("support", WEBSITE_URL));

// Not in cached guild response.
export const NOT_IN_CACHED_GUILD_RESPONSE = {
	content: `This command requires me to be present in the server. [Invite me](${APPLICATION_INVITE_URL}) with the bot scope and try again!\nIf you need help, join the [support server](${SUPPORT_SERVER_INVITE_URL})!`,
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
} as const;

// Error response.
export const ERROR_RESPONSE = {
	content: `Oh no, that wasn't supposed to happen!\n\nFeel free to join our [support server](${SUPPORT_SERVER_INVITE_URL}) and report this issue! 🩵`,
	components: [],
	embeds: [],
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
};

// Error response for components v2.
export const ERROR_RESPONSE_COMPONENTS_V2 = {
	components: [
		{
			type: ComponentType.TextDisplay as const,
			content: `Oh no, that wasn't supposed to happen!\n\nFeel free to join our [support server](${SUPPORT_SERVER_INVITE_URL}) and report this issue! 🩵`,
		},
	],
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
};
