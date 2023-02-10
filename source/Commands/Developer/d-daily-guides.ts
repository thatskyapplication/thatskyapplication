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
import type { QuestNumber } from "../../Structures/DailyGuides.js";
import DailyGuides, { ShardMemory, isQuestNumber, QUEST_NUMBER } from "../../Structures/DailyGuides.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import { resolveShardEruptionMemory } from "../../Utility/Utility.js";
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
		await interaction.reply("Parsing daily guides...");
		await DailyGuides.reCheck(interaction.client);
		await interaction.editReply("Parsed daily guides.");
	}

	public async set(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "quest":
				await this.setQuest(interaction);
				return;
			case "shard-eruption-extra":
				await this.shardEruptionExtra(interaction);
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
			.setLabel("The URL of the first quest.")
			.setRequired()
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

	public async shardEruptionExtra(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;
		const reward = options.getNumber("reward");
		const memory = options.getString("memory");
		const url = options.getString("url");
		const data = options.getString("data");
		const resolvedMemory = memory ? resolveShardEruptionMemory(memory) : null;

		if (!resolvedMemory) {
			await interaction.reply("Cannot interpret the provided memory.");
			return;
		}

		await DailyGuides.updateShardEruption({
			reward,
			memory: resolvedMemory,
			url,
			data,
		});

		await interaction.reply(
			`Successfully updated the shard eruption data.\n${codeBlock(
				"JSON",
				JSON.stringify(DailyGuides.shardEruptionExtra, null, 2),
			)}`,
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
							name: "shard-eruption-extra",
							description: "Set the extra shard eruption data.",
							options: [
								{
									type: ApplicationCommandOptionType.Number,
									name: "reward",
									description: "The reward of the shard eruption.",
									minValue: 0.5,
								},
								{
									type: ApplicationCommandOptionType.String,
									name: "memory",
									description: "The memory of the shard eruption.",
									choices: Object.values(ShardMemory).map((shardMemory) => ({ name: shardMemory, value: shardMemory })),
								},
								{
									type: ApplicationCommandOptionType.String,
									name: "url",
									description: "The URL of the image of the shard eruption's location.",
								},
								{
									type: ApplicationCommandOptionType.String,
									name: "data",
									description: "The message link of the data of the shard eruption.",
								},
							],
						},
					],
				},
			],
			defaultMemberPermissions: 0n,
		};
	}
}
