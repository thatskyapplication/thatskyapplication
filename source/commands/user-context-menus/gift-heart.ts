import { Locale, type UserContextMenuCommandInteraction } from "discord.js";
import { t } from "i18next";
import { gift } from "../../services/heart.js";

export default {
	name: t("Gift-Heart.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
	async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		await gift(interaction);
	},
};
