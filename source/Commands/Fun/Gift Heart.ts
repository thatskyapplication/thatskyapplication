import type { UserContextMenuCommandInteraction } from "discord.js";
import COMMANDS, { type UserContextMenuCommand } from "../index.js";

export default new (class implements UserContextMenuCommand {
	public readonly name = "Gift Heart";

	public async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		await COMMANDS.heart.gift(interaction);
	}
})();
