import {
	ActionRowBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	ButtonBuilder,
	ButtonStyle,
	type ChatInputCommandInteraction,
} from "discord.js";
import type { ChatInputCommand } from "../index.js";

const DATA_DELETION_MESSAGE = `Are you sure you want to delete your data? This will:
- Delete your Sky profile
- Delete your catalogue
- Delete your hearts
  - Your user id in heart histories for others will be anonymised
- Delete your maximum streak in the guessing game` as const;

export const DATA_DELETION_CUSTOM_ID = "DATA_DELETION_CUSTOM_ID" as const;

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "data",
		description: "Commands regarding your data.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "delete",
				description: "Deletes your data.",
			},
		],
		integrationTypes: [0, 1],
		contexts: [0, 1, 2],
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "delete":
				await this.delete(interaction);
		}
	}

	public async delete(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(DATA_DELETION_CUSTOM_ID)
						.setLabel("Delete my data")
						.setStyle(ButtonStyle.Danger),
				),
			],
			content: DATA_DELETION_MESSAGE,
			ephemeral: true,
		});
	}
})();
