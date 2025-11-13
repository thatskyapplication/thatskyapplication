import process from "node:process";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Environment variables.
if (
	!(
		process.env.DATABASE_URL &&
		process.env.REDDIT_APPLICATION_ID &&
		process.env.REDDIT_APPLICATION_SECRET
	) ||
	(PRODUCTION && !(process.env.SENTRY_DATA_SOURCE_NAME && process.env.SENTRY_RELEASE))
) {
	throw new Error("Missing environment variables.");
}

export const DATABASE_URL = process.env.DATABASE_URL;
export const REDDIT_APPLICATION_ID = process.env.REDDIT_APPLICATION_ID;
export const REDDIT_APPLICATION_SECRET = process.env.REDDIT_APPLICATION_SECRET;
export const SENTRY_DATA_SOURCE_NAME = process.env.SENTRY_DATA_SOURCE_NAME;
export const SENTRY_RELEASE = process.env.SENTRY_RELEASE;
