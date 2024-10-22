import {
	type ChatInputCommandInteraction,
	Locale,
	type UserContextMenuCommandInteraction,
} from "discord.js";
import { t } from "i18next";
import { gift, history } from "../../services/heart.js";

export default {
	name: t("heart.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "gift":
				await this.gift(interaction);
				break;
			case "history":
				await this.history(interaction);
		}
	},
	async gift(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		await gift(interaction);
	},
	async history(interaction: ChatInputCommandInteraction) {
		await history(interaction);
	},
} as const;
