import { type APIUserApplicationCommandInteraction, Locale } from "@discordjs/core";
import { t } from "i18next";
import { gift } from "../../features/heart.js";
import { OptionResolver } from "../../utility/option-resolver.js";

export default {
	name: t("Gift-Heart.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async userContextMenu(interaction: APIUserApplicationCommandInteraction) {
		const options = new OptionResolver(interaction);
		await gift(interaction, options.getTargetUser(), options.getTargetMember());
	},
};
