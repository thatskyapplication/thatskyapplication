import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	hyperlink,
	MessageFlags,
	PermissionFlagsBits,
} from "discord.js";
import AI from "../../Structures/AI.js";
import { APPLICATION_INVITE_URL } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "ai",
		description: "Configure the AI.",
		type: ApplicationCommandType.ChatInput,
		defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
		integrationTypes: [0],
		contexts: [0],
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		if (!interaction.inCachedGuild()) {
			await interaction.reply({
				content: `${hyperlink(
					"Invite me",
					APPLICATION_INVITE_URL,
				)} to use this command—I must be present in the server!`,
				ephemeral: true,
				flags: MessageFlags.SuppressEmbeds,
			});

			return;
		}

		const ai = AI.cache.get(interaction.guildId);
		await interaction.reply(AI.response(interaction.guild, ai));
	}
})();
