import { type UserContextMenuCommandInteraction, ApplicationCommandType } from "discord.js";
import COMMANDS, { type UserContextMenuCommand } from "../index.js";

export default new (class implements UserContextMenuCommand {
	public readonly data = {
		name: "Gift Heart",
		type: ApplicationCommandType.User,
		dmPermission: false,
	} as const;

	public async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		await COMMANDS.heart.gift(interaction);
	}
})();
