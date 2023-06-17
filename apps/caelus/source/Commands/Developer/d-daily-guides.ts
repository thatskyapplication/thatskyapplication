import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	type ModalSubmitInteraction,
	codeBlock,
	TextInputStyle,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
} from "discord.js";
import DailyGuides, {
	type DailyGuideEventRotation,
	type QuestNumber,
	DAILY_GUIDE_EVENT_ROTATION,
	QUEST_NUMBER,
} from "../../Structures/DailyGuides.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import type { ChatInputCommand } from "../index.js";

export const D_DAILY_GUIDES_QUEST_1_MODAL = "D_DAILY_GUIDES_QUEST_1_MODAL" as const;
const D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT = "D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT" as const;
const D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL = "D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL" as const;
export const D_DAILY_GUIDES_QUEST_2_MODAL = "D_DAILY_GUIDES_QUEST_2_MODAL" as const;
const D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT = "D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT" as const;
const D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL = "D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL" as const;
export const D_DAILY_GUIDES_QUEST_3_MODAL = "D_DAILY_GUIDES_QUEST_3_MODAL" as const;
const D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT = "D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT" as const;
const D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL = "D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL" as const;
export const D_DAILY_GUIDES_QUEST_4_MODAL = "D_DAILY_GUIDES_QUEST_4_MODAL" as const;
const D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT = "D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT" as const;
const D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL = "D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL" as const;

function isQuestNumber(questNumber: number): questNumber is QuestNumber {
	return QUEST_NUMBER.includes(questNumber as QuestNumber);
}

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "d-daily-guides",
		description: "Developer-specific commands.",
		type: ApplicationCommandType.ChatInput,
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
						name: "quest",
						description: "Set the quest data.",
						options: [
							{
								type: ApplicationCommandOptionType.Integer,
								name: "number",
								description: "The quest number to set the data of.",
								choices: QUEST_NUMBER.map((questNumber) => ({ name: String(questNumber), value: questNumber })),
								required: true,
							},
						],
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "seasonal-candles",
						description: "Set the seasonal candles data.",
						options: [
							{
								type: ApplicationCommandOptionType.String,
								name: "url",
								description: "The infographic URL of the seasonal candles.",
								required: true,
							},
						],
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "event-currency",
						description: "Set the event currency data.",
						options: [
							{
								type: ApplicationCommandOptionType.String,
								name: "rotation",
								description: "The rotation of the event currency.",
								choices: DAILY_GUIDE_EVENT_ROTATION.map((choice) => ({ name: choice, value: choice })),
								required: true,
							},
						],
					},
				],
			},
		],
		defaultMemberPermissions: 0n,
	} as const satisfies Readonly<ApplicationCommandData>;

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
		await interaction.reply("Parsing daily guides...");
		await DailyGuides.reCheck(interaction.client);
		await interaction.editReply("Parsed daily guides.");
	}

	public async set(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "quest":
				await this.setQuest(interaction);
				break;
			case "seasonal-candles":
				await this.seasonalCandles(interaction);
				break;
			case "event-currency":
				await this.eventCurrency(interaction);
				break;
		}
	}

	public async setQuest(interaction: ChatInputCommandInteraction) {
		const number = interaction.options.getInteger("number", true);

		if (!isQuestNumber(number)) {
			await interaction.reply(`Detected an unknown quest number: ${number}.`);
			return;
		}

		const { quest1, quest2, quest3, quest4 } = DailyGuides;
		let quest;
		let modalCustomId;
		let textInputCustomId;
		let textInput2CustomId;

		switch (number) {
			case 1:
				quest = quest1;
				modalCustomId = D_DAILY_GUIDES_QUEST_1_MODAL;
				textInputCustomId = D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT;
				textInput2CustomId = D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL;
				break;
			case 2:
				quest = quest2;
				modalCustomId = D_DAILY_GUIDES_QUEST_2_MODAL;
				textInputCustomId = D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT;
				textInput2CustomId = D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL;
				break;
			case 3:
				quest = quest3;
				modalCustomId = D_DAILY_GUIDES_QUEST_3_MODAL;
				textInputCustomId = D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT;
				textInput2CustomId = D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL;
				break;
			case 4:
				quest = quest4;
				modalCustomId = D_DAILY_GUIDES_QUEST_4_MODAL;
				textInputCustomId = D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT;
				textInput2CustomId = D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL;
				break;
		}

		const textInput = new TextInputBuilder()
			.setCustomId(textInputCustomId)
			.setLabel("The description of the quest.")
			.setRequired()
			.setStyle(TextInputStyle.Short)
			.setValue(quest?.content ?? "");

		const textInput2 = new TextInputBuilder()
			.setCustomId(textInput2CustomId)
			.setLabel("The infographic URL of the quest.")
			.setRequired(false)
			.setStyle(TextInputStyle.Short)
			.setValue(quest?.url ?? "");

		const actionRow = new ActionRowBuilder<TextInputBuilder>().setComponents(textInput);
		const actionRow2 = new ActionRowBuilder<TextInputBuilder>().setComponents(textInput2);

		const modal = new ModalBuilder()
			.setComponents(actionRow, actionRow2)
			.setCustomId(modalCustomId)
			.setTitle(`Quest ${number}`);

		await interaction.showModal(modal);
	}

	public async parseQuest(interaction: ModalSubmitInteraction, number: QuestNumber) {
		const { fields } = interaction;
		let content;
		let url;

		switch (number) {
			case 1:
				content = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL);
				break;
			case 2:
				content = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL);
				break;
			case 3:
				content = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL);
				break;
			case 4:
				content = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(D_DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL);
				break;
		}

		await DailyGuides.updateQuest({ content, url }, number);

		await interaction.reply(
			`Successfully updated quest ${number}.\n${codeBlock(
				"JSON",
				JSON.stringify(DailyGuides[`quest${number}`], null, 2),
			)}`,
		);
	}

	public async seasonalCandles(interaction: ChatInputCommandInteraction) {
		const url = interaction.options.getString("url", true);
		await DailyGuides.updateSeasonalCandles(url);

		await interaction.reply(
			`Successfully updated the seasonal candles.\n${codeBlock(
				"JSON",
				JSON.stringify(DailyGuides.seasonalCandles, null, 2),
			)}`,
		);
	}

	public async eventCurrency(interaction: ChatInputCommandInteraction) {
		const rotation = interaction.options.getString("rotation", true) as DailyGuideEventRotation;
		await DailyGuides.updateEventCurrency(rotation);

		await interaction.reply(
			`Successfully updated the event currency.\n${codeBlock(
				"JSON",
				JSON.stringify(DailyGuides.eventCurrency, null, 2),
			)}`,
		);
	}
})();
