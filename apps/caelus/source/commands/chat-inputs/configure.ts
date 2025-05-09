import {
	type APIChatInputApplicationCommandGuildInteraction,
	type APIChatInputApplicationCommandInteraction,
	Locale,
	MessageFlags,
} from "@discordjs/core";
import { t } from "i18next";
import { GUILD_CACHE } from "../../caches/guilds.js";
import { client } from "../../discord.js";
import {
	isDailyGuidesDistributable,
	isDailyGuidesDistributionChannel,
	setup,
	setupResponse,
} from "../../features/daily-guides.js";
import AI from "../../models/AI.js";
import type { Guild } from "../../models/discord/guild.js";
import {
	setup as notificationSetup,
	status as notificationStatus,
	unset as notificationUnset,
} from "../../services/notification.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../utility/constants.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

async function dailyGuides(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
	guild: Guild,
) {
	const channel = options.getChannel("channel");

	if (channel) {
		const cachedChannel = guild.channels.get(channel.id);

		if (!(cachedChannel && isDailyGuidesDistributionChannel(cachedChannel))) {
			throw new Error("Received an unknown channel type whilst setting up daily guides.");
		}

		const dailyGuidesDistributable = isDailyGuidesDistributable(
			guild,
			cachedChannel,
			await guild.fetchMe(),
			true,
		);

		if (dailyGuidesDistributable.length > 0) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: dailyGuidesDistributable.join("\n"),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await setup({ guildId: guild.id, channelId: channel.id });
	}

	await client.api.interactions.reply(
		interaction.id,
		interaction.token,
		await setupResponse(guild),
	);
}

export default {
	name: t("configure.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const guild = isGuildChatInputCommand(interaction) && GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			await client.api.interactions.reply(
				interaction.id,
				interaction.token,
				NOT_IN_CACHED_GUILD_RESPONSE,
			);

			return;
		}

		const options = new OptionResolver(interaction);

		switch (options.getSubcommandGroup(false) ?? options.getSubcommand(true)) {
			case t("configure.ai.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				const ai = AI.cache.get(interaction.guild_id);

				await client.api.interactions.reply(
					interaction.id,
					interaction.token,
					AI.response(interaction, ai),
				);

				break;
			}
			case t("configure.daily-guides.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				await dailyGuides(interaction, options, guild);
				return;
			}
			case t("configure.notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" }): {
				switch (options.getSubcommand()) {
					case "setup": {
						await notificationSetup(interaction, options);
						return;
					}
					case "status": {
						await notificationStatus(interaction);
						return;
					}
					case "unset": {
						await notificationUnset(interaction, options);
						return;
					}
				}

				break;
			}
		}
	},
} as const;
