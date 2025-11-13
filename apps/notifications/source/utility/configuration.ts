import process from "node:process";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Environment variables.
if (
	!(process.env.DISCORD_TOKEN && process.env.DATABASE_URL) ||
	(PRODUCTION && !(process.env.SENTRY_DATA_SOURCE_NAME && process.env.SENTRY_RELEASE))
) {
	throw new Error("Missing environment variables.");
}

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DATABASE_URL = process.env.DATABASE_URL;
export const SENTRY_DATA_SOURCE_NAME = process.env.SENTRY_DATA_SOURCE_NAME;
export const SENTRY_RELEASE = process.env.SENTRY_RELEASE;
