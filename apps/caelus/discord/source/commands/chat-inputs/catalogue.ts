import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { t } from "i18next";
import { viewStart } from "../../features/catalogue.js";

export default {
	name: t("catalogue.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		await viewStart(interaction);
	},
} as const;
