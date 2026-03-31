import process from "node:process";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

if (
	!(
		process.env.SESSION_SECRET &&
		process.env.DATABASE_URL &&
		process.env.INTERNAL_URL_CAELUS &&
		process.env.DISCORD_TOKEN &&
		process.env.APPLICATION_ID &&
		process.env.DISCORD_CLIENT_SECRET &&
		process.env.SUPPORT_SERVER_GUILD_ID &&
		process.env.TRANSLATOR_ROLE_ID &&
		process.env.CROWDIN_CLIENT_ID &&
		process.env.CROWDIN_CLIENT_SECRET &&
		process.env.REDIRECT_URI_LOGIN &&
		process.env.REDIRECT_URI_DISCORD_CROWDIN &&
		process.env.CDN_URL &&
		process.env.S3_ACCESS_KEY_ID &&
		process.env.S3_ACCOUNT_ID &&
		process.env.S3_SECRET_ACCESS_KEY
	) ||
	(PRODUCTION && !process.env.SENTRY_DATA_SOURCE_NAME)
) {
	throw new Error("Missing required environment variables.");
}

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;
export const INTERNAL_URL_CAELUS = process.env.INTERNAL_URL_CAELUS;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
export const SUPPORT_SERVER_GUILD_ID = process.env.SUPPORT_SERVER_GUILD_ID;
export const TRANSLATOR_ROLE_ID = process.env.TRANSLATOR_ROLE_ID;
export const CROWDIN_CLIENT_ID = process.env.CROWDIN_CLIENT_ID;
export const CROWDIN_CLIENT_SECRET = process.env.CROWDIN_CLIENT_SECRET;
export const REDIRECT_URI_LOGIN = process.env.REDIRECT_URI_LOGIN;
export const REDIRECT_URI_DISCORD_CROWDIN = process.env.REDIRECT_URI_DISCORD_CROWDIN;
export const CDN_URL = process.env.CDN_URL;
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
export const S3_ACCOUNT_ID = process.env.S3_ACCOUNT_ID;
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

// Content delivery network buckets.
const CDN_BUCKET_DEVELOPMENT = "thatskyapplication-dev" as const;
const CDN_BUCKET_PRODUCTION = "thatskyapplication" as const;
export const CDN_BUCKET = PRODUCTION ? CDN_BUCKET_PRODUCTION : CDN_BUCKET_DEVELOPMENT;
