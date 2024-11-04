import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	ActionRowBuilder,
	ActivityType,
	type AutocompleteInteraction,
	ButtonBuilder,
	type ButtonInteraction,
	ButtonStyle,
	type ChatInputCommandInteraction,
	MessageFlags,
	ModalBuilder,
	type ModalMessageModalSubmitInteraction,
	StringSelectMenuBuilder,
	type StringSelectMenuInteraction,
	StringSelectMenuOptionBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { hash } from "hasha";
import sharp from "sharp";
import type { InteractiveOptions } from "../models/Admin.js";
import Configuration from "../models/Configuration.js";
import type { QuestNumber } from "../models/DailyGuides.js";
import DailyGuides, { QUESTS } from "../models/DailyGuides.js";
import S3Client from "../s3-client.js";
import {
	distribute as distributeDailyGuides,
	distributionEmbed,
} from "../services/daily-guides.js";
import {
	CDN_BUCKET,
	DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_DAILY_MESSAGE_MODAL,
	DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION,
	DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE,
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_LOCALE_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_MODAL,
	DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID,
	DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1,
	DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_2,
	LOCALE_OPTIONS,
	MAXIMUM_EMBED_FIELD_NAME_LENGTH,
	MAXIMUM_EMBED_FIELD_VALUE_LENGTH,
	QUEST_NUMBER,
	QUEST_OPTIONS,
	VALID_REALM_NAME,
} from "../utility/constants.js";
import { resolveValidRealm, userLogFormat } from "../utility/functions.js";
import { log } from "./log.js";

function isQuestNumber(questNumber: number): questNumber is QuestNumber {
	return QUEST_NUMBER.includes(questNumber as QuestNumber);
}

export async function ai(interaction: ChatInputCommandInteraction) {
	const enable = interaction.options.getBoolean("enable", true);
	await Configuration.edit({ ai: enable });

	await interaction.reply({
		content: `AI feature set to \`${Configuration.ai}\`.`,
		flags: MessageFlags.Ephemeral,
	});
}

export async function customStatus(interaction: ChatInputCommandInteraction) {
	const text = interaction.options.getString("text", true);
	interaction.client.user.setPresence({ activities: [{ name: text, type: ActivityType.Custom }] });
	await interaction.reply({ content: "Custom status set.", ephemeral: true });
}

export async function interactive(
	interaction:
		| ButtonInteraction
		| ChatInputCommandInteraction
		| ModalMessageModalSubmitInteraction
		| StringSelectMenuInteraction,
	options?: InteractiveOptions,
) {
	const resolvedContent = options?.content ?? "";
	const resolvedLocale = options?.locale ?? interaction.locale;

	const response = {
		content: resolvedContent,
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
					.setOptions(QUEST_OPTIONS)
					.setPlaceholder("Swap 2 quests."),
			),
			new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(DAILY_GUIDES_LOCALE_CUSTOM_ID)
					.setMaxValues(1)
					.setMinValues(1)
					.setOptions(LOCALE_OPTIONS)
					.setPlaceholder("View in a locale."),
			),
			new ActionRowBuilder<ButtonBuilder>().setComponents(
				new ButtonBuilder()
					.setCustomId(DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID)
					.setLabel("Distribute")
					.setStyle(ButtonStyle.Success),
			),
		],
		embeds: [distributionEmbed(resolvedLocale)],
	};

	if (interaction.isChatInputCommand()) {
		await interaction.reply({ ...response, flags: MessageFlags.Ephemeral });
	} else if (interaction.deferred) {
		await interaction.editReply(response);
	} else {
		await interaction.update(response);
	}
}

export async function distribute(interaction: ButtonInteraction) {
	const { client, locale, user } = interaction;
	await interaction.deferUpdate();
	await distributeDailyGuides(client);

	void log(client, {
		content: `${userLogFormat(user)} manually distributed the daily guides.`,
		embeds: [distributionEmbed(locale)],
	});

	await interactive(interaction, { content: "Distributed daily guides.", locale });
}

