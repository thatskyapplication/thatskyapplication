import {
	type APIActionRowComponent,
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APISelectMenuComponent,
	type APISelectMenuOption,
	ButtonStyle,
	ComponentType,
	Locale,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import { shardEruption, skyNow, skyToday, TIME_ZONE } from "@thatskyapplication/utility";
import { t } from "i18next";
import { DateTime } from "luxon";
import { client } from "../discord.js";
import { APPLICATION_ID, DEFAULT_EMBED_COLOUR, SHARD_ERUPTION_URL } from "../utility/constants.js";
import { isChatInputCommand } from "../utility/functions.js";
import {
	MAXIMUM_OPTION_NUMBER,
	resolveShardEruptionEmoji,
	SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS,
	SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH,
	SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
	SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID,
	shardEruptionInformationString,
	shardEruptionTimestampsString,
} from "../utility/shard-eruption.js";

function generateShardEruptionSelectMenuOptions(
	date: DateTime,
	indexStart: number,
	offset: number,
	locale: Locale,
) {
	const options = [];
	const maximumIndex = MAXIMUM_OPTION_NUMBER + indexStart;

	// https://github.com/discord/discord-api-docs/issues/7310
	const dateStyle = locale === Locale.Thai ? "long" : "full";

	for (let index = indexStart; index < maximumIndex; index++) {
		const shardNow = shardEruption(index + offset);

		const dateString = Intl.DateTimeFormat(locale, {
			timeZone: TIME_ZONE,
			dateStyle,
		}).format(date.plus({ days: index }).toMillis());

		const stringSelectMenuOption: APISelectMenuOption = {
			label: dateString,
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
	fromToday: boolean,
	offset: number,
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
		await client.api.interactions.updateMessage(interaction.id, interaction.token, {
			components: fromToday
				? todayData(interaction.locale, offset, false)
				: browseData(interaction.locale, offset, false),
			flags: MessageFlags.IsComponentsV2,
		});

		await client.api.interactions.followUp(APPLICATION_ID, interaction.token, {
			content: "This command has expired. Run it again!",
			flags: MessageFlags.Ephemeral,
		});

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
	if (await hasExpired(interaction, true, offset)) {
		return;
	}

	const components = todayData(interaction.locale, offset);

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}

export function todayData(
	locale: Locale,
	offset = 0,
	navigation = true,
): [APIMessageTopLevelComponent] {
	const shardYesterday = shardEruption(offset - 1);
	const shardToday = shardEruption(offset);
	const shard = shardEruption();
	const shardTomorrow = shardEruption(offset + 1);

	const buttonYesterday: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${SHARD_ERUPTION_BACK_BUTTON_CUSTOM_ID}§${offset - 1}`,
		label: t("shard-eruption.back", { lng: locale, ns: "features" }),
		style: ButtonStyle.Secondary,
	};

	const button: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: SHARD_ERUPTION_TODAY_BUTTON_CUSTOM_ID,
		disabled: offset === 0,
		label: t("shard-eruption.today", { lng: locale, ns: "features" }),
		style: ButtonStyle.Primary,
	};

	const buttonTomorrow: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${SHARD_ERUPTION_NEXT_BUTTON_CUSTOM_ID}§${offset + 1}`,
		label: t("shard-eruption.next", { lng: locale, ns: "features" }),
		style: ButtonStyle.Secondary,
	};

	if (shardYesterday) {
		buttonYesterday.emoji = resolveShardEruptionEmoji(shardYesterday.strong);
	}

	if (shard) {
		button.emoji = resolveShardEruptionEmoji(shard.strong);
	}

	if (shardTomorrow) {
		buttonTomorrow.emoji = resolveShardEruptionEmoji(shardTomorrow.strong);
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(skyNow().plus({ days: offset }).toMillis())}](${SHARD_ERUPTION_URL})`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	if (shardToday) {
		containerComponents.push(
			{
				type: ComponentType.TextDisplay,
				content: `${shardEruptionInformationString(shardToday, true, locale)}\n${shardEruptionTimestampsString(shardToday)}`,
			},
			{
				type: ComponentType.MediaGallery,
				items: [
					{
						media: {
							url: shardToday.url,
						},
					},
				],
			},
		);
	} else {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content:
				offset === 0
					? t("shard-eruption.no-shard-eruptions-today", { lng: locale, ns: "features" })
					: t("shard-eruption.no-shard-eruptions-not-today", { lng: locale, ns: "features" }),
		});
	}

	if (navigation) {
		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.ActionRow,
				components: [
					buttonYesterday,
					button,
					buttonTomorrow,
					{
						type: ComponentType.Button,
						custom_id: `${SHARD_ERUPTION_TODAY_TO_BROWSE_BUTTON_CUSTOM_ID}§${offset}`,
						emoji: { name: "🌐" },
						label: t("shard-eruption.browse", { lng: locale, ns: "features" }),
						style: ButtonStyle.Secondary,
					},
				],
			},
		);
	}

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: containerComponents,
		},
	];
}

export async function browse(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	offset = 0,
) {
	if (await hasExpired(interaction, false, offset)) {
		return;
	}

	const { locale } = interaction;
	const components = browseData(locale, offset, true);

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}

function browseData(locale: Locale, offset = 0, navigation = true): [APIMessageTopLevelComponent] {
	const shardToday = skyToday().plus({ days: offset });

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t("shard-eruption.browse-description", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: t("shard-eruption.browse-description", { lng: locale, ns: "features" }),
		},
		...SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS.map(
			(customId, index): APIActionRowComponent<APISelectMenuComponent> => {
				const currentIndex = MAXIMUM_OPTION_NUMBER * index;

				const placeholderStartDate = Intl.DateTimeFormat(locale, {
					timeZone: TIME_ZONE,
					dateStyle: "short",
				}).format(shardToday.plus({ days: currentIndex }).toMillis());

				const placeholderEndDate = Intl.DateTimeFormat(locale, {
					timeZone: TIME_ZONE,
					dateStyle: "short",
				}).format(shardToday.plus({ days: MAXIMUM_OPTION_NUMBER * (index + 1) - 1 }).toMillis());

				return {
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: customId,
							max_values: 1,
							min_values: 1,
							options: generateShardEruptionSelectMenuOptions(
								shardToday,
								currentIndex,
								offset,
								locale,
							),
							placeholder: `${placeholderStartDate} - ${placeholderEndDate}`,
						},
					],
				};
			},
		),
	];

	if (navigation) {
		containerComponents.push(
			{
				type: ComponentType.Separator,
				divider: true,
				spacing: SeparatorSpacingSize.Small,
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.Button,
						custom_id: `${SHARD_ERUPTION_BROWSE_BACK_BUTTON_CUSTOM_ID}§${
							offset - MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
						}`,
						label: t("shard-eruption.back", { lng: locale, ns: "features" }),
						style: ButtonStyle.Secondary,
					},
					{
						type: ComponentType.Button,
						custom_id: SHARD_ERUPTION_BROWSE_TODAY_BUTTON_CUSTOM_ID,
						disabled: offset === 0,
						label: t("shard-eruption.today", { lng: locale, ns: "features" }),
						style: ButtonStyle.Primary,
					},
					{
						type: ComponentType.Button,
						custom_id: `${SHARD_ERUPTION_BROWSE_NEXT_BUTTON_CUSTOM_ID}§${
							offset + MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_BROWSE_SELECT_MENU_CUSTOM_IDS_LENGTH
						}`,
						label: t("shard-eruption.next", { lng: locale, ns: "features" }),
						style: ButtonStyle.Secondary,
					},
				],
			},
		);
	}

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: containerComponents,
		},
	];
}
