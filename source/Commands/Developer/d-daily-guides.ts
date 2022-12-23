import type { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import DailyGuides from "../../Structures/DailyGuides.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import type { ChatInputCommand } from "../index.js";

export default class implements ChatInputCommand {
	public readonly name = "d-daily-guides";

	public readonly type = ApplicationCommandType.ChatInput;

	public readonly developer = true;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "distribute":
				await this.distribute(interaction);
				return;
			case "parse":
				await this.parse(interaction);
		}
	}

	public async distribute(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Distributing daily guides.");
		await DailyGuidesDistribution.distribute(interaction.client);
	}

	public async parse(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Parsing daily guides.");
		await DailyGuides.reCheck(interaction.client);
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Developer-specific commands.",
			type: this.type,
			options: [
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "parse",
					description: "Manually parses daily guides and distributes.",
				},
				{
					type: ApplicationCommandOptionType.Subcommand,
					name: "distribute",
					description: "Manually re-checks to distribute daily guides.",
				},
			],
			defaultMemberPermissions: 0n,
		};
	}
}