export async function setQuestAutocomplete(interaction: AutocompleteInteraction) {
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

export async function setQuest(interaction: ChatInputCommandInteraction) {
	const { client, locale, options, user } = interaction;

	if (options.data[0]!.options![0]!.options!.length === 0) {
		await interaction.reply({
			content: "At least one option must be specified.",
			flags: MessageFlags.Ephemeral,
		});

		return;
	}

	const quest1 = options.getString("quest-1") ?? DailyGuides.quest1?.content;
	const quest2 = options.getString("quest-2") ?? DailyGuides.quest2?.content;
	const quest3 = options.getString("quest-3") ?? DailyGuides.quest3?.content;
	const quest4 = options.getString("quest-4") ?? DailyGuides.quest4?.content;

	const url1 =
		options.getString("url-1") ?? QUESTS.find((quest) => quest.content === quest1)?.url ?? null;

	const url2 =
		options.getString("url-2") ?? QUESTS.find((quest) => quest.content === quest2)?.url ?? null;

	const url3 =
		options.getString("url-3") ?? QUESTS.find((quest) => quest.content === quest3)?.url ?? null;

	const url4 =
		options.getString("url-4") ?? QUESTS.find((quest) => quest.content === quest4)?.url ?? null;

	const previousEmbed = distributionEmbed(locale);

	await DailyGuides.updateQuests({
		quest1: quest1 ? { content: quest1, url: url1 } : null,
		quest2: quest2 ? { content: quest2, url: url2 } : null,
		quest3: quest3 ? { content: quest3, url: url3 } : null,
		quest4: quest4 ? { content: quest4, url: url4 } : null,
	});

	void log(client, {
		content: `${userLogFormat(user)} manually updated the daily quests.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: "Successfully updated the daily quests.",
		locale,
	});
}

export async function questSwap(interaction: StringSelectMenuInteraction) {
	const { client, locale, user, values } = interaction;
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

	const previousEmbed = distributionEmbed(locale);

	await DailyGuides.updateQuests({
		[`quest${quest1}`]: DailyGuides[`quest${quest2}`],
		[`quest${quest2}`]: DailyGuides[`quest${quest1}`],
	});

	void log(client, {
		content: `${userLogFormat(user)} manually swapped quests ${quest1} & ${quest2}.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: `Successfully swapped quests ${quest1} & ${quest2}.`,
		locale,
	});
}

export async function dailyMessageModalResponse(interaction: ButtonInteraction) {
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

export async function setDailyMessage(interaction: ModalMessageModalSubmitInteraction) {
	const { client, locale, fields, user } = interaction;
	const title = fields.getTextInputValue(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE);
	const description = fields.getTextInputValue(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION);
	const previousEmbed = distributionEmbed(locale);
	await DailyGuides.updateDailyMessage({ title, description });

	void log(client, {
		content: `${userLogFormat(user)} manually updated the daily message.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: "Successfully updated the daily message.",
		locale,
	});
}

export async function treasureCandlesModalResponse(interaction: ButtonInteraction) {
	await interaction.update({
		content: "",
		embeds: [],
		components: [
			new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
				new StringSelectMenuBuilder()
					.setCustomId(DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID)
					.setMaxValues(1)
					.setMinValues(1)
					.setOptions(
						VALID_REALM_NAME.map((realm) =>
							new StringSelectMenuOptionBuilder().setLabel(realm).setValue(realm),
						),
					)
					.setPlaceholder("Select a realm."),
			),
		],
	});
}

export async function treasureCandlesSelectMenuResponse(interaction: StringSelectMenuInteraction) {
	const { treasureCandles } = DailyGuides;
	const realm = resolveValidRealm(interaction.values[0]!);

	if (!realm) {
		await interaction.reply(`Detected an unknown realm: ${realm}.`);
		return;
	}

	const batch1 = treasureCandles?.[realm][0];
	const batch2 = treasureCandles?.[realm][1];
	let batch1URL = "";
	let batch2URL = "";

	if (batch1) {
		batch1URL = DailyGuides.treasureCandlesURL(batch1);
	}

	if (batch2) {
		batch2URL = DailyGuides.treasureCandlesURL(batch2);
	}

	await interaction.showModal(
		new ModalBuilder()
			.setComponents(
				new ActionRowBuilder<TextInputBuilder>().setComponents(
					new TextInputBuilder()
						.setCustomId(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1)
						.setLabel("The URL of the first batch.")
						.setRequired(false)
						.setStyle(TextInputStyle.Short)
						.setValue(batch1URL),
				),
				new ActionRowBuilder<TextInputBuilder>().setComponents(
					new TextInputBuilder()
						.setCustomId(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_2)
						.setLabel("The URL of the second batch.")
						.setRequired(false)
						.setStyle(TextInputStyle.Short)
						.setValue(batch2URL),
				),
			)
			.setCustomId(`${DAILY_GUIDES_TREASURE_CANDLES_MODAL}§${realm}`)
			.setTitle("Treasure Candles"),
	);
}

export async function setTreasureCandles(interaction: ModalMessageModalSubmitInteraction) {
	const { client, customId, locale, fields, user } = interaction;
	const realm = resolveValidRealm(customId.slice(customId.indexOf("§") + 1));

	if (!realm) {
		await interaction.reply(`Detected an unknown realm: ${realm}.`);
		return;
	}

	const batch1 = fields.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1);
	const batch2 = fields.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_2);
	const treasureCandles = [];

	if (batch1) {
		treasureCandles.push(batch1);
	}

	if (batch2) {
		treasureCandles.push(batch2);
	}

	const previousEmbed = distributionEmbed(locale);

	const hashes = await Promise.all(
		treasureCandles.map(async (url) => {
			const fetchedURL = await fetch(url);

			const buffer = await sharp(await fetchedURL.arrayBuffer())
				.webp()
				.toBuffer();

			const hashedBuffer = await hash(buffer, { algorithm: "md5" });

			await S3Client.send(
				new PutObjectCommand({
					Bucket: CDN_BUCKET,
					Key: DailyGuides.treasureCandlesRoute(hashedBuffer),
					Body: buffer,
					ContentDisposition: "inline",
					ContentType: fetchedURL.headers.get("content-type")!,
				}),
			);

			return hashedBuffer;
		}),
	);

	await DailyGuides.updateTreasureCandles({ [realm]: hashes });

	void log(client, {
		content: `${userLogFormat(user)} manually updated the treasure candles.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: "Successfully updated the treasure candles.",
		locale,
	});
}
