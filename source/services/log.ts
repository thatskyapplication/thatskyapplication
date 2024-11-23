import { inspect } from "node:util";
import {
	type APIEmbed,
	ChannelType,
	type ChannelsAPI,
	type GatewayGuildDeleteDispatchData,
	PermissionFlagsBits,
} from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { client } from "../discord.js";
import type { Guild } from "../models/discord/guild.js";
import pino from "../pino.js";
import {
	APPLICATION_ID,
	DEFAULT_EMBED_COLOUR,
	DEVELOPER_GUILD_ID,
	MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID,
} from "../utility/constants.js";
import { can } from "../utility/permissions.js";

interface LogOptions {
	content?: string;
	embeds?: APIEmbed[];
	error?: unknown;
}

export async function log({ content, embeds = [], error }: LogOptions) {
	const output = error ?? content;

	if (output) {
		pino.info(output);
	}

	const guild = GUILD_CACHE.get(DEVELOPER_GUILD_ID);

	if (!guild) {
		return;
	}

	const channel = guild.channels.get(MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		return;
	}

	try {
		const me = await client.api.guilds.getMember(guild.id, APPLICATION_ID);

		if (
			!can({
				permission:
					PermissionFlagsBits.AttachFiles |
					PermissionFlagsBits.EmbedLinks |
					PermissionFlagsBits.SendMessages |
					PermissionFlagsBits.ViewChannel,
				guild,
				member: me,
				channel,
			})
		) {
			return;
		}

		const stamp = `\`[${new Date().toISOString()}]\``;
		const files = [];

		if (error) {
			const inspectedError = inspect(error, false, Number.POSITIVE_INFINITY);

			if (inspectedError.length > 4_096) {
				files.push({
					name: `error-${Date.now()}.xl`,
					data: inspectedError,
				});
			} else {
				embeds.push({
					description: `\`\`\`xl\n${inspectedError}\n\`\`\``,
					title: "Error",
				});
			}
		}

		for (const embed of embeds) {
			if (embed.color === undefined) {
				embed.color = DEFAULT_EMBED_COLOUR;
			}
		}

		const payload: Parameters<ChannelsAPI["createMessage"]>[1] = {
			allowed_mentions: { parse: [] },
			embeds,
			files,
		};

		if (content) {
			payload.content = `${stamp} ${content}`;
		}

		await client.api.channels.createMessage(channel.id, payload);
	} catch (error) {
		pino.error(error, "Failed to log to Discord.");
	}
}

export function logGuild(guild: GatewayGuildDeleteDispatchData | Guild, joined: boolean) {
	pino.info(
		"name" in guild
			? {
					id: guild.id,
					name: guild.name,
					created: guild.createdAt,
					joined: guild.joinedAt,
					owner: guild.ownerId,
					members: guild.memberCount,
					locale: guild.preferredLocale,
				}
			: {
					id: guild.id,
				},
		joined ? "Guild joined" : "Guild left",
	);
}
