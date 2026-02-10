import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { t } from "i18next";
import { gift, history } from "../../features/heart.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("heart.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		switch (options.getSubcommand()) {
			case "gift":
				await gift(interaction, options.getUser("user", true), options.getMember("user"));
				break;
			case "history":
				await history(interaction);
		}
	},
} as const;
