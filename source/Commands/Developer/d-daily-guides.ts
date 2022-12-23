import type { ApplicationCommandData, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";
import {
	codeBlock,
	TextInputStyle,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import DailyGuides from "../../Structures/DailyGuides.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import type { ChatInputCommand } from "../index.js";

export const D_DAILY_GUIDES_QUEST_1_MODAL = "D_DAILY_GUIDES_QUEST_1_MODAL" as const;
const D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT = "D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT" as const;
const D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL = "D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL" as const;

export default class implements ChatInputCommand {
	public readonly name = "d-daily-guides";

	public readonly type = ApplicationCommandType.ChatInput;

	public readonly developer = true;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;

		switch (options.getSubcommandGroup() ?? options.getSubcommand()) {
			case "distribute":
				await this.distribute(interaction);
				return;
			case "parse":
				await this.parse(interaction);
				return;
			case "set":
				await this.set(interaction);
		}
	}

	public async distribute(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Distributing daily guides...");
		await DailyGuidesDistribution.distribute(interaction.client);
		await interaction.editReply("Distributed daily guides.");
	}

	public async parse(interaction: ChatInputCommandInteraction) {
		await interaction.reply("Parsing daily guides.");
		await DailyGuides.reCheck(interaction.client);
	}

	public async set(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "quest-1":
				await this.setQuest1(interaction);
		}
	}

	public async setQuest1(interaction: ChatInputCommandInteraction) {
		const { quest1 } = DailyGuides;

		const textInput = new TextInputBuilder()
			.setCustomId(D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT)
			.setLabel("The description of the first quest.")
			.setRequired()
			.setStyle(TextInputStyle.Short)
			.setValue(quest1?.content ?? "");

		const textInput2 = new TextInputBuilder()
			.setCustomId(D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL)
			.setLabel("The URL of the first quest.")
			.setRequired()
			.setStyle(TextInputStyle.Short)
			.setValue(quest1?.url ?? "");

		const actionRow = new ActionRowBuilder<TextInputBuilder>().setComponents(textInput);
		const actionRow2 = new ActionRowBuilder<TextInputBuilder>().setComponents(textInput2);

		const modal = new ModalBuilder()
			.setComponents(actionRow, actionRow2)
			.setCustomId(D_DAILY_GUIDES_QUEST_1_MODAL)
			.setTitle("Quest 1");

		await interaction.showModal(modal);
	}

	public async parseQuest1(interaction: ModalSubmitInteraction) {
		const { fields } = interaction;
		const content = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT);
		const url = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL);
		await DailyGuides.updateQuest1({ content, url });

		await interaction.reply(
			`Successfully updated quest 1.\n${codeBlock("JSON", JSON.stringify(DailyGuides.quest1, null, 2))}`,
		);
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
					description: "Manually distributes daily guides.",
				},
				{
					type: ApplicationCommandOptionType.SubcommandGroup,
					name: "set",
					description: "Manually sets daily guides data.",
					options: [
						{
							type: ApplicationCommandOptionType.Subcommand,
							name: "quest-1",
							description: "Set the first quest data.",
						},
					],
				},
			],
			defaultMemberPermissions: 0n,
		};
	}
}
