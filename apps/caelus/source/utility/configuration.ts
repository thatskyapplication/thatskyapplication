import process from "node:process";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Environment variables.
if (
	!(
		process.env.DISCORD_TOKEN &&
		process.env.SKY_PROFILE_REPORTS_CHANNEL_ID &&
		process.env.SHOP_SUGGESTIONS_CHANNEL_ID &&
		process.env.DATABASE_URL &&
		process.env.OPENAI_API_KEY &&
		process.env.OPENAI_BASE_URL &&
		process.env.AI_GATEWAY_TOKEN &&
		process.env.S3_ACCESS_KEY_ID &&
		process.env.S3_ACCOUNT_ID &&
		process.env.S3_SECRET_ACCESS_KEY
	) ||
	(PRODUCTION && !(process.env.BETTER_STACK_TOKEN && process.env.FLIGHT_CHECK))
) {
	throw new Error("Missing environment variables.");
}

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const SKY_PROFILE_REPORTS_CHANNEL_ID = process.env.SKY_PROFILE_REPORTS_CHANNEL_ID;
export const SHOP_SUGGESTIONS_CHANNEL_ID = process.env.SHOP_SUGGESTIONS_CHANNEL_ID;
export const DATABASE_URL = process.env.DATABASE_URL;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
export const AI_GATEWAY_TOKEN = process.env.AI_GATEWAY_TOKEN;
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
export const S3_ACCOUNT_ID = process.env.S3_ACCOUNT_ID;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
export const BETTER_STACK_TOKEN = process.env.BETTER_STACK_TOKEN;
export const FLIGHT_CHECK = process.env.FLIGHT_CHECK;
