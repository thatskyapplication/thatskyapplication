import { Locale, type UserContextMenuCommandInteraction } from "discord.js";
import { t } from "i18next";
import COMMANDS, { type UserContextMenuCommand } from "../index.js";

export default new (class implements UserContextMenuCommand {
	public readonly name = t("Gift-Heart.command-name", { lng: Locale.EnglishGB, ns: "commands" });

	public async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		await COMMANDS.heart.gift(interaction);
	}
})();
