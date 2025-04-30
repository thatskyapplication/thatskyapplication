if (
	!(
		process.env.SESSION_SECRET &&
		process.env.DISCORD_TOKEN &&
		process.env.APPLICATION_ID &&
		process.env.DATABASE_URL
	)
) {
	throw new Error("Missing required environment variables.");
}

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DATABASE_URL = process.env.DATABASE_URL;
