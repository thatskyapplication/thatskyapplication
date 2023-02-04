import type { ApplicationCommandData, UserContextMenuCommandInteraction } from "discord.js";
import { ApplicationCommandType } from "discord.js";
import type { UserContextMenuCommand } from "../index.js";
import commands from "../index.js";

export default class implements UserContextMenuCommand {
	public readonly name = "Gift Heart";

	public readonly type = ApplicationCommandType.User;

	public async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		await commands.heart.gift(interaction);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			type: this.type,
		};
	}
}
