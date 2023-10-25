import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	PermissionFlagsBits,
} from "discord.js";
import AI from "../../Structures/AI.js";
import type { ChatInputCommand } from "../index.js";

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "ai",
		description: "Configure the AI.",
		type: ApplicationCommandType.ChatInput,
		defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
		dmPermission: false,
	} as const satisfies Readonly<ApplicationCommandData>;

	public async chatInput(interaction: ChatInputCommandInteraction<"cached">) {
		const ai = AI.cache.get(interaction.guildId);
		await interaction.reply(AI.response(interaction.guild, ai));
	}
})();
