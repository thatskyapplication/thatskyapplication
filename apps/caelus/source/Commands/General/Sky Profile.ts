import { type UserContextMenuCommandInteraction, ApplicationCommandType } from "discord.js";
import COMMANDS, { type UserContextMenuCommand } from "../index.js";

export default new (class implements UserContextMenuCommand {
	public readonly data = {
		name: "Sky Profile",
		type: ApplicationCommandType.User,
	} as const;

	public async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		await COMMANDS.skyprofile.show(interaction);
	}
})();
