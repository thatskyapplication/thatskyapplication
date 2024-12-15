import {
	type APIActionRowComponent,
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIEmbed,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APISelectMenuComponent,
	type APISelectMenuOption,
	ButtonStyle,
	ComponentType,
	type InteractionsAPI,
	type Locale,
	MessageFlags,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { t } from "i18next";
import { DateTime } from "luxon";
import { client } from "../discord.js";
import { APPLICATION_ID, DEFAULT_EMBED_COLOUR, SHARD_ERUPTION_URL } from "../utility/constants.js";
import { TIME_ZONE, dateRangeString, dateString, skyToday } from "../utility/dates.js";
import { isChatInputCommand } from "../utility/functions.js";
import {
	MAXIMUM_OPTION_NUMBER,
	SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH,
	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID,
	resolveShardEruptionEmoji,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";
import { shardEruption } from "../utility/wind-paths.js";

async function generateShardEruptionSelectMenuOptions(
	date: DateTime,
	indexStart: number,
	offset: number,
	locale: Locale,
) {
	const options = [];
	const maximumIndex = MAXIMUM_OPTION_NUMBER + indexStart;

	for (let index = indexStart; index < maximumIndex; index++) {
		const shardNow = await shardEruption(index + offset);

		const stringSelectMenuOption: APISelectMenuOption = {
			label: dateString(date.plus({ days: index }), locale),
			value: String(index + offset),
		};

		if (shardNow) {
			stringSelectMenuOption.emoji = resolveShardEruptionEmoji(shardNow.strong);
		} else {
			stringSelectMenuOption.description = "No shard eruption.";
		}

		options.push(stringSelectMenuOption);
	}

	return options;
}

async function hasExpired(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentInteraction,
) {
	const today = skyToday();

	if (isChatInputCommand(interaction)) {
		return false;
	}

	const { message } = interaction;
	const expiresAt = DateTime.fromMillis(DiscordSnowflake.timestampFrom(message.id), {
		zone: TIME_ZONE,
	}).endOf("day");

	if (today > expiresAt) {
		const hasEmbeds = message.embeds.length > 0;
		const expiryMessage = "This command has expired. Run it again!";

		if (hasEmbeds) {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [],
			});

			await client.api.interactions.followUp(APPLICATION_ID, interaction.token, {
				content: expiryMessage,
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await client.api.interactions.updateMessage(interaction.id, interaction.token, {
				components: [],
				content: expiryMessage,
			});
		}

		return true;
	}

	return false;
}

export async function today(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIMessageComponentSelectMenuInteraction,
	offset = 0,
) {
	if (await hasExpired(interaction)) {
		return;
	}

	const response = await todayEmbed(interaction.locale, offset);

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}

export async function todayEmbed(locale: Locale, offset = 0) {
	const [shardYesterday, shardToday, shard, shardTomorrow] = await Promise.all([
		shardEruption(offset - 1),
		shardEruption(offset),
		shardEruption(),
		shardEruption(offset + 1),
	]);

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		title: dateString(skyToday().plus({ days: offset }), locale),
		url: SHARD_ERUPTION_URL,
	};

	const buttonYesterday: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID}§${offset - 1}`,
		label: t("back", { lng: locale, ns: "general" }),
		style: ButtonStyle.Primary,
	};

	const button: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
		disabled: offset === 0,
		label: "Today",
		style: ButtonStyle.Success,
	};

	const buttonTomorrow: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID}§${offset + 1}`,
		label: t("next", { lng: locale, ns: "general" }),
		style: ButtonStyle.Primary,
	};

	if (shardYesterday) {
		buttonYesterday.emoji = resolveShardEruptionEmoji(shardYesterday.strong);
	}

	if (shardToday) {
		embed.fields = [
			{
				name: "Information",
				value: shardEruptionInformationString(shardToday, false, locale),
				inline: true,
			},
			{
				name: "Timestamps",
				value: shardEruptionTimestampsString(shardToday),
				inline: true,
			},
		];

		embed.image = { url: String(shardToday.url) };
	} else {
		embed.description = `There are no shard eruptions ${offset === 0 ? "today" : "on this day"}.`;
	}

	if (shard) {
		button.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	if (shardTomorrow) {
		buttonTomorrow.emoji = resolveShardEruptionEmoji(shardTomorrow.strong);
	}

	return {
		components: [
			{
				type: ComponentType.ActionRow as const,
				components: [
					buttonYesterday,
					button,
					buttonTomorrow,
					{
						type: ComponentType.Button as const,
						custom_id: `${SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID}§${offset}`,
						emoji: { name: "🌐" },
						label: "Browse",
						style: ButtonStyle.Secondary as const,
					},
				],
			},
		],
		embeds: [embed],
	};
}

export async function browse(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	offset = 0,
) {
	if (await hasExpired(interaction)) {
		return;
	}

	const { locale } = interaction;
	const shardToday = skyToday().plus({ days: offset });

	const response:
		| Parameters<InteractionsAPI["reply"]>[2]
		| Parameters<InteractionsAPI["updateMessage"]>[2] = {
		components: [
			...(await Promise.all(
				SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.map(
					async (customId, index): Promise<APIActionRowComponent<APISelectMenuComponent>> => {
						const currentIndex = MAXIMUM_OPTION_NUMBER * index;

						return {
							type: ComponentType.ActionRow,
							components: [
								{
									type: ComponentType.StringSelect,
									custom_id: customId,
									max_values: 1,
									min_values: 1,
									options: await generateShardEruptionSelectMenuOptions(
										shardToday,
										currentIndex,
										offset,
										locale,
									),
									placeholder: dateRangeString(
										shardToday.plus({ days: currentIndex }),
										shardToday.plus({ days: MAXIMUM_OPTION_NUMBER * (index + 1) - 1 }),
										locale,
									),
								},
							],
						};
					},
				),
			)),
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID}§${
							offset - MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
						}`,
						label: t("back", { lng: locale, ns: "general" }),
						style: ButtonStyle.Primary,
					},
					{
						type: ComponentType.Button,
						custom_id: SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
						disabled: offset === 0,
						label: "Today",
						style: ButtonStyle.Success,
					},
					{
						type: ComponentType.Button,
						custom_id: `${SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID}§${
							offset + MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
						}`,
						label: t("next", { lng: locale, ns: "general" }),
						style: ButtonStyle.Primary,
					},
				],
			},
		],
		embeds: [],
	};

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}
