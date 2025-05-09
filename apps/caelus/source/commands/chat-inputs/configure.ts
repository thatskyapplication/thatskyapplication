import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { GUILD_CACHE } from "../../caches/guilds.js";
import { client } from "../../discord.js";
import AI from "../../models/AI.js";
import {
	setup as dailyGuidesSetup,
	status as dailyGuidesStatus,
	unset as dailyGuidesUnset,
} from "../../services/daily-guides.js";
import {
	setup as notificationSetup,
	status as notificationStatus,
	unset as notificationUnset,
} from "../../services/notification.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../utility/constants.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("configure.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		if (!(isGuildChatInputCommand(interaction) && GUILD_CACHE.get(interaction.guild_id))) {
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
				switch (options.getSubcommand()) {
					case "setup": {
						await dailyGuidesSetup(interaction, options);
						return;
					}
					case "status": {
						await dailyGuidesStatus(interaction);
						return;
					}
					case "unset": {
						await dailyGuidesUnset(interaction);
						return;
					}
				}

				break;
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
