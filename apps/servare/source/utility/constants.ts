import process from "node:process";
import { ChannelType, MessageFlags } from "@discordjs/core";

// Production detection.
export const PRODUCTION = process.env.NODE_ENV === "production";

// Environment variables.
if (
	!(process.env.DISCORD_TOKEN && process.env.DATABASE_URL && process.env.APPLICATION_ID) ||
	(PRODUCTION && !process.env.SENTRY_DATA_SOURCE_NAME)
) {
	throw new Error("Missing environment variables.");
}

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const APPLICATION_ID = process.env.APPLICATION_ID;
export const DATABASE_URL = process.env.DATABASE_URL;
export const SENTRY_DATA_SOURCE_NAME = process.env.SENTRY_DATA_SOURCE_NAME;
export const DEFAULT_ACCENT_COLOUR = 0xc0c0ba;
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

export const MESSAGE_LOG_CHANNEL_TYPES = [ChannelType.GuildText] as const;

export const MESSAGE_LOG_IGNORE_ALLOW_CHANNEL_TYPES = [
	ChannelType.GuildText,
	ChannelType.GuildVoice,
	ChannelType.GuildCategory,
	ChannelType.GuildAnnouncement,
	ChannelType.GuildStageVoice,
] as const;

export const MESSAGE_UPDATE_CODE_CHECK_REGULAR_EXPRESSION = /```.*?```/s;
export const MESSAGE_UPDATE_REGULAR_EXPRESSION = /```(?:(\S+)\n)?\s*(.+?)\s*```/s;
export const REPORT_CHANNEL_TYPE = ChannelType.GuildForum as const;
export const REPORT_MESSAGE_COLOUR = 0xb81e1e as const;
export const REPORT_MINIMUM_REASON_LENGTH = 4 as const;
export const REPORT_MAXIMUM_REASON_LENGTH = 1000 as const;
export const REPORT_MESSAGE_MAXIMUM_LENGTH = 2000 as const;
