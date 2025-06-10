import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
	ActivityType,
	type APIChatInputApplicationCommandGuildInteraction,
	type APIGuildInteractionWrapper,
	type APIInteractionResponseCallbackData,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIModalSubmitGuildInteraction,
	ButtonStyle,
	ComponentType,
	MessageFlags,
	PresenceUpdateStatus,
} from "@discordjs/core";
import { isDailyQuest } from "@thatskyapplication/utility";
import { hash } from "hasha";
import sharp from "sharp";
import { client } from "../discord.js";
import { distribute as distributeDailyGuides, distributionData } from "../features/daily-guides.js";
import type { InteractiveOptions } from "../models/Admin.js";
import Configuration from "../models/Configuration.js";
import type { QuestNumber } from "../models/DailyGuides.js";
import DailyGuides from "../models/DailyGuides.js";
import S3Client from "../s3-client.js";
import {
	APPLICATION_ID,
	CDN_BUCKET,
	DAILY_GUIDES_DISTRIBUTE_BUTTON_CUSTOM_ID,
	DAILY_GUIDES_LOCALE_CUSTOM_ID,
	DAILY_GUIDES_QUESTS_SWAP_SELECT_MENU_CUSTOM_ID,
	DailyQuestToInfographicURL,
	LOCALE_OPTIONS,
	QUEST_NUMBER,
	QUEST_OPTIONS,
} from "../utility/constants.js";
import { isChatInputCommand } from "../utility/functions.js";
import type { OptionResolver } from "../utility/option-resolver.js";

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
		activities: [{ type: ActivityType.Custom, name: text, state: text }],
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
	const resolvedLocale = options?.locale ?? interaction.locale;

	const response: APIInteractionResponseCallbackData = {
		components: [
			...distributionData(resolvedLocale),
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
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (options?.deferred) {
		await client.api.interactions.editReply(APPLICATION_ID, interaction.token, response);
	} else if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
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
	await interactive(interaction, { deferred: true, locale });
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

	const quest1 = options.getInteger("quest-1") ?? DailyGuides.quest1?.id;
	const quest2 = options.getInteger("quest-2") ?? DailyGuides.quest2?.id;
	const quest3 = options.getInteger("quest-3") ?? DailyGuides.quest3?.id;
	const quest4 = options.getInteger("quest-4") ?? DailyGuides.quest4?.id;

	const url1 =
		options.getString("url-1") ??
		(quest1 !== undefined && isDailyQuest(quest1) ? DailyQuestToInfographicURL[quest1] : null);

	const url2 =
		options.getString("url-2") ??
		(quest2 !== undefined && isDailyQuest(quest2) ? DailyQuestToInfographicURL[quest2] : null);

	const url3 =
		options.getString("url-3") ??
		(quest3 !== undefined && isDailyQuest(quest3) ? DailyQuestToInfographicURL[quest3] : null);

	const url4 =
		options.getString("url-4") ??
		(quest4 !== undefined && isDailyQuest(quest4) ? DailyQuestToInfographicURL[quest4] : null);

	await DailyGuides.updateQuests({
		quest1: quest1 !== undefined ? { id: quest1, url: url1 } : null,
		quest2: quest2 !== undefined ? { id: quest2, url: url2 } : null,
		quest3: quest3 !== undefined ? { id: quest3, url: url3 } : null,
		quest4: quest4 !== undefined ? { id: quest4, url: url4 } : null,
	});

	await interactive(interaction, { locale });
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

	await DailyGuides.updateQuests({
		[`quest${quest1}`]: DailyGuides[`quest${quest2}`],
		[`quest${quest2}`]: DailyGuides[`quest${quest1}`],
	});

	await interactive(interaction, { locale });
}

export async function setTravellingRock(
	interaction: APIChatInputApplicationCommandGuildInteraction,
	options: OptionResolver,
) {
	await client.api.interactions.defer(interaction.id, interaction.token, {
		flags: MessageFlags.Ephemeral,
	});

	const { locale } = interaction;
	const attachment = options.getAttachment("attachment", true);
	const fetchedURL = await fetch(attachment.url);

	const buffer = await sharp(await fetchedURL.arrayBuffer())
		.webp()
		.toBuffer();

	const hashedBuffer = await hash(buffer, { algorithm: "md5" });

	await S3Client.send(
		new PutObjectCommand({
			Bucket: CDN_BUCKET,
			Key: `daily_guides/travelling_rocks/${hashedBuffer}.webp`,
			Body: buffer,
			ContentDisposition: "inline",
			ContentType: fetchedURL.headers.get("content-type")!,
		}),
	);

	await DailyGuides.updateTravellingRock(hashedBuffer);

	await interactive(interaction, { deferred: true, locale });
}
