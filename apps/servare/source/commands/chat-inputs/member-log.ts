import { type APIChatInputApplicationCommandGuildInteraction, MessageFlags } from "@discordjs/core";
import { client } from "../../discord.js";
import {
	isMemberLogChannel,
	isMemberLogSendable,
	setup,
	setupComponentsResponse,
} from "../../features/member-log.js";
import type { Guild } from "../../models/discord/guild.js";
import pino from "../../pino.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: "member-log" as const,
	async chatInput(interaction: APIChatInputApplicationCommandGuildInteraction, guild: Guild) {
		const options = new OptionResolver(interaction);
		const channel = guild.channels.get(options.getChannel("channel", true).id);

		if (!(channel && isMemberLogChannel(channel))) {
			pino.error(interaction, "Received an unknown channel type whilst setting up the member log.");
			throw new Error("Received an unknown channel type whilst setting up the member log.");
		}

		const memberLogSendable = isMemberLogSendable(guild, channel, await guild.fetchMe(), true);

		if (memberLogSendable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: memberLogSendable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await setup({ guildId: guild.id, channelId: channel.id });

		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: await setupComponentsResponse(guild.id),
			flags: MessageFlags.Ephemeral,
		});
	},
} as const;
