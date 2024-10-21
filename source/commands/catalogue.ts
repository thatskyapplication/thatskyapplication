import { type ChatInputCommandInteraction, Locale } from "discord.js";
import { t } from "i18next";
import { Catalogue } from "../Structures/Catalogue.js";
import type { ChatInputCommand } from "./index.js";

export default new (class implements ChatInputCommand {
	public readonly name = t("catalogue.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async chatInput(interaction: ChatInputCommandInteraction) {
		await Catalogue.viewCatalogue(interaction);
	}
})();
