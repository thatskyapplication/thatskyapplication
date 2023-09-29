import {
	type ApplicationCommandData,
	type ButtonInteraction,
	type ModalMessageModalSubmitInteraction,
	type StringSelectMenuInteraction,
	ChatInputCommandInteraction,
	TextInputStyle,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ButtonBuilder,
	ButtonStyle,
	ActivityType,
} from "discord.js";
import DailyGuides, { type QuestNumber, QUEST_NUMBER } from "../../Structures/DailyGuides.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import { MAXIMUM_EMBED_FIELD_NAME_LENGTH, MAXIMUM_EMBED_FIELD_VALUE_LENGTH } from "../../Utility/Constants.js";
import { resolveEmbedColor, userLogFormat } from "../../Utility/Utility.js";
import { LogType } from "../../index.js";
import type { ChatInputCommand } from "../index.js";

export const DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID = "DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID" as const;
export const DAILY_GUIDES_QUESTS_SET_SELECT_MENU_CUSTOM_ID = "DAILY_GUIDES_QUESTS_SET_SELECT_MENU_CUSTOM_ID" as const;
export const DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID = "DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID" as const;
export const DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID = "DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID" as const;
export const DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID = "DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID" as const;
export const DAILY_GUIDES_QUEST_1_MODAL = "DAILY_GUIDES_QUEST_1_MODAL" as const;
const DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT = "DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT" as const;
const DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL = "DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL" as const;
export const DAILY_GUIDES_QUEST_2_MODAL = "DAILY_GUIDES_QUEST_2_MODAL" as const;
const DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT = "DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT" as const;
const DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL = "DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL" as const;
export const DAILY_GUIDES_QUEST_3_MODAL = "DAILY_GUIDES_QUEST_3_MODAL" as const;
const DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT = "DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT" as const;
const DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL = "DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL" as const;
export const DAILY_GUIDES_QUEST_4_MODAL = "DAILY_GUIDES_QUEST_4_MODAL" as const;
const DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT = "DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT" as const;
const DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL = "DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL" as const;
export const DAILY_GUIDES_DAILY_MESSAGE_MODAL = "DAILY_GUIDES_DAILY_MESSAGE_MODAL" as const;
const DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE = "DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT" as const;
const DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION = "DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION" as const;
export const DAILY_GUIDES_TREASURE_CANDLES_MODAL = "DAILY_GUIDES_TREASURE_CANDLES_MODAL" as const;
const DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1_4 = "DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1_4" as const;
const DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_5_8 = "DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_5_8" as const;

