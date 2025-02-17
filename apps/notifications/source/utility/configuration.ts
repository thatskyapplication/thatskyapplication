import process from "node:process";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Environment variables.
if (
	!(process.env.DISCORD_TOKEN && process.env.DATABASE_URL && process.env.WIND_PATHS_URL) ||
	(PRODUCTION && !(process.env.BETTER_STACK_TOKEN && process.env.BETTER_STACK_ENDPOINT_URL))
) {
	throw new Error("Missing environment variables.");
}

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DATABASE_URL = process.env.DATABASE_URL;
export const WIND_PATHS_URL = process.env.WIND_PATHS_URL;
export const BETTER_STACK_TOKEN = process.env.BETTER_STACK_TOKEN;
export const BETTER_STACK_ENDPOINT_URL = process.env.BETTER_STACK_ENDPOINT_URL;
