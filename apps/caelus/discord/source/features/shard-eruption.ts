import {
	type APIActionRowComponent,
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
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
import { shardEruption, skyNow, skyToday, TIME_ZONE } from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { client } from "../discord.js";
import { SHARD_ERUPTION_URL } from "../utility/constants.js";
import { CustomId, SHARD_ERUPTION_DATES } from "../utility/custom-id.js";
import { isChatInputCommand } from "../utility/functions.js";
import {
	MAXIMUM_OPTION_NUMBER,
	resolveShardEruptionEmoji,
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
			stringSelectMenuOption.description = t("shard-eruption.browse-no-shard", {
				lng: locale,
				ns: "features",
			});
		}

		options.push(stringSelectMenuOption);
	}

	return options;
}

interface ShardEruptionTodayOptions {
	offset?: number;
	ephemeral?: boolean | undefined;
	newMessage?: boolean;
}

export async function today(
	interaction:
		| APIChatInputApplicationCommandInteraction
		| APIMessageComponentButtonInteraction
		| APIMessageComponentSelectMenuInteraction,
	{ offset = 0, ephemeral, newMessage }: ShardEruptionTodayOptions = {},
) {
	const components = todayData(interaction.locale, offset);
	let flags = MessageFlags.IsComponentsV2;

	if (ephemeral) {
		flags |= MessageFlags.Ephemeral;
	}

	if (newMessage) {
		await client.api.interactions.reply(interaction.id, interaction.token, { components, flags });
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}

function todayData(locale: Locale, offset = 0, navigation = true): [APIMessageTopLevelComponent] {
	const shardYesterday = shardEruption(offset - 1);
	const shardToday = shardEruption(offset);
	const shard = shardEruption();
	const shardTomorrow = shardEruption(offset + 1);

	const buttonYesterday: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${CustomId.ShardEruptionTodayBack}§${offset - 1}`,
		label: t("navigation-back", { lng: locale, ns: "general" }),
		style: ButtonStyle.Secondary,
	};

	const button: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: CustomId.ShardEruptionTodayToday,
		label: t("shard-eruption.today", { lng: locale, ns: "features" }),
		style: ButtonStyle.Primary,
	};

	const buttonTomorrow: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${CustomId.ShardEruptionTodayNext}§${offset + 1}`,
		label: t("navigation-next", { lng: locale, ns: "general" }),
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

	const now = skyNow();

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, dateStyle: "full" }).format(now.plus({ days: offset }).toMillis())}](${SHARD_ERUPTION_URL})`,
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
				content: `${shardEruptionInformationString(shardToday, true, locale)}\n${shardEruptionTimestampsString({ timestamps: shardToday.timestamps, locale, now })}`,
			},
			{
				type: ComponentType.MediaGallery,
				items: [{ media: { url: shardToday.url } }],
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
						custom_id: `${CustomId.ShardEruptionBrowse}§${offset}`,
						emoji: { name: "🌐" },
						label: t("shard-eruption.browse", { lng: locale, ns: "features" }),
						style: ButtonStyle.Secondary,
					},
				],
			},
		);
	}

	return [{ type: ComponentType.Container, components: containerComponents }];
}

export async function browse(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
	offset = 0,
) {
	const { locale } = interaction;
	const components = browseData(locale, offset);

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components,
			flags: MessageFlags.IsComponentsV2,
		});
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, { components });
	}
}

function browseData(locale: Locale, offset = 0): [APIMessageTopLevelComponent] {
	const shardToday = skyToday().plus({ days: offset });

	return [
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `## ${t("shard-eruption.name-plural", { lng: locale, ns: "features" })}`,
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
				...SHARD_ERUPTION_DATES.map(
					(customId, index): APIActionRowComponent<APISelectMenuComponent> => {
						const currentIndex = MAXIMUM_OPTION_NUMBER * index;

						const placeholderStartDate = Intl.DateTimeFormat(locale, {
							timeZone: TIME_ZONE,
							dateStyle: "short",
						}).format(shardToday.plus({ days: currentIndex }).toMillis());

						const placeholderEndDate = Intl.DateTimeFormat(locale, {
							timeZone: TIME_ZONE,
							dateStyle: "short",
						}).format(
							shardToday.plus({ days: MAXIMUM_OPTION_NUMBER * (index + 1) - 1 }).toMillis(),
						);

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
									placeholder: t("time-range", {
										lng: locale,
										ns: "general",
										start: placeholderStartDate,
										end: placeholderEndDate,
									}),
								},
							],
						};
					},
				),
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
							custom_id: `${CustomId.ShardEruptionBrowseBack}§${
								offset - MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_DATES.length
							}`,
							label: t("navigation-back", { lng: locale, ns: "general" }),
							style: ButtonStyle.Secondary,
						},
						{
							type: ComponentType.Button,
							custom_id: CustomId.ShardEruptionBrowseToday,
							label: t("shard-eruption.today", { lng: locale, ns: "features" }),
							style: ButtonStyle.Primary,
						},
						{
							type: ComponentType.Button,
							custom_id: `${CustomId.ShardEruptionBrowseNext}§${
								offset + MAXIMUM_OPTION_NUMBER * SHARD_ERUPTION_DATES.length
							}`,
							label: t("navigation-next", { lng: locale, ns: "general" }),
							style: ButtonStyle.Secondary,
						},
					],
				},
			],
		},
	];
}
