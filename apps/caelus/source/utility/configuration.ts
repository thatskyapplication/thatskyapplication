import process from "node:process";
import { CDN_URL as CDN_URL_PRODUCTION } from "@thatskyapplication/utility";
import { z } from "zod/v4";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

const envSchema = z.object({
	DISCORD_TOKEN: z.string().min(1),
	MAXIMUM_CONCURRENCY_LIMIT: z.coerce.number().int().min(1),
	APPLICATION_ID: z.string().min(1),
	SUPPORT_SERVER_GUILD_ID: z.string().min(1),
	SUPPORT_SERVER_INVITE_URL: z.url().min(1),
	ANNOUNCEMENTS_CHANNEL_ID: z.string().min(1),
	FEEDBACK_CHANNEL_ID: z.string().min(1),
	SKY_PROFILE_REPORTS_CHANNEL_ID: z.string().min(1),
	SHOP_SUGGESTIONS_CHANNEL_ID: z.string().min(1),
	DAILY_GUIDES_LOG_CHANNEL_ID: z.string().min(1),
	IDEA_TAG_ID: z.string().min(1),
	ISSUE_TAG_ID: z.string().min(1),
	DEVELOPER_ROLE_ID: z.string().min(1),
	SUPPORTER_ROLE_ID: z.string().min(1),
	ARTIST_ROLE_ID: z.string().min(1),
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
	SENTRY_DATA_SOURCE_NAME: z.url().optional(),
});

const productionEnvSchema = envSchema.extend({
	SENTRY_DATA_SOURCE_NAME: z.url(),
});

export const {
	DISCORD_TOKEN,
	MAXIMUM_CONCURRENCY_LIMIT,
	APPLICATION_ID,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
	ANNOUNCEMENTS_CHANNEL_ID,
	FEEDBACK_CHANNEL_ID,
	SKY_PROFILE_REPORTS_CHANNEL_ID,
	SHOP_SUGGESTIONS_CHANNEL_ID,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	IDEA_TAG_ID,
	ISSUE_TAG_ID,
	DEVELOPER_ROLE_ID,
	SUPPORTER_ROLE_ID,
	ARTIST_ROLE_ID,
	TRANSLATOR_ROLE_ID,
	GIVEAWAY_ACCOUNT_CREATION_TIMESTAMP_LIMIT,
	DATABASE_URL,
	OPENAI_API_KEY,
	OPENAI_BASE_URL,
	AI_GATEWAY_TOKEN,
	S3_ACCESS_KEY_ID,
	S3_ACCOUNT_ID,
	S3_SECRET_ACCESS_KEY,
	SENTRY_DATA_SOURCE_NAME,
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
