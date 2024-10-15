import { Locale, MessageFlags, type UserContextMenuCommandInteraction } from "discord.js";
import { t } from "i18next";
import Profile from "../../Structures/Profile.js";
import type { UserContextMenuCommand } from "../index.js";

export default new (class implements UserContextMenuCommand {
	public readonly name = t("Sky-Profile.command-name", { lng: Locale.EnglishGB, ns: "commands" });

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
