import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { t } from "i18next";
import { client } from "../../discord.js";
import { cannotUseActivities } from "../../utility/permissions.js";

export default {
	name: t("guess.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		if (await cannotUseActivities(interaction)) {
			return;
		}

		await client.api.interactions.launchActivity(interaction.id, interaction.token);
	},
} as const;
