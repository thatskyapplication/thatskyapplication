import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { GUILD_CACHE } from "../../caches/guilds.js";
import { client } from "../../discord.js";
import AI from "../../models/AI.js";
import { NOT_IN_CACHED_GUILD_RESPONSE } from "../../utility/constants.js";

export default {
	name: t("ai.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const guild = interaction.guild_id && GUILD_CACHE.get(interaction.guild_id);

		if (!guild) {
			await client.api.interactions.reply(
				interaction.id,
				interaction.token,
				NOT_IN_CACHED_GUILD_RESPONSE,
			);

			return;
		}

		const ai = AI.cache.get(guild.id);

		await client.api.interactions.reply(
			interaction.id,
			interaction.token,
			AI.response(interaction, ai),
		);
	},
} as const;
