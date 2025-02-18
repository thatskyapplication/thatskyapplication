if (
	!(
		process.env.SESSION_SECRET &&
		process.env.DISCORD_TOKEN &&
		process.env.DEVELOPMENT_DISCORD_TOKEN &&
		process.env.DEVELOPER_GUILD_ID &&
		process.env.DEVELOPMENT_GUILD_ID &&
		process.env.APPLICATION_ID &&
		process.env.DEVELOPMENT_APPLICATION_ID &&
		process.env.ROLE_ID &&
		process.env.DEVELOPMENT_MANAGE_ROLES_ID &&
		process.env.DEVELOPMENT_ADMINISTRATOR_ID &&
		process.env.REDIRECT_URI_SECRET_AREA &&
		process.env.CLIENT_SECRET &&
		process.env.DEVELOPMENT_CLIENT_SECRET &&
		process.env.DATABASE_URL
	)
) {
	throw new Error("Missing required environment variables.");
}

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const DEVELOPMENT_DISCORD_TOKEN = process.env.DEVELOPMENT_DISCORD_TOKEN;
export const DEVELOPER_GUILD_ID = process.env.DEVELOPER_GUILD_ID;
export const DEVELOPMENT_GUILD_ID = process.env.DEVELOPMENT_GUILD_ID;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DEVELOPMENT_APPLICATION_ID = process.env.DEVELOPMENT_APPLICATION_ID;
export const ROLE_ID = process.env.ROLE_ID;
export const DEVELOPMENT_MANAGE_ROLES_ID = process.env.DEVELOPMENT_MANAGE_ROLES_ID;
export const DEVELOPMENT_ADMINISTRATOR_ID = process.env.DEVELOPMENT_ADMINISTRATOR_ID;
export const REDIRECT_URI_SECRET_AREA = process.env.REDIRECT_URI_SECRET_AREA;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const DEVELOPMENT_CLIENT_SECRET = process.env.DEVELOPMENT_CLIENT_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;
