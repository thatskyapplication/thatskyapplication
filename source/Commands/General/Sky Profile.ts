import {
	type ApplicationCommandData,
	ApplicationCommandType,
	type UserContextMenuCommandInteraction,
} from "discord.js";
import COMMANDS, { type UserContextMenuCommand } from "../index.js";

export default new (class implements UserContextMenuCommand {
	public readonly data = {
		name: "Sky Profile",
		type: ApplicationCommandType.User,
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		await COMMANDS.skyprofile.show(interaction);
	}
})();
