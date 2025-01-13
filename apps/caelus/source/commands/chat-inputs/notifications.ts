import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { GUILD_CACHE } from "../../caches/guilds.js";
import { client } from "../../discord.js";
import { setup, status, unset } from "../../services/notification.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../utility/constants.js";
import { isGuildChatInputCommand } from "../../utility/functions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("notifications.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
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

		switch (options.getSubcommand()) {
			case "setup": {
				await setup(interaction, options);
				return;
			}
			case "status": {
				await status(interaction);
				return;
			}
			case "unset": {
				await unset(interaction, options);
			}
		}
	},
} as const;
