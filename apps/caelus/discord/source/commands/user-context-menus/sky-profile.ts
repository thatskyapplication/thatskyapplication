import { type APIUserApplicationCommandInteraction, MessageFlags } from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { skyProfileExploreProfile } from "../../features/sky-profile.js";

export default {
	name: t("Sky-Profile.command-name", { ns: "commands" }),
	async userContextMenu(interaction: APIUserApplicationCommandInteraction) {
		const { data, locale } = interaction;
		const user = interaction.data.resolved.users[data.target_id]!;

		if (user.bot) {
			await client.api.interactions.reply(interaction.id, interaction.token, {
				content: t("sky-profile.no-sky-profile-application", { lng: locale, ns: "features" }),
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await skyProfileExploreProfile(interaction, data.target_id);
	},
} as const;
