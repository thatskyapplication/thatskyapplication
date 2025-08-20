import type { Locale, Snowflake } from "@discordjs/core";
import { Table } from "@thatskyapplication/utility";
import pg from "../pg.js";
import pino from "../pino.js";

export interface CommandAnalyticsPacket {
	user_id: string;
	guild_id: string | null;
	channel_id: string;
	command_id: string;
	command_string: string;
	user_locale: string;
	guild_locale: string | null;
	date: Date;
}

interface CommandAnalyticsSendOptions {
	userId: Snowflake;
	guildId?: Snowflake | undefined;
	channelId: Snowflake;
	commandId: Snowflake;
	commandString: string;
	userLocale: Locale;
	guildLocale?: Locale | undefined;
	date: Date;
}

export async function commandAnalyticsSend({
	userId,
	guildId,
	channelId,
	commandId,
	commandString,
	userLocale,
	guildLocale,
	date,
}: CommandAnalyticsSendOptions) {
	try {
		await pg<CommandAnalyticsPacket>(Table.CommandAnalytics).insert({
			user_id: userId,
			guild_id: guildId ?? null,
			channel_id: channelId,
			command_id: commandId,
			command_string: commandString,
			user_locale: userLocale,
			guild_locale: guildLocale ?? null,
			date,
		});
	} catch (error) {
		pino.warn(error, "Could not send command analytics.");
	}
}

export async function commandAnalyticsDeleteOld() {
	// Delete analytics older than 30 days.
	await pg<CommandAnalyticsPacket>(Table.CommandAnalytics)
		.delete()
		.where("date", "<", new Date(Date.now() - 2592000000));
}
