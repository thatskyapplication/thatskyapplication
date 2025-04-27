import { type APIChatInputApplicationCommandGuildInteraction, MessageFlags } from "@discordjs/core";
import { client } from "../../discord.js";
import { isReportCreatableAndSendable, setup, setupResponse } from "../../features/report.js";
import type { Guild } from "../../models/discord/guild.js";
import pino from "../../pino.js";
import { REPORT_CHANNEL_TYPE } from "../../utility/constants.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "configure",
	async chatInput(interaction: APIChatInputApplicationCommandGuildInteraction, guild: Guild) {
		const options = new OptionResolver(interaction);

		if (options.getSubcommand() !== "report") {
			return;
		}

		const channel = options.getChannel("channel");

		if (channel) {
			const cachedChannel = guild.channels.get(channel.id);

			if (cachedChannel?.type !== REPORT_CHANNEL_TYPE) {
				pino.error(
					interaction,
					"Received an unknown channel type whilst setting up the report channel.",
				);

				throw new Error("Received an unknown channel type whilst setting up the report channel.");
			}

			const reportCreatableAndSendable = isReportCreatableAndSendable(
				guild,
				cachedChannel,
				await guild.fetchMe(),
				true,
			);

			if (reportCreatableAndSendable.length > 0) {
				await client.api.interactions.reply(interaction.id, interaction.token, {
					content: reportCreatableAndSendable.join("\n"),
					flags: MessageFlags.Ephemeral,
				});

				return;
			}

			await setup({ guildId: guild.id, channelId: channel.id });
		}

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			await setupResponse(guild.id),
		);
	},
} as const;
