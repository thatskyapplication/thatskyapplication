import {
	type ApplicationCommandData,
	ApplicationCommandType,
	MessageFlags,
	type UserContextMenuCommandInteraction,
} from "discord.js";
import Profile from "../../Structures/Profile.js";
import type { UserContextMenuCommand } from "../index.js";

export default new (class implements UserContextMenuCommand {
	public readonly data = {
		name: "Sky Profile",
		type: ApplicationCommandType.User,
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async userContextMenu(interaction: UserContextMenuCommandInteraction) {
		const { targetId, targetUser } = interaction;

		if (targetUser.bot) {
			await interaction.reply({
				content: "Do applications have Sky profiles? Hm. Who knows?",
				flags: MessageFlags.Ephemeral,
			});

			return;
		}

		await Profile.exploreProfile(interaction, targetId);
	}
})();
