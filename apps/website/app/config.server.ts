import process from "node:process";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

if (
	!(
		process.env.SESSION_SECRET &&
		process.env.DATABASE_URL &&
		process.env.DISCORD_TOKEN &&
		process.env.APPLICATION_ID &&
		process.env.DISCORD_CLIENT_SECRET &&
		process.env.SUPPORT_SERVER_GUILD_ID &&
		process.env.TRANSLATOR_ROLE_ID &&
		process.env.CROWDIN_CLIENT_ID &&
		process.env.CROWDIN_CLIENT_SECRET &&
		process.env.REDIRECT_URI_LOGIN &&
		process.env.REDIRECT_URI_DISCORD_CROWDIN
	) ||
	(PRODUCTION && !process.env.SENTRY_DATA_SOURCE_NAME)
) {
	throw new Error("Missing required environment variables.");
}

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
export const SUPPORT_SERVER_GUILD_ID = process.env.SUPPORT_SERVER_GUILD_ID;
export const TRANSLATOR_ROLE_ID = process.env.TRANSLATOR_ROLE_ID;
export const CROWDIN_CLIENT_ID = process.env.CROWDIN_CLIENT_ID;
export const CROWDIN_CLIENT_SECRET = process.env.CROWDIN_CLIENT_SECRET;
export const REDIRECT_URI_LOGIN = process.env.REDIRECT_URI_LOGIN;
export const REDIRECT_URI_DISCORD_CROWDIN = process.env.REDIRECT_URI_DISCORD_CROWDIN;
export const SENTRY_DATA_SOURCE_NAME = process.env.SENTRY_DATA_SOURCE_NAME;
