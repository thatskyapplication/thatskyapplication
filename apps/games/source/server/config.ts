import process from "node:process";

export const PRODUCTION = process.env.NODE_ENV === "production";

if (
	!(
		process.env.SESSION_SECRET &&
		process.env.DATABASE_URL &&
		process.env.APPLICATION_ID &&
		process.env.DISCORD_CLIENT_SECRET &&
		process.env.DISCORD_TOKEN &&
		process.env.REDIRECT_URI_LOGIN &&
		process.env.CDN_URL
	)
) {
	throw new Error("Missing required environment variables.");
}

if (
	process.env.NODE_ENV === "production" &&
	!(process.env.SENTRY_DATA_SOURCE_NAME && process.env.SENTRY_RELEASE)
) {
	throw new Error("Missing required production environment variables.");
}

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const REDIRECT_URI_LOGIN = process.env.REDIRECT_URI_LOGIN;
export const CDN_URL = process.env.CDN_URL;
export const SENTRY_DATA_SOURCE_NAME = process.env.SENTRY_DATA_SOURCE_NAME;
export const SENTRY_RELEASE = process.env.SENTRY_RELEASE;

export function originAllowed(origin: string | undefined, host: string | undefined) {
	if (origin === undefined) {
		return false;
	}

	return (
		origin === `https://${APPLICATION_ID}.discordsays.com` ||
		(host !== undefined && (origin === `https://${host}` || origin === `http://${host}`))
	);
}
