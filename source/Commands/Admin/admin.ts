import {
	type ApplicationCommandData,
	type AutocompleteInteraction,
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
import DailyGuides, { type QuestNumber, QUEST_NUMBER, QUESTS } from "../../Structures/DailyGuides.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import { MAXIMUM_EMBED_FIELD_NAME_LENGTH, MAXIMUM_EMBED_FIELD_VALUE_LENGTH } from "../../Utility/Constants.js";
import { userLogFormat } from "../../Utility/Utility.js";
import { LogType } from "../../index.js";
import type { AutocompleteCommand } from "../index.js";

export const DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID = "DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID" as const;
export const DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID = "DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID" as const;
export const DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID = "DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID" as const;
export const DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID = "DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID" as const;
export const DAILY_GUIDES_DAILY_MESSAGE_MODAL = "DAILY_GUIDES_DAILY_MESSAGE_MODAL" as const;
const DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE = "DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT" as const;
const DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION = "DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION" as const;
export const DAILY_GUIDES_TREASURE_CANDLES_MODAL = "DAILY_GUIDES_TREASURE_CANDLES_MODAL" as const;
const DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1_4 = "DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1_4" as const;
const DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_5_8 = "DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_5_8" as const;

function isQuestNumber(questNumber: number): questNumber is QuestNumber {
	return QUEST_NUMBER.includes(questNumber as QuestNumber);
}

export default new (class implements AutocompleteCommand {
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
				type: ApplicationCommandOptionType.SubcommandGroup,
				name: "daily-guides",
				description: "Edits the daily guides embed.",
				options: [
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "interactive",
						description: "Interactively edits the daily guides.",
					},
					{
						type: ApplicationCommandOptionType.Subcommand,
						name: "set-quest",
						description: "Sets a quest for the daily guides.",
						options: [
							{
								type: ApplicationCommandOptionType.Integer,
								name: "number",
								description: "The quest number.",
								required: true,
								choices: QUEST_NUMBER.map((questNumber) => ({ name: String(questNumber), value: questNumber })),
							},
							{
								type: ApplicationCommandOptionType.String,
								name: "content",
								description: "The content of the quest.",
								autocomplete: true,
								required: true,
							},
							{
								type: ApplicationCommandOptionType.String,
								name: "url",
								description: "The URL of the quest's infographic.",
								required: false,
							},
						],
					},
				],
			},
		],
		defaultMemberPermissions: 0n,
	} as const satisfies Readonly<ApplicationCommandData>;

	public readonly developer = true;

	public async autocomplete(interaction: AutocompleteInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "set-quest":
				await this.setQuestAutocomplete(interaction);
		}
	}

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { options } = interaction;

		switch (options.getSubcommandGroup() ?? options.getSubcommand()) {
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

	public async dailyGuides(interaction: ChatInputCommandInteraction) {
		switch (interaction.options.getSubcommand()) {
			case "interactive":
				await this.interactive(interaction);
				return;
			case "set-quest":
				await this.setQuest(interaction);
		}
	}

	private async interactive(
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
			embeds: [DailyGuidesDistribution.embed()],
			ephemeral: true,
		};

		if (interaction instanceof ChatInputCommandInteraction) {
			await interaction.reply(response);
		} else {
			await interaction.update(response);
		}
	}

	public async distribute(interaction: ButtonInteraction) {
		const { client, user } = interaction;
		await DailyGuidesDistribution.distribute(client);

		void client.log({
			content: `${userLogFormat(user)} manually distributed the daily guides.`,
			embeds: [DailyGuidesDistribution.embed()],
			type: LogType.ManualDailyGuides,
		});

		await this.interactive(interaction, "Distributed daily guides.");
	}

	public async setQuestAutocomplete(interaction: AutocompleteInteraction) {
		const focused = interaction.options.getFocused().toUpperCase();

		return interaction.respond(
			focused === ""
				? []
				: QUESTS.map(({ content }) => content)
						.filter((quest) => quest.toUpperCase().includes(focused))
						.map((quest) => ({ name: quest, value: quest }))
						.slice(0, 25),
		);
	}

	public async setQuest(interaction: ChatInputCommandInteraction) {
		const { client, options, user } = interaction;
		const number = options.getInteger("number", true);
		const content = options.getString("content", true);
		const url = options.getString("url") ?? QUESTS.find((quest) => quest.content === content)?.url ?? null;

		if (!isQuestNumber(number)) {
			await interaction.reply(`Detected an unknown quest number: ${number}.`);
			return;
		}

		const previousEmbed = DailyGuidesDistribution.embed();
		await DailyGuides.updateQuests({ [`quest${number}`]: { content, url } });

		void client.log({
			content: `${userLogFormat(user)} manually updated quest ${number}.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed()],
			type: LogType.ManualDailyGuides,
		});

		await this.interactive(interaction, `Successfully updated quest ${number}.`);
	}

	public async questSwap(interaction: StringSelectMenuInteraction) {
		const { client, user, values } = interaction;
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

		const previousEmbed = DailyGuidesDistribution.embed();

		await DailyGuides.updateQuests({
			[`quest${quest1}`]: DailyGuides[`quest${quest2}`],
			[`quest${quest2}`]: DailyGuides[`quest${quest1}`],
		});

		void client.log({
			content: `${userLogFormat(user)} manually swapped quests ${quest1} & ${quest2}.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed()],
			type: LogType.ManualDailyGuides,
		});

		await this.interactive(interaction, `Successfully swapped quests ${quest1} & ${quest2}.`);
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
		const { client, fields, user } = interaction;
		const title = fields.getTextInputValue(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE);
		const description = fields.getTextInputValue(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION);
		const previousEmbed = DailyGuidesDistribution.embed();
		await DailyGuides.updateDailyMessage({ title, description });

		void client.log({
			content: `${userLogFormat(user)} manually updated the daily message.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed()],
			type: LogType.ManualDailyGuides,
		});

		await this.interactive(interaction, "Successfully updated the daily message.");
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
		const { client, fields, user } = interaction;
		const batch1 = fields.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1_4);
		const batch2 = fields.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_5_8);
		const treasureCandles = [batch1];
		if (batch2) treasureCandles.push(batch2);
		const previousEmbed = DailyGuidesDistribution.embed();
		await DailyGuides.updateTreasureCandles(treasureCandles);

		void client.log({
			content: `${userLogFormat(user)} manually updated the treasure candles.`,
			embeds: [previousEmbed, DailyGuidesDistribution.embed()],
			type: LogType.ManualDailyGuides,
		});

		await this.interactive(interaction, "Successfully updated the treasure candles.");
	}
})();
