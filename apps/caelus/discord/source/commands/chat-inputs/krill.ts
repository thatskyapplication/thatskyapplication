import type { APIChatInputApplicationCommandInteraction } from "@discordjs/core";
import { t } from "i18next";
import { friendshipAction } from "../../features/friendship-actions.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("krill.command-name", { ns: "commands" }),
	async chatInput(interaction: APIChatInputApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);

		await friendshipAction({
			interaction,
			user: options.getUser("user", true),
			member: options.getMember("user"),
			key: "krill",
		});
	},
} as const;
