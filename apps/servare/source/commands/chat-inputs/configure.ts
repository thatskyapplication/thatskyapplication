import { type APIChatInputApplicationCommandGuildInteraction, MessageFlags } from "@discordjs/core";
import { client } from "../../discord.js";
import {
	isMemberLogChannel,
	isMemberLogSendable,
	setup as setupMemberLog,
	setupResponse as setupResponseMemberLog,
} from "../../features/member-log.js";
import { setupResponse as setupResponseMessageLog } from "../../features/message-log.js";
import {
	isReportCreatableAndSendable,
	setup as setupReport,
	setupResponse as setupResponseReport,
} from "../../features/report.js";
import type { Guild } from "../../models/discord/guild.js";
import pino from "../../pino.js";
import { REPORT_CHANNEL_TYPE } from "../../utility/constants.js";
import { OptionResolver } from "../../utility/option-resolver.js";

async function report(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	guild: Guild,
	options: OptionResolver,
) {
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

		await setupReport({ guildId: guild.id, channelId: channel.id });
	}

	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseReport(guild.id),
	);
}

async function memberLog(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	guild: Guild,
	options: OptionResolver,
) {
	const channel = options.getChannel("channel");

	if (channel) {
		const cachedChannel = guild.channels.get(channel.id);

		if (!(cachedChannel && isMemberLogChannel(cachedChannel))) {
			pino.error(interaction, "Received an unknown channel type whilst setting up the member log.");

			throw new Error("Received an unknown channel type whilst setting up the member log.");
		}

		const memberLogSendable = isMemberLogSendable(
			guild,
			cachedChannel,
			await guild.fetchMe(),
			true,
		);

		if (memberLogSendable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: memberLogSendable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await setupMemberLog({ guildId: guild.id, channelId: channel.id });
	}

	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseMemberLog(guild.id),
	);
}

async function messageLog(interaction: APIChatInputApplicationCommandGuildInteraction) {
	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponseMessageLog(interaction.guild_id),
	);
}

export default {
	name: "configure",
	async chatInput(interaction: APIChatInputApplicationCommandGuildInteraction, guild: Guild) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "report": {
				await report(interaction, guild, options);
				return;
			}
			case "member-log": {
				await memberLog(interaction, guild, options);
				return;
			}
			case "message-log": {
				await messageLog(interaction);
				return;
			}
		}
	},
} as const;
