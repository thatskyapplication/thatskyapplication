import { type APIUserApplicationCommandInteraction, Locale, MessageFlags } from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { skyProfileExploreProfile } from "../../features/sky-profile.js";

export default {
	name: t("Sky-Profile.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async userContextMenu(interaction: APIUserApplicationCommandInteraction) {
		const { data } = interaction;
		const user = interaction.data.resolved.users[data.target_id]!;

		if (user.bot) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: "Do applications have Sky profiles? Hm. Who knows?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await skyProfileExploreProfile(interaction, data.target_id);
	},
} as const;
