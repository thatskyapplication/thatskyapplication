import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { browse, today } from "../../services/shard-eruption.js";

export default {
	name: t("shard-eruption.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "browse": {
				await this.browse(interaction);
				return;
			}
			case "today": {
				await this.today(interaction);
			}
		}
	},
	async today(interaction: ChatInputCommandInteraction) {
		await today(interaction, 0);
	},
	async browse(interaction: ChatInputCommandInteraction) {
		await browse(interaction, 0);
	},
} as const;
