import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { deletePrompt } from "../../services/data.js";

export default {
	name: t("data.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "delete":
				await this.delete(interaction);
		}
	},
	async delete(interaction: ChatInputCommandInteraction) {
		await deletePrompt(interaction);
	},
} as const;
