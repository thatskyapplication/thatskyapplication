import process from "node:process";
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
