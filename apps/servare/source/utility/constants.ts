import process from "node:process";
import { ChannelType, MessageFlags } from "@discordjs/core";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Environment variables.
if (
	!(process.env.DISCORD_TOKEN && process.env.DATABASE_URL && process.env.APPLICATION_ID) ||
	(PRODUCTION && !(process.env.BETTER_STACK_TOKEN && process.env.BETTER_STACK_ENDPOINT_URL))
) {
	throw new Error("Missing environment variables.");
}

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DATABASE_URL = process.env.DATABASE_URL;
export const BETTER_STACK_TOKEN = process.env.BETTER_STACK_TOKEN;
export const BETTER_STACK_ENDPOINT_URL = process.env.BETTER_STACK_ENDPOINT_URL;
export const DEFAULT_EMBED_COLOUR = 0xe93eca;
export const SUPPORT_SERVER_INVITE_URL = "https://thatskyapplication.com/support";

export const ERROR_RESPONSE = {
	components: [],
	content: `Encountered an error.\n\nJoin the [support server](${SUPPORT_SERVER_INVITE_URL}) to report this issue!`,
	embeds: [],
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
};

export const NOT_IN_CACHED_GUILD_RESPONSE = {
	content: `I must be present in the server. Invite me with the bot scope and try again.\nIf you need help, join the [support server](${SUPPORT_SERVER_INVITE_URL})!`,
	flags: MessageFlags.SuppressEmbeds | MessageFlags.Ephemeral,
} as const;

export const MEMBER_LOG_CHANNEL_TYPES = [ChannelType.GuildText] as const;
export const MEMBER_LOG_LEAVE_COLOUR = 0x000000 as const;
