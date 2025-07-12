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
	(PRODUCTION && !(process.env.BETTER_STACK_TOKEN && process.env.BETTER_STACK_ENDPOINT_URL))
) {
	throw new Error("Missing environment variables.");
}

export const DATABASE_URL = process.env.DATABASE_URL;
export const BETTER_STACK_TOKEN = process.env.BETTER_STACK_TOKEN;
export const BETTER_STACK_ENDPOINT_URL = process.env.BETTER_STACK_ENDPOINT_URL;
export const REDDIT_APPLICATION_ID = process.env.REDDIT_APPLICATION_ID;
export const REDDIT_APPLICATION_SECRET = process.env.REDDIT_APPLICATION_SECRET;
