import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	type APIApplicationCommandAutocompleteInteraction,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitGuildInteraction,
	ActivityType,
	ApplicationCommandOptionType,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	PresenceUpdateStatus,
	TextInputStyle,
} from "@discordjs/core";
import { hash } from "hasha";
import sharp from "sharp";
import { client } from "../discord.js";
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
	APPLICATION_ID,
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
import { isChatInputCommand, resolveValidRealm, userLogFormat } from "../utility/functions.js";
import { ModalResolver } from "../utility/modal-resolver.js";
import type { OptionResolver } from "../utility/option-resolver.js";
import { log } from "./log.js";

function isQuestNumber(questNumber: number): questNumber is QuestNumber {
	return QUEST_NUMBER.includes(questNumber as QuestNumber);
}

export async function ai(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const enable = options.getBoolean("enable", true);
	await Configuration.edit({ ai: enable });

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: `AI feature set to \`${Configuration.ai}\`.`,
		flags: MessageFlags.Ephemeral,
	});
}

export async function customStatus(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const text = options.getString("text", true);

	await client.updatePresence(0, {
		activities: [{ name: text, type: ActivityType.Custom }],
		afk: false,
		since: null,
		status: PresenceUpdateStatus.Online,
	});

	await client.api.interactions.reply(interaction.id, interaction.token, {
		content: "Custom status set.",
		flags: MessageFlags.Ephemeral,
	});
}

export async function interactive(
	interaction:
		| APIChatInputApplicationCommandGuildInteraction
		| APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>
		| APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>
		| APIModalSubmitGuildInteraction,
	options?: InteractiveOptions,
) {
	const resolvedContent = options?.content ?? "";
	const resolvedLocale = options?.locale ?? interaction.locale;

	const response: APIInteractionResponseCallbackData = {
		content: resolvedContent,
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: DAILY_GUIDES_DAILY_MESSAGE_BUTTON_CUSTOM_ID,
						label: "Daily Message",
						style: ButtonStyle.Primary,
					},
					{
						type: ComponentType.Button,
						custom_id: DAILY_GUIDES_TREASURE_CANDLES_BUTTON_CUSTOM_ID,
						label: "Treasure Candles",
						style: ButtonStyle.Primary,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID,
						max_values: 2,
						min_values: 2,
						options: QUEST_OPTIONS,
						placeholder: "Swap 2 quests.",
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: DAILY_GUIDES_LOCALE_CUSTOM_ID,
						max_values: 1,
						min_values: 1,
						options: LOCALE_OPTIONS,
						placeholder: "View in a locale.",
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
						label: "Distribute",
						style: ButtonStyle.Success,
					},
				],
			},
		],
		embeds: [distributionEmbed(resolvedLocale)],
		flags: MessageFlags.Ephemeral,
	};

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else if (options?.deferred) {
		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}

export async function distribute(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { locale } = interaction;
	await client.api.interactions.deferMessageUpdate(interaction.id, interaction.token);
	await distributeDailyGuides();

	void log({
		content: `${userLogFormat(interaction.member.user)} manually distributed the daily guides.`,
		embeds: [distributionEmbed(locale)],
	});

	await interactive(interaction, { content: "Distributed daily guides.", deferred: true, locale });
}

export async function setQuestAutocomplete(
	interaction: APIApplicationCommandAutocompleteInteraction,
	options: OptionResolver,
) {
	const focused = options.getFocusedOption(ApplicationCommandOptionType.String).value.toUpperCase();

	await client.api.interactions.createAutocompleteResponse(interaction.id, interaction.token, {
		choices:
			focused === ""
				? []
				: QUESTS.filter(({ content }) => content.toUpperCase().includes(focused))
						.map(({ content }) => ({ name: content, value: content }))
						.slice(0, 25),
	});
}

