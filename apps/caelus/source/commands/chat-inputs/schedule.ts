import { type APIChatInputApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { scheduleOverview } from "../../features/schedule.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("schedule.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		await scheduleOverview(interaction, { ephemeral: options.getBoolean("hide") ?? false });
	},
} as const;
