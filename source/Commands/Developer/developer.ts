import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import DailyGuides from "../../Structures/DailyGuides.js";
import { User } from "../../Utility/Constants.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "developer";

	public readonly type = ApplicationCommandType.ChatInput;

	public readonly developer = true;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "daily-guides":
				await this.dailyGuides(interaction);
		}
	}

	public async dailyGuides(interaction: ChatInputCommandInteraction) {
		const { client, user } = interaction;
		if (user.id !== User.Jiralite) await interaction.reply("Disallowed.");
		await interaction.reply("Rechecking daily guides.");
		await DailyGuides.reCheck(client);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Developer-specific commands.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "daily-guides",
					description: "Manually checks to distribute daily guides.",
				},
			],
			defaultMemberPermissions: 0n,
		};
	}
}
