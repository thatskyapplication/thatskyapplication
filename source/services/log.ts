import { stat, unlink, writeFile } from "node:fs/promises";
import { inspect } from "node:util";
import { ChannelType, PermissionFlagsBits, type APIUnavailableGuild, type GatewayGuildCreateDispatchData } from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import pino from "../pino.js";
import { DEFAULT_EMBED_COLOUR, MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID } from "../utility/constants.js";

interface LogOptions {
	content?: string;
	embeds?: EmbedBuilder[];
	error?: unknown;
}

export async function log(client: Client<true>, { content, embeds = [], error }: LogOptions) {
	const output = error ?? content;

	if (output) {
		pino.info(output);
	}

	const channel = client.channels.cache.get(MANUAL_DAILY_GUIDES_LOG_CHANNEL_ID);

	if (channel?.type !== ChannelType.GuildText) {
		return;
	}

	const potentialFileName = `../error-${Date.now()}.xl`;

	try {
		const me = await channel.guild.members.fetchMe();

		if (
			!channel
				.permissionsFor(me)
				.has(
					PermissionFlagsBits.AttachFiles |
						PermissionFlagsBits.EmbedLinks |
						PermissionFlagsBits.SendMessages |
						PermissionFlagsBits.ViewChannel,
				)
		) {
			return;
		}

		const stamp = `\`[${new Date().toISOString()}]\``;
		const files = [];

		if (error) {
			const inspectedError = inspect(error, false, Number.POSITIVE_INFINITY);

			if (inspectedError.length > 4_096) {
				await writeFile(potentialFileName, inspectedError);
				files.push(potentialFileName);
			} else {
				const embed = new EmbedBuilder()
					.setDescription(`\`\`\`xl\n${inspectedError}\n\`\`\``)
					.setTitle("Error");

				embeds.push(embed);
			}
		}

		for (const embed of embeds) {
			if (embed.data.color === undefined) {
				embed.setColor(DEFAULT_EMBED_COLOUR);
			}
		}

		const payload: Parameters<TextChannel["send"]>[0] = {
			allowedMentions: { parse: [] },
			embeds,
			files,
		};

		if (content) {
			payload.content = `${stamp} ${content}`;
		}

		await channel.send(payload);

		if (files.length > 0) {
			await unlink(potentialFileName);
		}
	} catch (error) {
		await stat(potentialFileName)
			.then(async () => unlink(potentialFileName))
			.catch((unlinkError) => {
				if (unlinkError.code !== "ENOENT") {
					pino.error(unlinkError, "Failed to unlink file.");
				}
			});

		pino.error(error, "Failed to log to Discord.");
	}
}

export function logGuildCreate(guild: GatewayGuildCreateDispatchData) {
	pino.info(
		{
			id: guild.id,
			name: guild.name,
			created: DiscordSnowflake.timestampFrom(guild.id),
			joined: guild.joined_at,
			owner: guild.owner_id,
			members: guild.member_count,
			locale: guild.preferred_locale,
		},
		"Guild joined",
	);
}

export function logGuildDelete(guild: APIUnavailableGuild) {
	pino.info({ id: guild.id }, "Guild left");
}
