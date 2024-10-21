import {
	type ChatInputCommandInteraction,
	Locale,
	type UserContextMenuCommandInteraction,
} from "discord.js";
import { t } from "i18next";
import { gift, history } from "../Structures/Heart.js";
import type { ChatInputCommand } from "./index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("heart.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "gift":
				await this.gift(interaction);
				break;
			case "history":
				await this.history(interaction);
		}
	}

	public async gift(interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction) {
		await gift(interaction);
	}

	public async history(interaction: ChatInputCommandInteraction) {
		await history(interaction);
	}
})();