export async function setQuest(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	const { locale } = interaction;

	if (options.hoistedOptions.length === 0) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
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

	void log({
		content: `${userLogFormat(interaction.member.user)} manually updated the daily quests.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: "Successfully updated the daily quests.",
		locale,
	});
}

export async function questSwap(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const {
		locale,
		data: { values },
	} = interaction;
	const quest1 = Number(values[0]);
	const quest2 = Number(values[1]);

	if (!isQuestNumber(quest1)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Detected an unknown quest number: ${quest1}.`,
		});

		return;
	}

	if (!isQuestNumber(quest2)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Detected an unknown quest number: ${quest2}.`,
		});

		return;
	}

	const previousEmbed = distributionEmbed(locale);

	await DailyGuides.updateQuests({
		[`quest${quest1}`]: DailyGuides[`quest${quest2}`],
		[`quest${quest2}`]: DailyGuides[`quest${quest1}`],
	});

	void log({
		content: `${userLogFormat(interaction.member.user)} manually swapped quests ${quest1} & ${quest2}.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: `Successfully swapped quests ${quest1} & ${quest2}.`,
		locale,
	});
}

export async function dailyMessageModalResponse(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	const { dailyMessage } = DailyGuides;

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE,
						label: "The title of the daily message.",
						max_length: MAXIMUM_EMBED_FIELD_NAME_LENGTH,
						required: true,
						style: TextInputStyle.Short,
						value: dailyMessage?.title ?? "",
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION,
						label: "The description of the daily message.",
						max_length: MAXIMUM_EMBED_FIELD_VALUE_LENGTH,
						required: true,
						style: TextInputStyle.Paragraph,
						value: dailyMessage?.description ?? "",
					},
				],
			},
		],
		custom_id: DAILY_GUIDES_DAILY_MESSAGE_MODAL,
		title: "Daily Message",
	});
}

export async function setDailyMessage(interaction: APIModalSubmitGuildInteraction) {
	const { data, locale } = interaction;
	const components = new ModalResolver(data.components);
	const title = components.getTextInputValue(DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_TITLE);

	const description = components.getTextInputValue(
		DAILY_GUIDES_DAILY_MESSAGE_TEXT_INPUT_DESCRIPTION,
	);

	const previousEmbed = distributionEmbed(locale);
	await DailyGuides.updateDailyMessage({ title, description });

	void log({
		content: `${userLogFormat(interaction.member.user)} manually updated the daily message.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: "Successfully updated the daily message.",
		locale,
	});
}

export async function treasureCandlesModalResponse(
	interaction: APIGuildInteractionWrapper<APIMessageComponentButtonInteraction>,
) {
	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		content: "",
		embeds: [],
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: DAILY_GUIDES_TREASURE_CANDLES_SELECT_MENU_CUSTOM_ID,
						max_values: 1,
						min_values: 1,
						options: VALID_REALM_NAME.map((realm) => ({ label: realm, value: realm })),
						placeholder: "Select a realm.",
					},
				],
			},
		],
	});
}

export async function treasureCandlesSelectMenuResponse(
	interaction: APIGuildInteractionWrapper<APIMessageComponentSelectMenuInteraction>,
) {
	const { treasureCandles } = DailyGuides;
	const realm = resolveValidRealm(interaction.data.values[0]!);

	if (!realm) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Detected an unknown realm: ${realm}.`,
		});

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

	await client.api.interactions.createModal(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1,
						label: "The URL of the first batch.",
						required: false,
						style: TextInputStyle.Short,
						value: batch1URL,
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.TextInput,
						custom_id: DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_2,
						label: "The URL of the second batch.",
						required: false,
						style: TextInputStyle.Short,
						value: batch2URL,
					},
				],
			},
		],
		custom_id: `${DAILY_GUIDES_TREASURE_CANDLES_MODAL}§${realm}`,
		title: "Treasure Candles",
	});
}

export async function setTreasureCandles(interaction: APIModalSubmitGuildInteraction) {
	const { data, locale } = interaction;
	const customId = data.custom_id;
	const realm = resolveValidRealm(customId.slice(customId.indexOf("§") + 1));

	if (!realm) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			content: `Detected an unknown realm: ${realm}.`,
		});

		return;
	}

	const components = new ModalResolver(data.components);
	const batch1 = components.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_1);
	const batch2 = components.getTextInputValue(DAILY_GUIDES_TREASURE_CANDLES_TEXT_INPUT_2);
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

	void log({
		content: `${userLogFormat(interaction.member.user)} manually updated the treasure candles.`,
		embeds: [previousEmbed, distributionEmbed(locale)],
	});

	await interactive(interaction, {
		content: "Successfully updated the treasure candles.",
		locale,
	});
}
