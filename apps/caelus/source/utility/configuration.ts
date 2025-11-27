import process from "node:process";
import { CDN_URL as CDN_URL_PRODUCTION } from "@thatskyapplication/utility";
import { z } from "zod/v4";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

const messageLogChannelIdsSchema = z
	.string()
	.min(2)
	.transform((arg, ctx) => {
		try {
			return JSON.parse(arg);
		} catch {
			ctx.addIssue({ code: "custom", message: "Invalid JSON format.", input: arg });
			return z.NEVER;
		}
	})
	.pipe(z.array(z.string()).readonly());

const envSchema = z.object({
	DISCORD_TOKEN: z.string().min(1),
	MAXIMUM_CONCURRENCY_LIMIT: z.coerce.number().int().min(1),
	APPLICATION_ID: z.string().min(1),
	SUPPORTER_SKU_ID: z.string().min(1),
	SUPPORT_SERVER_GUILD_ID: z.string().min(1),
	SUPPORT_SERVER_INVITE_URL: z.url().min(1),
	SKY_PROFILE_REPORTS_CHANNEL_ID: z.string().min(1),
	SHOP_SUGGESTIONS_CHANNEL_ID: z.string().min(1),
	DAILY_GUIDES_LOG_CHANNEL_ID: z.string().min(1),
	MEMBER_LOG_CHANNEL_ID: z.string().min(1),
	MESSAGE_LOG_CHANNEL_ID: z.string().min(1),
	MESSAGE_LOG_EXPLICIT_ALLOWED_CHANNEL_IDS: messageLogChannelIdsSchema,
	MESSAGE_LOG_EXPLICIT_DISALLOWED_CHANNEL_IDS: messageLogChannelIdsSchema,
	DEVELOPER_ROLE_ID: z.string().min(1),
	SUPPORTER_ROLE_ID: z.string().min(1),
	ARTIST_ROLE_ID: z.string().min(1),
	TRANSLATOR_ROLE_ID: z.string().min(1),
	DATABASE_URL: z.url(),
	S3_ACCESS_KEY_ID: z.string().min(1),
	S3_ACCOUNT_ID: z.string().min(1),
	S3_SECRET_ACCESS_KEY: z.string().min(1),
	// Production-only.
	SENTRY_DATA_SOURCE_NAME: z.url().optional(),
	SENTRY_RELEASE: z.string().min(1).optional(),
});

const productionEnvSchema = envSchema.extend({
	SENTRY_DATA_SOURCE_NAME: z.url(),
	SENTRY_RELEASE: z.string().min(1),
});

export const {
	DISCORD_TOKEN,
	MAXIMUM_CONCURRENCY_LIMIT,
	APPLICATION_ID,
	SUPPORTER_SKU_ID,
	SUPPORT_SERVER_GUILD_ID,
	SUPPORT_SERVER_INVITE_URL,
	SKY_PROFILE_REPORTS_CHANNEL_ID,
	SHOP_SUGGESTIONS_CHANNEL_ID,
	DAILY_GUIDES_LOG_CHANNEL_ID,
	MEMBER_LOG_CHANNEL_ID,
	MESSAGE_LOG_CHANNEL_ID,
	MESSAGE_LOG_EXPLICIT_ALLOWED_CHANNEL_IDS,
	MESSAGE_LOG_EXPLICIT_DISALLOWED_CHANNEL_IDS,
	DEVELOPER_ROLE_ID,
	SUPPORTER_ROLE_ID,
	ARTIST_ROLE_ID,
	TRANSLATOR_ROLE_ID,
	DATABASE_URL,
	S3_ACCESS_KEY_ID,
	S3_ACCOUNT_ID,
	S3_SECRET_ACCESS_KEY,
	SENTRY_DATA_SOURCE_NAME,
	SENTRY_RELEASE,
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