function isQuestNumber(questNumber: number): questNumber is QuestNumber {
	return QUEST_NUMBER.includes(questNumber as QuestNumber);
}

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "admin",
		description: "Developer-specific commands.",
		type: ApplicationCommandType.ChatInput,
		options: [
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "custom-status",
				description: "Sets the custom status.",
				options: [
					{
						type: ApplicationCommandOptionType.String,
						name: "text",
						description: "The text to use.",
						required: true,
					},
				],
			},
			{
				type: ApplicationCommandOptionType.Subcommand,
				name: "daily-guides",
				description: "Edits the daily guides embed.",
			},
		],
		defaultMemberPermissions: 0n,
	} as const satisfies Readonly<ApplicationCommandData>;

	public readonly developer = true;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "custom-status":
				await this.customStatus(interaction);
				return;
			case "daily-guides":
				await this.dailyGuides(interaction);
		}
	}

	public async customStatus(interaction: ChatInputCommandInteraction) {
		const text = interaction.options.getString("text", true);
		interaction.client.user.setPresence({ activities: [{ name: text, type: ActivityType.Custom }] });
		await interaction.reply({ content: "Custom status set.", ephemeral: true });
	}

	private async respond(
		interaction:
			| ButtonInteraction
			| ChatInputCommandInteraction
			| ModalMessageModalSubmitInteraction
			| StringSelectMenuInteraction,
		content?: string,
	) {
		const questOptions = QUEST_NUMBER.map((questNumber) =>
			new StringSelectMenuOptionBuilder().setLabel(`Quest ${questNumber}`).setValue(String(questNumber)),
		);

		const response = {
			content: content ?? "",
			components: [
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID)
						.setLabel("Daily Message")
						.setStyle(ButtonStyle.Primary),
					new ButtonBuilder()
						.setCustomId(DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID)
						.setLabel("Treasure Candles")
						.setStyle(ButtonStyle.Primary),
				),
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(DAILY_GUIDES_QUESTS_SET_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(1)
						.setMinValues(1)
						.setOptions(questOptions)
						.setPlaceholder("Set a quest."),
				),
				new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
					new StringSelectMenuBuilder()
						.setCustomId(DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID)
						.setMaxValues(2)
						.setMinValues(2)
						.setOptions(questOptions)
						.setPlaceholder("Swap 2 quests."),
				),
				new ActionRowBuilder<ButtonBuilder>().setComponents(
					new ButtonBuilder()
						.setCustomId(DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID)
						.setLabel("Distribute")
						.setStyle(ButtonStyle.Success),
				),
			],
			embeds: [DailyGuidesDistribution.embed(await resolveEmbedColor(interaction.guild))],
			ephemeral: true,
		};

		if (interaction instanceof ChatInputCommandInteraction) {
			await interaction.reply(response);
		} else {
			await interaction.update(response);
		}
	}

	public async dailyGuides(interaction: ChatInputCommandInteraction) {
		await this.respond(interaction);
	}

	public async distribute(interaction: ButtonInteraction) {
		const { client, guild, user } = interaction;
		await DailyGuidesDistribution.distribute(client);

		void client.log({
			content: `${userLogFormat(user)} manually distributed the daily guides.`,
			embeds: [DailyGuidesDistribution.embed(await resolveEmbedColor(guild))],
			type: LogType.ManualDailyGuides,
		});

		await this.respond(interaction, "Distributed daily guides.");
	}

	public async questModalResponse(interaction: StringSelectMenuInteraction) {
		const number = Number(interaction.values[0]!);

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
				modalCustomId = DAILY_GUIDES_QUEST_1_MODAL;
				textInputCustomId = DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT;
				textInput2CustomId = DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL;
				break;
			case 2:
				quest = quest2;
				modalCustomId = DAILY_GUIDES_QUEST_2_MODAL;
				textInputCustomId = DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT;
				textInput2CustomId = DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL;
				break;
			case 3:
				quest = quest3;
				modalCustomId = DAILY_GUIDES_QUEST_3_MODAL;
				textInputCustomId = DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT;
				textInput2CustomId = DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL;
				break;
			case 4:
				quest = quest4;
				modalCustomId = DAILY_GUIDES_QUEST_4_MODAL;
				textInputCustomId = DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT;
				textInput2CustomId = DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL;
				break;
		}

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(
					new ActionRowBuilder<TextInputBuilder>().setComponents(
						new TextInputBuilder()
							.setCustomId(textInputCustomId)
							.setLabel("The description of the quest.")
							.setRequired()
							.setStyle(TextInputStyle.Short)
							.setValue(quest?.content ?? ""),
					),
					new ActionRowBuilder<TextInputBuilder>().setComponents(
						new TextInputBuilder()
							.setCustomId(textInput2CustomId)
							.setLabel("The infographic URL of the quest.")
							.setRequired(false)
							.setStyle(TextInputStyle.Short)
							.setValue(quest?.url ?? ""),
					),
				)
				.setCustomId(modalCustomId)
				.setTitle(`Quest ${number}`),
		);
	}

	public async setQuest(interaction: ModalMessageModalSubmitInteraction, number: QuestNumber) {
		const { client, fields, guild, user } = interaction;
		let content;
		let url;

		switch (number) {
			case 1:
				content = fields.getTextInputValue(DAILY_GUIDES_QUEST_1_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(DAILY_GUIDES_QUEST_1_TEXT_INPUT_URL);
				break;
			case 2:
				content = fields.getTextInputValue(DAILY_GUIDES_QUEST_2_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(DAILY_GUIDES_QUEST_2_TEXT_INPUT_URL);
				break;
			case 3:
				content = fields.getTextInputValue(DAILY_GUIDES_QUEST_3_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(DAILY_GUIDES_QUEST_3_TEXT_INPUT_URL);
				break;
			case 4:
				content = fields.getTextInputValue(DAILY_GUIDES_QUEST_4_TEXT_INPUT_CONTENT);
				url = fields.getTextInputValue(DAILY_GUIDES_QUEST_4_TEXT_INPUT_URL);
				break;
		}

		const previousEmbed = DailyGuidesDistribution.embed(await resolveEmbedColor(guild));
		await DailyGuides.updateQuests({ [`quest${number}`]: { content, url } });

		void client.log({
			content: `${userLogFormat(user)} manually updated quest ${number}.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed(await resolveEmbedColor(guild))],
			type: LogType.ManualDailyGuides,
		});

		await this.respond(interaction, `Successfully updated quest ${number}.`);
	}

	public async questSwap(interaction: StringSelectMenuInteraction) {
		const { client, guild, user, values } = interaction;
		const quest1 = Number(values[0]);
		const quest2 = Number(values[1]);

		if (!isQuestNumber(quest1)) {
			await interaction.reply(`Detected an unknown quest number: ${quest1}.`);
			return;
		}

		if (!isQuestNumber(quest2)) {
			await interaction.reply(`Detected an unknown quest number: ${quest2}.`);
			return;
		}

		const previousEmbed = DailyGuidesDistribution.embed(await resolveEmbedColor(guild));

		await DailyGuides.updateQuests({
			[`quest${quest1}`]: DailyGuides[`quest${quest2}`],
			[`quest${quest2}`]: DailyGuides[`quest${quest1}`],
		});

		void client.log({
			content: `${userLogFormat(user)} manually swapped quests ${quest1} & ${quest2}.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed(await resolveEmbedColor(guild))],
			type: LogType.ManualDailyGuides,
		});

		await this.respond(interaction, `Successfully swapped quests ${quest1} & ${quest2}.`);
	}

	public async dailyMessageModalResponse(interaction: ButtonInteraction) {
		const { dailyMessage } = DailyGuides;

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(
					new ActionRowBuilder<TextInputBuilder>().setComponents(
						new TextInputBuilder()
							.setCustomId(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE)
							.setLabel("The title of the daily message.")
							.setMaxLength(MAXIMUM_EMBED_FIELD_NAME_LENGTH)
							.setRequired()
							.setStyle(TextInputStyle.Short)
							.setValue(dailyMessage?.title ?? ""),
					),
					new ActionRowBuilder<TextInputBuilder>().setComponents(
						new TextInputBuilder()
							.setCustomId(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION)
							.setLabel("The description of the daily message.")
							.setMaxLength(MAXIMUM_EMBED_FIELD_VALUE_LENGTH)
							.setRequired()
							.setStyle(TextInputStyle.Paragraph)
							.setValue(dailyMessage?.description ?? ""),
					),
				)
				.setCustomId(DAILY_GUIDES_DAILY_MESSAGE_MODAL)
				.setTitle("Daily Message"),
		);
	}

	public async setDailyMessage(interaction: ModalMessageModalSubmitInteraction) {
		const { client, fields, guild, user } = interaction;
		const title = fields.getTextInputValue(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE);
		const description = fields.getTextInputValue(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION);
		const previousEmbed = DailyGuidesDistribution.embed(await resolveEmbedColor(guild));
		await DailyGuides.updateDailyMessage({ title, description });

		void client.log({
			content: `${userLogFormat(user)} manually updated the daily message.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed(await resolveEmbedColor(guild))],
			type: LogType.ManualDailyGuides,
		});

		await this.respond(interaction, "Successfully updated the daily message.");
	}

	public async treasureCandlesModalResponse(interaction: ButtonInteraction) {
		const { treasureCandles } = DailyGuides;

		await interaction.showModal(
			new ModalBuilder()
				.setComponents(
					new ActionRowBuilder<TextInputBuilder>().setComponents(
						new TextInputBuilder()
							.setCustomId(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1_4)
							.setLabel("The URL of the first batch (1-4).")
							.setRequired()
							.setStyle(TextInputStyle.Short)
							.setValue(treasureCandles?.[0] ?? ""),
					),
					new ActionRowBuilder<TextInputBuilder>().setComponents(
						new TextInputBuilder()
							.setCustomId(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_5_8)
							.setLabel("The URL of the second batch (5-8).")
							.setRequired(false)
							.setStyle(TextInputStyle.Short)
							.setValue(treasureCandles?.[1] ?? ""),
					),
				)
				.setCustomId(DAILY_GUIDES_TREASURE_CANDLES_MODAL)
				.setTitle("Treasure Candles"),
		);
	}

	public async setTreasureCandles(interaction: ModalMessageModalSubmitInteraction) {
		const { client, fields, guild, user } = interaction;
		const batch1 = fields.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1_4);
		const batch2 = fields.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_5_8);
		const treasureCandles = [batch1];
		if (batch2) treasureCandles.push(batch2);
		const previousEmbed = DailyGuidesDistribution.embed(await resolveEmbedColor(guild));
		await DailyGuides.updateTreasureCandles(treasureCandles);

		void client.log({
			content: `${userLogFormat(user)} manually updated the treasure candles.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed(await resolveEmbedColor(guild))],
			type: LogType.ManualDailyGuides,
		});

		await this.respond(interaction, "Successfully updated the treasure candles.");
	}
})();
