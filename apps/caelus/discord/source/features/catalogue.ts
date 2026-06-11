import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIComponentInMessageActionRow,
	type APIContainerComponent,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentEmoji,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	type APISelectMenuOption,
	ButtonStyle,
	ComponentType,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import { DiscordSnowflake } from "@sapphire/snowflake";
import {
	type CataloguePacket,
	CLOTHING_SHOP,
	type CostEntry,
	catalogueComplete,
	catalogueEventItems,
	catalogueItems,
	cataloguePercentage,
	catalogueProgress,
	catalogueSeasonItems,
	catalogueSpiritItems,
	ELDER_SPIRITS,
	type ElderSpirit,
	type Event,
	type EventIds,
	formatEmoji,
	friendshipTreeToItems,
	type GuideSpirit,
	type Item,
	isRealm,
	NESTING_WORKSHOP,
	partitionItemCosts,
	REALMS,
	type RealmName,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	SECRET_AREA,
	type SeasonalSpirit,
	type SeasonIds,
	type SpiritIds,
	STANDARD_SPIRITS,
	STARTER_PACKS,
	type StandardSpirit,
	skyCurrentEvents,
	skyCurrentSeason,
	skyEvents,
	skyNow,
	skySeasons,
	spirits,
	sumCosts,
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { client } from "../discord.js";
import pg from "../pg.js";
import {
	CatalogueType,
	itemToSelectMenuOption,
	resolveCostToString,
} from "../utility/catalogue.js";
import {
	CATALOGUE_MAXIMUM_EVENTS_DISPLAY_LIMIT,
	CATALOGUE_MAXIMUM_SEASONS_DISPLAY_LIMIT,
	MAXIMUM_TEXT_DISPLAY_LENGTH,
} from "../utility/constants.js";
import { CustomId } from "../utility/custom-id.js";
import {
	CosmeticToEmoji,
	CUSTOM_EMOJI_REPLACEMENTS,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import {
	interactionInvoker,
	isButton,
	isChatInputCommand,
	resolveStringSelectMenu,
} from "../utility/functions.js";

const CATALOGUE_MAXIMUM_OPTIONS_LIMIT = 25 as const;

function backToStartButton(locale: Locale): APIButtonComponentWithCustomId {
	return {
		type: ComponentType.Button,
		// This custom id must differ to avoid duplicate custom ids.
		custom_id: CustomId.CatalogueBackToStart,
		emoji: { name: "⏮️" },
		label: t("catalogue.back-to-start-button-label", { lng: locale, ns: "features" }),
		style: ButtonStyle.Secondary,
	};
}

function progress(locale: Locale, offer: readonly Item[], data: ReadonlySet<number> = new Set()) {
	const offerDescription = [];
	const owned = [];
	const unowned = [];

	for (const { translation, cosmetics, regularHeart } of offer) {
		const emojis = regularHeart
			? [formatEmoji(MISCELLANEOUS_EMOJIS.Heart)]
			: cosmetics.map((cosmetic) => {
					const emoji = CosmeticToEmoji[cosmetic];

					return emoji
						? formatEmoji(emoji)
						: t(translation.key, {
								lng: locale,
								ns: "general",
								number: translation.number,
							});
				});

		if (cosmetics.every((cosmetic) => data.has(cosmetic))) {
			owned.push(...emojis);
		} else {
			unowned.push(...emojis);
		}
	}

	if (owned.length > 0) {
		offerDescription.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} ${owned.join(" ")}`);
	}

	if (unowned.length > 0) {
		offerDescription.push(`${formatEmoji(MISCELLANEOUS_EMOJIS.No)} ${unowned.join(" ")}`);
	}

	const remainingCosts = partitionItemCosts(offer, data).remaining;
	const resolvedRemainingCurrency = resolveCostToString(sumCosts(remainingCosts), locale);

	if (resolvedRemainingCurrency.length > 0) {
		offerDescription.push(`${resolvedRemainingCurrency.join("")}`);
	}

	return { remainingCosts, offerDescription };
}

interface OfferDataOptions {
	data: ReadonlySet<number> | undefined;
	spirits?: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[];
	events?: readonly Event[];
	items?: readonly Item[];
	locale: Locale;
	limit: number;
	includePercentage: boolean;
	includeTotalRemainingCurrency?: boolean;
	includeTitles?: boolean;
}

function offerData({
	data = new Set(),
	spirits = [],
	events = [],
	items = [],
	locale,
	limit,
	includePercentage,
	includeTotalRemainingCurrency = false,
	includeTitles = false,
}: OfferDataOptions) {
	const offerProgress = {
		spirits: new Collection<SpiritIds, string>(),
		events: new Collection<EventIds, string>(),
	};

	let hasEverything = true;
	const remainingCurrencies = [];
	let remainingCurrency = null;

	for (const spirit of spirits) {
		const items = catalogueSpiritItems([spirit]);

		if (items.length === 0) {
			continue;
		}

		const { remainingCosts, offerDescription } = progress(locale, items, data);

		if (includeTotalRemainingCurrency) {
			remainingCurrencies.push(...remainingCosts);
		}

		const percentage = cataloguePercentage(catalogueProgress(items, data));

		if (percentage !== null && percentage !== 100) {
			hasEverything = false;
		}

		offerProgress.spirits.set(
			spirit.id,
			`${
				includeTitles
					? `### ${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}${includePercentage ? (percentage === null ? "" : ` (${percentage}%)`) : ""}\n\n`
					: ""
			}${offerDescription.join("\n")}`,
		);
	}

	for (const event of events) {
		const { remainingCosts, offerDescription } = progress(locale, event.offer, data);

		if (includeTotalRemainingCurrency) {
			remainingCurrencies.push(...remainingCosts);
		}

		const percentage = cataloguePercentage(catalogueProgress(event.offer, data));

		if (percentage !== null && percentage !== 100) {
			hasEverything = false;
		}

		let content = "";

		if (includeTitles) {
			content = `### ${t(event.name, { lng: locale, ns: "general" })}`;

			if (includePercentage) {
				content += percentage === null ? "" : ` (${percentage}%)`;
			}

			content += `\n\n-# ${t("time-range", { lng: locale, ns: "general", start: `<t:${event.start.toUnixInteger()}:s>`, end: `<t:${event.end.toUnixInteger()}:s>` })}`;
			content += `\n${offerDescription.length > 0 ? offerDescription.join("\n") : `-# ${t("catalogue.event-no-cosmetics", { lng: locale, ns: "features" })}`}`;
		}

		offerProgress.events.set(event.id, content);
	}

	const { remainingCosts: itemsRemainingCosts, offerDescription: itemsOfferProgress } = progress(
		locale,
		items,
		data,
	);

	if (includeTotalRemainingCurrency) {
		remainingCurrencies.push(...itemsRemainingCosts);
	}

	const itemsPercentage = cataloguePercentage(catalogueProgress(items, data));

	if (itemsPercentage !== null && itemsPercentage !== 100) {
		hasEverything = false;
	}

	if (remainingCurrencies.length > 0) {
		const totalRemainingCurrency = resolveCostToString(sumCosts(remainingCurrencies), locale);

		if (totalRemainingCurrency.length > 0) {
			remainingCurrency = `### ${t("catalogue.remaining-currency", { lng: locale, ns: "features" })}\n\n${totalRemainingCurrency.join("")}`;
		}
	}

	const itemsOfferProgressText =
		itemsOfferProgress.length > 0
			? `### ${t("catalogue.items", { lng: locale, ns: "features" })}\n\n${itemsOfferProgress.join("\n")}`
			: null;

	const computedLimit = remainingCurrency
		? limit - remainingCurrency.length - (itemsOfferProgressText?.length ?? 0)
		: limit;

	// If the text exceeds the limit, replace some emojis.
	// Only handles spirits and events for now.
	if (offerProgressTotalCharacters(offerProgress) > computedLimit) {
		outer: for (const { from, to } of CUSTOM_EMOJI_REPLACEMENTS) {
			for (const collection of [offerProgress.spirits, offerProgress.events]) {
				for (const [id, text] of collection) {
					collection.set(id, text.replaceAll(from, to));

					if (offerProgressTotalCharacters(offerProgress) <= computedLimit) {
						break outer;
					}
				}
			}
		}
	}

	return {
		remainingCurrency,
		offerProgress,
		itemsOfferProgress: itemsOfferProgressText,
		hasEverything,
	};
}

function offerProgressTotalCharacters(offerProgress: {
	spirits: ReadonlyCollection<SpiritIds, string>;
	events: ReadonlyCollection<EventIds, string>;
}) {
	return (
		offerProgress.spirits.reduce((total, text) => total + text.length, 0) +
		offerProgress.events.reduce((total, text) => total + text.length, 0)
	);
}

export async function fetchCatalogue(userId: Snowflake) {
	const catalogue = await pg<CataloguePacket>(Table.Catalogue).where({ user_id: userId }).first();
	return catalogue ? { ...catalogue, data: new Set(catalogue.data) } : null;
}

interface CatalogueStartOptions {
	userId: Snowflake;
	locale: Locale;
}

async function start({
	userId,
	locale,
}: CatalogueStartOptions): Promise<APIMessageTopLevelComponent[]> {
	const catalogue = await fetchCatalogue(userId);
	const data = catalogue?.data;
	const percentage = (items: readonly Item[]) =>
		cataloguePercentage(catalogueProgress(items, data));
	const standardProgress = percentage(catalogueSpiritItems(STANDARD_SPIRITS.values()));
	const elderProgress = percentage(catalogueSpiritItems(ELDER_SPIRITS.values()));
	const seasonalProgress = percentage(catalogueSeasonItems(skySeasons().values()));
	const eventProgressResult = percentage(catalogueEventItems(skyEvents().values()));
	const starterPackProgressResult = percentage(STARTER_PACKS.items);
	const secretAreaProgressResult = percentage(SECRET_AREA.items);
	const clothingShopProgressResult = percentage(CLOTHING_SHOP.items);
	const nestingWorkshopProgressResult = percentage(NESTING_WORKSHOP.items);
	const now = skyNow();
	const currentSeason = skyCurrentSeason(now);
	const events = skyCurrentEvents(now);
	const currentTravellingSpirit = resolveTravellingSpirit(now);
	const currentReturningSpirits = resolveReturningSpirits(now);

	const currentSeasonButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: currentSeason
			? `${CustomId.CatalogueViewSeason}§${currentSeason.id}`
			: // This would not happen, but it's here to satisfy the API.
				CustomId.CatalogueViewSeasons,
		disabled: !currentSeason,
		label: currentSeason
			? t(`seasons.${currentSeason.id}`, { lng: locale, ns: "general" })
			: t("season", { lng: locale, ns: "general" }),
		style: currentSeason ? ButtonStyle.Success : ButtonStyle.Secondary,
	};

	const seasonEmoji = currentSeason && SeasonIdToSeasonalEmoji[currentSeason.id];

	if (seasonEmoji) {
		currentSeasonButton.emoji = seasonEmoji;
	}

	const currentEventButtons: APIButtonComponentWithCustomId[] =
		events.size === 0
			? [
					{
						type: ComponentType.Button,
						style: ButtonStyle.Secondary,
						// This would not happen, but it's here to satisfy the API.
						custom_id: CustomId.CatalogueViewEvent,
						label: t("event", { lng: locale, ns: "general" }),
						disabled: true,
					},
				]
			: events.reduce<APIButtonComponentWithCustomId[]>((buttons, event) => {
					const button: APIButtonComponentWithCustomId = {
						type: ComponentType.Button,
						style: ButtonStyle.Success,
						custom_id: `${CustomId.CatalogueViewEvent}§${event.id}`,
						label: t(event.name, { lng: locale, ns: "general" }),
					};

					const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

					if (eventTicketEmoji) {
						button.emoji = eventTicketEmoji;
					}

					buttons.push(button);
					return buttons;
				}, []);

	const currentTravellingSpiritButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: currentTravellingSpirit
			? `${CustomId.CatalogueViewSpirit}§${currentTravellingSpirit.id}`
			: // This would not happen, but it's here to satisfy the API.
				`${CustomId.CatalogueViewStart}-travelling`,

		disabled: !currentTravellingSpirit,
		label: t("catalogue.travelling-spirit", { lng: locale, ns: "features" }),
		style: currentTravellingSpirit ? ButtonStyle.Success : ButtonStyle.Secondary,
	};

	const travellingSpiritSeasonEmoji =
		currentTravellingSpirit && SeasonIdToSeasonalEmoji[currentTravellingSpirit.seasonId];

	if (travellingSpiritSeasonEmoji) {
		currentTravellingSpiritButton.emoji = travellingSpiritSeasonEmoji;
	}

	const currentReturningSpiritsButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: currentReturningSpirits
			? CustomId.CatalogueViewReturningSpirits
			: // This would not happen, but it's here to satisfy the API.
				`${CustomId.CatalogueViewStart}-returning`,
		disabled: !currentReturningSpirits,
		label: t("catalogue.returning-spirits", { lng: locale, ns: "features" }),
		style: currentReturningSpirits ? ButtonStyle.Success : ButtonStyle.Secondary,
	};

	if (
		currentReturningSpirits?.every(
			(returningSpirit) => returningSpirit.seasonId === currentReturningSpirits.first()!.seasonId,
		)
	) {
		const returningSpiritSeasonEmoji =
			SeasonIdToSeasonalEmoji[currentReturningSpirits.first()!.seasonId];

		if (returningSpiritSeasonEmoji) {
			currentReturningSpiritsButton.emoji = returningSpiritSeasonEmoji;
		}
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## ${t("catalogue.main-title", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Secondary,
				custom_id: CustomId.CatalogueSettings,
				emoji: MISCELLANEOUS_EMOJIS.Settings,
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.main-description", { lng: locale, ns: "features", progress: percentage(catalogueItems()) })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: CustomId.CatalogueViewRealms,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.standard-spirits", { lng: locale, ns: "features" })}\n\n${standardProgress === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: standardProgress })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: CustomId.CatalogueViewElders,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.elders", { lng: locale, ns: "features" })}\n\n${elderProgress === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: elderProgress })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CustomId.CatalogueViewSeasons}§1`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("season-plural", { lng: locale, ns: "general" })}\n\n${seasonalProgress === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: seasonalProgress })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CustomId.CatalogueViewEvents}§1`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.events", { lng: locale, ns: "features" })}\n\n${eventProgressResult === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: eventProgressResult })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: CustomId.CatalogueViewStarterPacks,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.starter-packs", { lng: locale, ns: "features" })}\n\n${starterPackProgressResult === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: starterPackProgressResult })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: CustomId.CatalogueViewSecretArea,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.secret-area", { lng: locale, ns: "features" })}\n\n${secretAreaProgressResult === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: secretAreaProgressResult })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: CustomId.CatalogueViewClothingShop,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.clothing-shop", { lng: locale, ns: "features" })}\n\n${clothingShopProgressResult === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: clothingShopProgressResult })}`,
				},
			],
		},
		{
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: CustomId.CatalogueViewNestingWorkshop,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.nesting-workshop", { lng: locale, ns: "features" })}\n\n${nestingWorkshopProgressResult === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: nestingWorkshopProgressResult })}`,
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: CustomId.CatalogueViewTotalSpent,
					label: t("catalogue.total-spent", { lng: locale, ns: "features" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	];

	return [
		{
			type: ComponentType.Container,
			components: containerComponents,
		},
		{
			type: ComponentType.Container,
			components: [
				{
					type: ComponentType.ActionRow,
					// Limit the potential current event buttons to 4 to not exceed the limit.
					components: [currentSeasonButton, ...currentEventButtons.slice(0, 4)],
				},
				{
					type: ComponentType.ActionRow,
					components: [currentTravellingSpiritButton, currentReturningSpiritsButton],
				},
			],
		},
	];
}

export async function viewStart(
	interaction: APIChatInputApplicationCommandInteraction | APIMessageComponentButtonInteraction,
) {
	const response = {
		components: await start({
			userId: interactionInvoker(interaction).id,
			locale: interaction.locale,
		}),
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	};

	if (isChatInputCommand(interaction)) {
		await client.api.interactions.reply(interaction.id, interaction.token, response);
	} else {
		await client.api.interactions.updateMessage(interaction.id, interaction.token, response);
	}
}

export async function viewSettings(interaction: APIMessageComponentButtonInteraction) {
	const { locale } = interaction;

	const catalogue = await pg<CataloguePacket>(Table.Catalogue)
		.select("show_everything_button")
		.where({ user_id: interactionInvoker(interaction).id })
		.first();

	const everythingSetting: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: catalogue?.show_everything_button ? ButtonStyle.Danger : ButtonStyle.Success,
		custom_id: `${CustomId.CatalogueSettingsEverything}§${Number(catalogue?.show_everything_button ?? true)}`,
		label: catalogue?.show_everything_button
			? t("catalogue.settings-button-label-disable", { lng: locale, ns: "features" })
			: t("catalogue.settings-button-label-enable", { lng: locale, ns: "features" }),
	};

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("catalogue.settings-title", { lng: locale, ns: "features" }),
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.Section,
						accessory: everythingSetting,
						components: [
							{
								type: ComponentType.TextDisplay,
								content: t("catalogue.settings-everything", { lng: locale, ns: "features" }),
							},
						],
					},
				],
			},
			traversalContainer({ locale, navigationBackCustomId: CustomId.CatalogueViewStart }),
		],
	});
}

function markdownTable(header: readonly string[], rows: readonly (readonly string[])[]) {
	const widths = header.map((cell, index) =>
		Math.max(3, cell.length, ...rows.map((row) => row[index]!.length)),
	);

	const renderRow = (row: readonly string[]) =>
		`| ${row.map((cell, index) => cell.padEnd(widths[index]!)).join(" | ")} |`;

	return [
		renderRow(header),
		`| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`,
		...rows.map((row) => renderRow(row)),
	].join("\n");
}

export async function viewTotalSpent(interaction: APIMessageComponentButtonInteraction) {
	const { locale } = interaction;
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const spentCosts = sumCosts(partitionItemCosts(catalogueItems(), catalogue?.data).obtained);
	const standardEntries: CostEntry[] = [];
	const seasonalCandleEntries: CostEntry[] = [];
	const seasonalHeartEntries: CostEntry[] = [];
	const eventTicketEntries: CostEntry[] = [];

	for (const entry of spentCosts) {
		switch (entry.type) {
			case "seasonalCandles":
				seasonalCandleEntries.push(entry);
				break;
			case "seasonalHearts":
				seasonalHeartEntries.push(entry);
				break;
			case "eventTickets":
				eventTicketEntries.push(entry);
				break;
			default:
				standardEntries.push(entry);
		}
	}

	const totalSpentLines = [
		standardEntries,
		seasonalCandleEntries,
		seasonalHeartEntries,
		eventTicketEntries,
	]
		.map((entries) => resolveCostToString(entries, locale).join(""))
		.filter((line) => line.length > 0);

	const content = `### ${t("catalogue.total-spent", { lng: locale, ns: "features" })}\n\n${
		totalSpentLines.length > 0
			? `${totalSpentLines.join("\n")}\n-# ${t("catalogue.total-spent-subtext", { lng: locale, ns: "features" })}`
			: t("catalogue.main-total-spent-nothing", { lng: locale, ns: "features" })
	}`;

	if (content.length <= MAXIMUM_TEXT_DISPLAY_LENGTH) {
		await client.api.interactions.reply(interaction.id, interaction.token, {
			components: [{ type: ComponentType.TextDisplay, content }],
			flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
		});

		return;
	}

	let money = 0;
	let candles = 0;
	let hearts = 0;
	let ascendedCandles = 0;
	const seasons = new Map<SeasonIds, { seasonalCandles: number; seasonalHearts: number }>();
	const events: [EventIds, number][] = [];

	for (const entry of spentCosts) {
		switch (entry.type) {
			case "money":
				money = entry.amount;
				break;
			case "candles":
				candles = entry.amount;
				break;
			case "hearts":
				hearts = entry.amount;
				break;
			case "ascendedCandles":
				ascendedCandles = entry.amount;
				break;
			case "seasonalCandles":
			case "seasonalHearts": {
				const season = seasons.get(entry.seasonId) ?? { seasonalCandles: 0, seasonalHearts: 0 };
				season[entry.type] = entry.amount;
				seasons.set(entry.seasonId, season);
				break;
			}
			case "eventTickets":
				events.push([entry.eventId, entry.amount]);
				break;
		}
	}

	const standardCurrencyTable = markdownTable(
		[t("currency", { lng: locale, ns: "general" }), t("cost", { lng: locale, ns: "general" })],
		[
			[
				t("money", { lng: locale, ns: "general" }),
				`$${money.toLocaleString(locale, { minimumFractionDigits: 2 })}`,
			],
			[t("candles", { lng: locale, ns: "general" }), candles.toLocaleString(locale)],
			[t("hearts", { lng: locale, ns: "general" }), hearts.toLocaleString(locale)],
			[
				t("ascended-candles", { lng: locale, ns: "general" }),
				ascendedCandles.toLocaleString(locale),
			],
		],
	);

	const seasonalCurrencyTable = markdownTable(
		[
			t("season", { lng: locale, ns: "general" }),
			t("seasonal-candles", { lng: locale, ns: "general" }),
			t("seasonal-hearts", { lng: locale, ns: "general" }),
		],
		[...seasons]
			.sort(([a], [b]) => a - b)
			.map(([seasonId, season]) => [
				t(`seasons.${seasonId}`, { lng: locale, ns: "general" }),
				season.seasonalCandles.toLocaleString(locale),
				season.seasonalHearts.toLocaleString(locale),
			]),
	);

	const eventsTable = markdownTable(
		[
			t("event", { lng: locale, ns: "general" }),
			t("event-tickets", { lng: locale, ns: "general" }),
		],
		events.map(([eventId, eventTickets]) => {
			const event = skyEvents().get(eventId);

			return [
				event ? t(event.name, { lng: locale, ns: "general" }) : String(eventId),
				eventTickets.toLocaleString(locale),
			];
		}),
	);

	await client.api.interactions.reply(interaction.id, interaction.token, {
		files: [
			{
				data: [
					`# ${t("catalogue.total-spent-file-title", { lng: locale, ns: "features" })}`,
					"",
					t("catalogue.total-spent-file-description", { lng: locale, ns: "features" }),
					"",
					`## ${t("catalogue.total-spent-file-standard-currency", { lng: locale, ns: "features" })}`,
					"",
					standardCurrencyTable,
					"",
					`## ${t("catalogue.total-spent-file-seasonal-currency", { lng: locale, ns: "features" })}`,
					"",
					seasonalCurrencyTable,
					"",
					`## ${t("catalogue.events", { lng: locale, ns: "features" })}`,
					"",
					eventsTable,
					"",
					`## ${t("note", { lng: locale, ns: "general" })}`,
					"",
					t("catalogue.total-spent-subtext", { lng: locale, ns: "features" }),
					"",
				].join("\n"),
				name: "total-spent.md",
			},
		],
		flags: MessageFlags.Ephemeral,
	});
}

interface CatalogueTraversalContainerOptions {
	locale: Locale;
	navigationBackCustomId: CustomId | `${CustomId}§${string}`;
	navigationBackEmoji?: APIMessageComponentEmoji | undefined;
	isInStandardSpirits?: boolean;
	isInElders?: boolean;
	isInSeasons?: boolean;
	isInEvents?: boolean;
	isInStarterPacks?: boolean;
	isInSecretArea?: boolean;
	isInClothingShop?: boolean;
	isInNestingWorkshop?: boolean;
}

function traversalContainer({
	locale,
	navigationBackCustomId,
	navigationBackEmoji = { name: "⏪" },
	isInStandardSpirits = false,
	isInElders = false,
	isInSeasons = false,
	isInEvents = false,
	isInStarterPacks = false,
	isInSecretArea = false,
	isInClothingShop = false,
	isInNestingWorkshop = false,
}: CatalogueTraversalContainerOptions): APIContainerComponent {
	const standardSpirits: APISelectMenuOption = {
		label: t("catalogue.standard-spirits", { lng: locale, ns: "features" }),
		value: CustomId.CatalogueViewRealms,
	};

	if (isInStandardSpirits) {
		standardSpirits.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	const elders: APISelectMenuOption = {
		label: t("catalogue.elders", { lng: locale, ns: "features" }),
		value: CustomId.CatalogueViewElders,
	};

	if (isInElders) {
		elders.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	const seasons: APISelectMenuOption = {
		label: t("season-plural", { lng: locale, ns: "general" }),
		value: CustomId.CatalogueViewSeasons,
	};

	if (isInSeasons) {
		seasons.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	const events: APISelectMenuOption = {
		label: t("catalogue.events", { lng: locale, ns: "features" }),
		value: CustomId.CatalogueViewEvents,
	};

	if (isInEvents) {
		events.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	const starterPacks: APISelectMenuOption = {
		label: t("catalogue.starter-packs", { lng: locale, ns: "features" }),
		value: CustomId.CatalogueViewStarterPacks,
	};

	if (isInStarterPacks) {
		starterPacks.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	const secretArea: APISelectMenuOption = {
		label: t("catalogue.secret-area", { lng: locale, ns: "features" }),
		value: CustomId.CatalogueViewSecretArea,
	};

	if (isInSecretArea) {
		secretArea.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	const clothingShop: APISelectMenuOption = {
		label: t("catalogue.clothing-shop", { lng: locale, ns: "features" }),
		value: CustomId.CatalogueViewClothingShop,
	};

	if (isInClothingShop) {
		clothingShop.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	const nestingWorkshop: APISelectMenuOption = {
		label: t("catalogue.nesting-workshop", { lng: locale, ns: "features" }),
		value: CustomId.CatalogueViewNestingWorkshop,
	};

	if (isInNestingWorkshop) {
		nestingWorkshop.emoji = MISCELLANEOUS_EMOJIS.CurrentPosition;
	}

	return {
		type: ComponentType.Container,
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: CustomId.CatalogueTraversal,
						options: [
							standardSpirits,
							elders,
							seasons,
							events,
							starterPacks,
							secretArea,
							clothingShop,
							nestingWorkshop,
						],
						max_values: 1,
						min_values: 1,
						placeholder: t("catalogue.traversal-string-select-menu-placeholder", {
							lng: locale,
							ns: "features",
						}),
					},
				],
			},
			{
				type: ComponentType.ActionRow,
				components: [
					backToStartButton(locale),
					{
						type: ComponentType.Button,
						custom_id: navigationBackCustomId,
						emoji: navigationBackEmoji,
						label: t("navigation-back", { lng: locale, ns: "general" }),
						style: ButtonStyle.Secondary,
					},
				],
			},
		],
	};
}

export async function catalogueTraversal(
	interaction: APIMessageComponentSelectMenuInteraction,
	value: string,
) {
	switch (value) {
		case CustomId.CatalogueViewRealms:
			return viewRealms(interaction);
		case CustomId.CatalogueViewElders:
			return viewElders(interaction);
		case CustomId.CatalogueViewSeasons:
			return viewSeasons(interaction, 1);
		case CustomId.CatalogueViewEvents:
			return viewEvents(interaction, 1);
		case CustomId.CatalogueViewStarterPacks:
			return viewStarterPacks(interaction);
		case CustomId.CatalogueViewSecretArea:
			return viewSecretArea(interaction);
		case CustomId.CatalogueViewClothingShop:
			return viewClothingShop(interaction);
		case CustomId.CatalogueViewNestingWorkshop:
			return viewNestingWorkshop(interaction);
		default:
			throw new Error("Unknown catalogue traversal.");
	}
}

export async function viewRealms(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: t("catalogue.realms-title", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	for (const realm of REALMS) {
		if (realm.spirits.size === 0) {
			continue;
		}

		let content = `### ${t(`realms.${realm.name}`, { lng: locale, ns: "general" })}`;
		const items = catalogueSpiritItems(realm.spirits.values());
		const percentage = cataloguePercentage(catalogueProgress(items, catalogue?.data));
		content += percentage === null ? "" : ` (${percentage}%)`;
		const remainingCurrencyResult = resolveCostToString(
			sumCosts(partitionItemCosts(items, catalogue?.data).remaining, {
				includeSeasonalCurrency: false,
			}),
			locale,
		);
		content += `\n\n${remainingCurrencyResult.length > 0 ? remainingCurrencyResult.join("") : formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`;

		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CustomId.CatalogueViewRealm}§${realm.name}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content }],
		});
	}

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: `-# ${t("catalogue.realms-percentage-note", { lng: locale, ns: "features" })}`,
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInStandardSpirits: true,
			}),
		],
	});
}

export async function viewRealm(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	realm: RealmName,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const spirits = STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm);

	const title = t("catalogue.realm-title", {
		lng: locale,
		ns: "features",
		realm: t(`realms.${realm}`, { lng: locale, ns: "general" }),
	});

	const percentageNote = `-# ${t("catalogue.realms-percentage-note", { lng: locale, ns: "features" })}`;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: title,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const { remainingCurrency, offerProgress, hasEverything } = offerData({
		data: catalogue?.data,
		spirits: [...spirits.values()],
		locale,
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length - percentageNote.length,
		includePercentage: true,
		includeTotalRemainingCurrency: true,
		includeTitles: true,
	});

	if (remainingCurrency) {
		containerComponents.push({ type: ComponentType.TextDisplay, content: remainingCurrency });
	}

	for (const [id, text] of offerProgress.spirits) {
		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CustomId.CatalogueViewSpirit}§${id}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content: text }],
		});
	}

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: percentageNote,
	});

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueRealmEverything}§${realm}`,
					disabled: hasEverything,
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
					style: ButtonStyle.Success,
				},
			],
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewRealms,
				isInStandardSpirits: true,
			}),
		],
	});
}

export async function viewElders(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const title = t("catalogue.elders-title", { lng: locale, ns: "features" });

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: title,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const { remainingCurrency, offerProgress, hasEverything } = offerData({
		data: catalogue?.data,
		spirits: [...ELDER_SPIRITS.values()],
		locale,
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
		includePercentage: true,
		includeTotalRemainingCurrency: true,
		includeTitles: true,
	});

	if (remainingCurrency) {
		containerComponents.push({ type: ComponentType.TextDisplay, content: remainingCurrency });
	}

	for (const [id, text] of offerProgress.spirits) {
		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CustomId.CatalogueViewSpirit}§${id}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content: text }],
		});
	}

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: CustomId.CatalogueEldersEverything,
					disabled: hasEverything,
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
					style: ButtonStyle.Success,
				},
			],
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInElders: true,
			}),
		],
	});
}

export async function viewSeasons(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	page: number,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const currentSeason = skyCurrentSeason(skyNow());
	const containerComponents: APIComponentInContainer[] = [];
	const title = t("catalogue.seasons-title", { lng: locale, ns: "features" });

	if (currentSeason) {
		const accessory: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			// The § at the end is to prevent the API throwing a duplicate custom id error.
			custom_id: `${CustomId.CatalogueViewSeason}§${currentSeason.id}§`,
			style: ButtonStyle.Primary,
		};

		const seasonEmoji = SeasonIdToSeasonalEmoji[currentSeason.id];

		if (seasonEmoji) {
			accessory.emoji = seasonEmoji;
		}

		containerComponents.push({
			type: ComponentType.Section,
			accessory,
			components: [{ type: ComponentType.TextDisplay, content: title }],
		});
	} else {
		containerComponents.push({ type: ComponentType.TextDisplay, content: title });
	}

	const seasons = skySeasons();
	const offset = (page - 1) * CATALOGUE_MAXIMUM_SEASONS_DISPLAY_LIMIT;
	const limit = offset + CATALOGUE_MAXIMUM_SEASONS_DISPLAY_LIMIT;
	const maximumPage = Math.ceil(seasons.size / CATALOGUE_MAXIMUM_SEASONS_DISPLAY_LIMIT);

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: t("catalogue.seasons-description", { lng: locale, ns: "features" }),
		},
	);

	for (let index = offset; index < limit; index++) {
		const season = seasons.get(index as SeasonIds);

		if (!season) {
			continue;
		}

		const seasonalProgress = cataloguePercentage(
			catalogueProgress(catalogueSeasonItems([season]), catalogue?.data),
		);

		const progress =
			seasonalProgress === null
				? t("catalogue.main-no-progress", { lng: locale, ns: "features" })
				: t("catalogue.main-progress", { lng: locale, ns: "features", number: seasonalProgress });

		const accessory: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			style: ButtonStyle.Secondary,
			custom_id: `${CustomId.CatalogueViewSeason}§${season.id}`,
			label: t("view", { lng: locale, ns: "general" }),
		};

		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		if (seasonEmoji) {
			accessory.emoji = seasonEmoji;
		}

		containerComponents.push({
			type: ComponentType.Section,
			accessory,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: `### ${t(`seasons.${season.id}`, { lng: locale, ns: "general" })}\n\n${progress}`,
				},
			],
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.CatalogueViewSeasons}§${page === 1 ? maximumPage : page - 1}`,
				emoji: { name: "⬅️" },
				label: t("catalogue.seasons-previous-seasons", { lng: locale, ns: "features" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.CatalogueViewSeasons}§${page === maximumPage ? 1 : page + 1}`,
				emoji: { name: "➡️" },
				label: t("catalogue.seasons-next-seasons", { lng: locale, ns: "features" }),
				style: ButtonStyle.Secondary,
			},
		],
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInSeasons: true,
			}),
		],
	});
}

export async function viewSeason(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	seasonId: SeasonIds,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const seasons = skySeasons();
	const season = seasons.get(seasonId);

	if (!season) {
		throw new Error("Failed to view a season.");
	}

	const titleSeason = t("catalogue.season-title", {
		lng: locale,
		ns: "features",
		season: `[${t(`seasons.${season.id}`, { lng: locale, ns: "general" })}](${t(`season-wiki.${season.id}`, { lng: locale, ns: "general" })})`,
	});

	const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];
	const title = `##${seasonEmoji ? ` ${formatEmoji(seasonEmoji)}` : ""} ${titleSeason}`;

	const containerComponents: APIComponentInContainer[] = [
		season.patchNotesURL
			? {
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						label: t("catalogue.patch-notes-button-label", { lng: locale, ns: "features" }),
						style: ButtonStyle.Link,
						url: season.patchNotesURL,
					},
					components: [{ type: ComponentType.TextDisplay, content: title }],
				}
			: { type: ComponentType.TextDisplay, content: title },
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const { hasEverything, remainingCurrency, offerProgress, itemsOfferProgress } = offerData({
		data: catalogue?.data,
		spirits: [season.guide, ...season.spirits.values()],
		items: season.items,
		locale,
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
		includePercentage: true,
		includeTotalRemainingCurrency: true,
		includeTitles: true,
	});

	if (remainingCurrency) {
		containerComponents.push({ type: ComponentType.TextDisplay, content: remainingCurrency });
	}

	for (const [id, text] of offerProgress.spirits) {
		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CustomId.CatalogueViewSpirit}§${id}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content: text }],
		});
	}

	if (itemsOfferProgress) {
		containerComponents.push({ type: ComponentType.TextDisplay, content: itemsOfferProgress });
	}

	if (season.items.length > 0) {
		const itemsOptions = season.items.map((item) =>
			itemToSelectMenuOption(item, catalogue?.data, locale),
		);

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueSetSeasonItems}§${seasonId}`,
					max_values: itemsOptions.length,
					min_values: 0,
					options: itemsOptions,
					placeholder: t("catalogue.season-set-items-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		});
	}

	const before = seasons.get((season.id - 1) as SeasonIds);
	const after = seasons.get((season.id + 1) as SeasonIds);

	const previousSeasonButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${CustomId.CatalogueViewSeason}§${before?.id}`,
		disabled: !before,
		label: t("catalogue.season-previous-season", { lng: locale, ns: "features" }),
		style: ButtonStyle.Secondary,
	};

	const nextSeasonButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: `${CustomId.CatalogueViewSeason}§${after?.id}`,
		disabled: !after,
		label: t("catalogue.season-next-season", { lng: locale, ns: "features" }),
		style: ButtonStyle.Secondary,
	};

	if (before) {
		const beforeSeasonEmoji = SeasonIdToSeasonalEmoji[before.id];

		if (beforeSeasonEmoji) {
			previousSeasonButton.emoji = beforeSeasonEmoji;
		}
	} else {
		previousSeasonButton.emoji = MISCELLANEOUS_EMOJIS.No;
	}

	if (after) {
		const afterSeasonEmoji = SeasonIdToSeasonalEmoji[after.id];

		if (afterSeasonEmoji) {
			nextSeasonButton.emoji = afterSeasonEmoji;
		}
	} else {
		nextSeasonButton.emoji = MISCELLANEOUS_EMOJIS.No;
	}

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		previousSeasonButton,
		nextSeasonButton,
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueSeasonEverything}§${seasonId}`,
			disabled: hasEverything,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
			style: ButtonStyle.Success,
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: actionRowComponents,
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: `${CustomId.CatalogueViewSeasons}§${Math.ceil((season.id + 1) / CATALOGUE_MAXIMUM_SEASONS_DISPLAY_LIMIT)}`,
				isInSeasons: true,
			}),
		],
	});
}

export async function viewEvents(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	page: number,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const title = t("catalogue.events-title", { lng: locale, ns: "features" });

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: title,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const events = skyEvents();
	const offset = (page - 1) * CATALOGUE_MAXIMUM_EVENTS_DISPLAY_LIMIT;
	const limit = offset + CATALOGUE_MAXIMUM_EVENTS_DISPLAY_LIMIT;
	const maximumPage = Math.ceil(events.size / CATALOGUE_MAXIMUM_EVENTS_DISPLAY_LIMIT);
	const eventsFiltered = [];

	for (let index = offset; index < limit; index++) {
		const event = events.get(index as EventIds);

		if (!event) {
			continue;
		}

		eventsFiltered.push(event);
	}

	const { offerProgress } = offerData({
		data: catalogue?.data,
		events: eventsFiltered,
		locale,
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
		includePercentage: true,
		includeTitles: true,
	});

	for (const [id, text] of offerProgress.events) {
		const accessory: APIButtonComponentWithCustomId = {
			type: ComponentType.Button,
			style: ButtonStyle.Secondary,
			custom_id: `${CustomId.CatalogueViewEvent}§${id}`,
			label: t("view", { lng: locale, ns: "general" }),
		};

		const eventEmoji = EventIdToEventTicketEmoji[id];

		if (eventEmoji) {
			accessory.emoji = eventEmoji;
		}

		containerComponents.push({
			type: ComponentType.Section,
			accessory,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: text,
				},
			],
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.CatalogueViewEvents}§${page === 1 ? maximumPage : page - 1}`,
				emoji: { name: "⬅️" },
				label: t("catalogue.events-previous-events", { lng: locale, ns: "features" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.CatalogueViewEvents}§${page === maximumPage ? 1 : page + 1}`,
				emoji: { name: "➡️" },
				label: t("catalogue.events-next-events", { lng: locale, ns: "features" }),
				style: ButtonStyle.Secondary,
			},
		],
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInEvents: true,
			}),
		],
	});
}

export async function viewReturningSpirits(interaction: APIMessageComponentButtonInteraction) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);
	const { locale } = interaction;
	const spirits = resolveReturningSpirits(skyNow());

	if (!spirits) {
		await start({ locale, userId: invoker.id });
		return;
	}

	const title = t("catalogue.returning-spirits-title", { lng: locale, ns: "features" });

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: title,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	const { remainingCurrency, offerProgress } = offerData({
		data: catalogue?.data,
		spirits: [...spirits.values()],
		locale,
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
		includePercentage: true,
		includeTotalRemainingCurrency: true,
		includeTitles: true,
	});

	if (remainingCurrency) {
		containerComponents.push({ type: ComponentType.TextDisplay, content: remainingCurrency });
	}

	for (const [id, text] of offerProgress.spirits) {
		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CustomId.CatalogueViewSpirit}§${id}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content: text }],
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [backToStartButton(locale)],
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
		],
	});
}

export async function parseViewSpirit(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);

	const spiritId = Number(
		isButton(interaction)
			? interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1)
			: interaction.data.values[0]!,
	);

	const spirit = spirits().get(spiritId as SpiritIds);

	if (!spirit) {
		throw new Error(`Invalid spirit id: ${spiritId}`);
	}

	await viewSpirit(interaction, spirit, {
		data: catalogue?.data,
		showEverythingButton: catalogue?.show_everything_button,
	});
}

interface CatalogueViewSpiritOptions {
	data: ReadonlySet<number> | undefined;
	showEverythingButton: boolean | undefined;
}

async function viewSpirit(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
	{ data, showEverythingButton }: CatalogueViewSpiritOptions,
) {
	const { locale } = interaction;
	const isStandardSpirit = spirit.isStandardSpirit();
	const isElderSpirit = spirit.isElderSpirit();
	const isSeasonalSpirit = spirit.isSeasonalSpirit();
	const isGuideSpirit = spirit.isGuideSpirit();
	const seasonalParsing = isSeasonalSpirit && spirit.current.length === 0;
	const friendshipTree = seasonalParsing ? spirit.seasonal : spirit.current;
	const imageURL = seasonalParsing ? spirit.imageURLSeasonal : spirit.imageURL;

	const { hasEverything, offerProgress } = offerData({
		data,
		spirits: [spirit],
		locale,
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH,
		includePercentage: false,
	});

	let spirits:
		| ReadonlyCollection<SpiritIds, StandardSpirit>
		| ReadonlyCollection<SpiritIds, ElderSpirit>
		| ReadonlyCollection<SpiritIds, SeasonalSpirit | GuideSpirit>
		| undefined;

	if (isStandardSpirit) {
		spirits = REALMS.find(({ name }) => name === spirit.realm)?.spirits;
	} else if (isElderSpirit) {
		spirits = ELDER_SPIRITS;
	} else if (isSeasonalSpirit || isGuideSpirit) {
		const season = skySeasons().get(spirit.seasonId);

		if (season) {
			spirits = new Collection<SpiritIds, SeasonalSpirit | GuideSpirit>()
				.set(season.guide.id, season.guide)
				.concat(season.spirits);
		}
	}

	const titleSpirit = `[${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" })})`;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: isStandardSpirit
				? t("catalogue.spirit-title-standard-spirit", {
						lng: locale,
						ns: "features",
						spirit: titleSpirit,
						realm: t(`realms.${spirit.realm}`, { lng: locale, ns: "general" }),
					})
				: isElderSpirit
					? t("catalogue.spirit-title-elder", { lng: locale, ns: "features", spirit: titleSpirit })
					: t("catalogue.spirit-title-seasonal-spirit", {
							lng: locale,
							ns: "features",
							spirit: titleSpirit,
							season: t(`seasons.${spirit.seasonId}`, { lng: locale, ns: "general" }),
						}),
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content:
			offerProgress.spirits.first() ??
			t("catalogue.spirit-no-friendship-tree", { lng: locale, ns: "features" }),
	});

	if (imageURL) {
		containerComponents.push({
			type: ComponentType.MediaGallery,
			items: [{ media: { url: imageURL } }],
		});
	} else if (friendshipTree.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# ${t("catalogue.spirit-no-infographic-yet", { lng: locale, ns: "features" })}`,
		});
	}

	if (isGuideSpirit && spirit.inProgress) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# ${t("catalogue.spirit-not-fully-revealed", { lng: locale, ns: "features" })}`,
		});
	}

	if (friendshipTree.length > 0) {
		const itemSelectionOptions = friendshipTreeToItems(friendshipTree).map((item) =>
			itemToSelectMenuOption(item, data, locale),
		);

		const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(
			0,
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
		);

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer1}§spirit:${spirit.id}`,
					max_values: itemSelectionOptionsMaximumLimit.length,
					min_values: 0,
					options: itemSelectionOptionsMaximumLimit,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		});

		if (itemSelectionOptions.length > CATALOGUE_MAXIMUM_OPTIONS_LIMIT) {
			const itemSelectionOverflowOptionsMaximumLimit = itemSelectionOptions.slice(
				CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
			);

			containerComponents.push({
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: `${CustomId.CatalogueViewOffer2}§spirit:${spirit.id}`,
						max_values: itemSelectionOverflowOptionsMaximumLimit.length,
						min_values: 0,
						options: itemSelectionOverflowOptionsMaximumLimit,
						placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
							lng: locale,
							ns: "features",
						}),
					},
				],
			});
		}
	}

	if (spirits) {
		const index = [...spirits.values()].findIndex(({ id }) => id === spirit.id);
		const beforeIndex = index - 1;
		const before = beforeIndex >= 0 ? spirits.at(beforeIndex) : null;
		const after = spirits.at(index + 1);

		// It is possible that for 1 spirit, the custom ids will be the same, leading to an error.
		// We use the nullish coalescing operator to fallback to some default values to mitigate this.
		const actionRowComponents: APIComponentInMessageActionRow[] = [
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.CatalogueViewSpirit}§${before?.id ?? "before"}`,
				disabled: !before,
				emoji: { name: "⬅️" },
				label: t("catalogue.spirit-previous-spirit", { lng: locale, ns: "features" }),
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CustomId.CatalogueViewSpirit}§${after?.id ?? "after"}`,
				disabled: !after,
				emoji: { name: "➡️" },
				label: t("catalogue.spirit-next-spirit", { lng: locale, ns: "features" }),
				style: ButtonStyle.Secondary,
			},
		];

		if (showEverythingButton) {
			actionRowComponents.push({
				type: ComponentType.Button,
				custom_id: `${CustomId.CatalogueItemsEverything}§spirit:${spirit.id}`,
				disabled: hasEverything,
				emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
				label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
				style: ButtonStyle.Success,
			});
		}

		containerComponents.push({ type: ComponentType.ActionRow, components: actionRowComponents });
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: isElderSpirit
					? CustomId.CatalogueViewElders
					: isStandardSpirit
						? `${CustomId.CatalogueViewRealm}§${spirit.realm}`
						: `${CustomId.CatalogueViewSeason}§${spirit.seasonId}`,
				navigationBackEmoji:
					isSeasonalSpirit || isGuideSpirit
						? (SeasonIdToSeasonalEmoji[spirit.seasonId] ?? undefined)
						: undefined,
				isInElders: isElderSpirit,
				isInStandardSpirits: isStandardSpirit,
				isInSeasons: isSeasonalSpirit || isGuideSpirit,
			}),
		],
	});
}

export async function parseViewEvent(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);

	const eventId = Number(
		isButton(interaction)
			? interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1)
			: interaction.data.values[0],
	);

	const event = skyEvents().get(eventId as EventIds);

	if (!event) {
		throw new Error("Could not parse an event for the catalogue.");
	}

	await viewEvent(interaction, event, {
		data: catalogue?.data,
		showEverythingButton: catalogue?.show_everything_button,
	});
}

interface CatalogueViewEventOptions {
	data: ReadonlySet<number> | undefined;
	showEverythingButton: boolean | undefined;
}

async function viewEvent(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	event: Event,
	{ data, showEverythingButton }: CatalogueViewEventOptions,
) {
	const { locale } = interaction;
	const { id, offer, offerInfographicURL, patchNotesURL } = event;

	const titleEvent = t("catalogue.event-title", {
		lng: locale,
		ns: "features",
		event: `[${t(event.name, { lng: locale, ns: "general" })}](${t(`event-wiki.${id}`, { lng: locale, ns: "general" })})`,
	});

	const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];
	const title = `##${eventTicketEmoji ? ` ${formatEmoji(eventTicketEmoji)}` : ""} ${titleEvent}`;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: title,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	let description: string;

	if (offer.length > 0) {
		const { offerDescription } = progress(locale, offer, data);
		description = offerDescription.join("\n");
	} else {
		description = t("catalogue.event-no-cosmetics", { lng: locale, ns: "features" });
	}

	if (patchNotesURL) {
		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				label: t("catalogue.patch-notes-button-label", { lng: locale, ns: "features" }),
				style: ButtonStyle.Link,
				url: patchNotesURL,
			},
			components: [{ type: ComponentType.TextDisplay, content: description }],
		});
	} else {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: description,
		});
	}

	if (offerInfographicURL) {
		containerComponents.push({
			type: ComponentType.MediaGallery,
			items: [{ media: { url: offerInfographicURL } }],
		});
	} else if (offer.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# ${t("catalogue.event-no-infographic-yet", { lng: locale, ns: "features" })}`,
		});
	}

	if (offer.length > 0) {
		const itemSelectionOptions = offer.map((item) => itemToSelectMenuOption(item, data, locale));

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer1}§event:${id}`,
					max_values: itemSelectionOptions.length,
					min_values: 0,
					options: itemSelectionOptions,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		});
	}

	const events = skyEvents();
	const before = events.get((id - 1) as EventIds);
	const after = events.get((id + 1) as EventIds);

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		{
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueViewEvent}§${before?.id}`,
			disabled: !before,
			emoji: { name: "⬅️" },
			label: t("catalogue.event-previous-event", { lng: locale, ns: "features" }),
			style: ButtonStyle.Secondary,
		},
		{
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueViewEvent}§${after?.id}`,
			disabled: !after,
			emoji: { name: "➡️" },
			label: t("catalogue.event-next-event", { lng: locale, ns: "features" }),
			style: ButtonStyle.Secondary,
		},
	];

	if (showEverythingButton) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueItemsEverything}§event:${id}`,
			disabled: catalogueComplete(catalogueProgress(event.offer, data)),
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
			style: ButtonStyle.Success,
		});
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: actionRowComponents,
	});

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: `${CustomId.CatalogueViewEvents}§${Math.ceil((id + 1) / CATALOGUE_MAXIMUM_EVENTS_DISPLAY_LIMIT)}`,
				isInEvents: true,
			}),
		],
	});
}

export async function viewStarterPacks(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);
	const { locale } = interaction;

	const itemSelectionOptions = STARTER_PACKS.items.map((item) =>
		itemToSelectMenuOption(item, catalogue?.data, locale),
	);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: t("catalogue.starter-packs-title", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: progress(
				interaction.locale,
				STARTER_PACKS.items,
				catalogue?.data,
			).offerDescription.join("\n"),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer1}§${CatalogueType.StarterPacks}`,
					max_values: itemSelectionOptions.length,
					min_values: 0,
					options: itemSelectionOptions,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		},
	];

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.StarterPacks}`,
					disabled: catalogueComplete(catalogueProgress(STARTER_PACKS.items, catalogue?.data)),
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
					style: ButtonStyle.Success,
				},
			],
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInStarterPacks: true,
			}),
		],
	});
}

export async function viewSecretArea(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const itemSelectionOptions = SECRET_AREA.items.map((item) =>
		itemToSelectMenuOption(item, catalogue?.data, locale),
	);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: t("catalogue.secret-area-title", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: progress(
				interaction.locale,
				SECRET_AREA.items,
				catalogue?.data,
			).offerDescription.join("\n"),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer1}§${CatalogueType.SecretArea}`,
					max_values: itemSelectionOptions.length,
					min_values: 0,
					options: itemSelectionOptions,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		},
	];

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.SecretArea}`,
					disabled: catalogueComplete(catalogueProgress(SECRET_AREA.items, catalogue?.data)),
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
					style: ButtonStyle.Success,
				},
			],
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInSecretArea: true,
			}),
		],
	});
}

export async function viewClothingShop(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const itemSelectionOptions = CLOTHING_SHOP.items.map((item) =>
		itemToSelectMenuOption(item, catalogue?.data, locale),
	);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: t("catalogue.clothing-shop-title", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: progress(
				interaction.locale,
				CLOTHING_SHOP.items,
				catalogue?.data,
			).offerDescription.join("\n"),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer1}§${CatalogueType.ClothingShop}`,
					max_values: itemSelectionOptions.length,
					min_values: 0,
					options: itemSelectionOptions,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		},
	];

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.ClothingShop}`,
					disabled: catalogueComplete(catalogueProgress(CLOTHING_SHOP.items, catalogue?.data)),
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
					style: ButtonStyle.Success,
				},
			],
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInClothingShop: true,
			}),
		],
	});
}

export async function viewNestingWorkshop(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const itemSelectionOptions = NESTING_WORKSHOP.items.map((item) =>
		itemToSelectMenuOption(item, catalogue?.data, locale),
	);

	const itemSelectionOptions1 = itemSelectionOptions.slice(0, CATALOGUE_MAXIMUM_OPTIONS_LIMIT);

	const itemSelectionOptions2 = itemSelectionOptions.slice(
		CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
		CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 2,
	);

	const itemSelectionOptions3 = itemSelectionOptions.slice(
		CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 2,
		CATALOGUE_MAXIMUM_OPTIONS_LIMIT * 3,
	);

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: t("catalogue.nesting-workshop-title", { lng: locale, ns: "features" }),
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: progress(
				interaction.locale,
				NESTING_WORKSHOP.items,
				catalogue?.data,
			).offerDescription.join("\n"),
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer1}§${CatalogueType.NestingWorkshop}`,
					max_values: itemSelectionOptions1.length,
					min_values: 0,
					options: itemSelectionOptions1,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer2}§${CatalogueType.NestingWorkshop}`,
					max_values: itemSelectionOptions2.length,
					min_values: 0,
					options: itemSelectionOptions2,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CustomId.CatalogueViewOffer3}§${CatalogueType.NestingWorkshop}`,
					max_values: itemSelectionOptions3.length,
					min_values: 0,
					options: itemSelectionOptions3,
					placeholder: t("catalogue.select-cosmetics-string-select-menu-placeholder", {
						lng: locale,
						ns: "features",
					}),
				},
			],
		},
	];

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.NestingWorkshop}`,
					disabled: catalogueComplete(catalogueProgress(NESTING_WORKSHOP.items, catalogue?.data)),
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
					style: ButtonStyle.Success,
				},
			],
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
			traversalContainer({
				locale,
				navigationBackCustomId: CustomId.CatalogueViewStart,
				isInNestingWorkshop: true,
			}),
		],
	});
}

export async function setRealm(interaction: APIMessageComponentButtonInteraction) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);
	const realm = interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1);

	if (!isRealm(realm)) {
		throw new Error("Unknown realm.");
	}

	const allCosmetics = STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm).reduce(
		(data, spirit) => {
			for (const cosmetic of spirit.allCosmetics) {
				data.add(cosmetic);
			}

			return data;
		},
		new Set<number>(),
	);

	await update(interaction, {
		data: catalogue ? catalogue.data.union(allCosmetics) : allCosmetics,
	});
	await viewRealm(interaction, realm);
}

export async function setElders(interaction: APIMessageComponentButtonInteraction) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	const allCosmetics = ELDER_SPIRITS.reduce((data, spirit) => {
		for (const cosmetic of spirit.allCosmetics) {
			data.add(cosmetic);
		}

		return data;
	}, new Set<number>());

	await update(interaction, {
		data: catalogue ? catalogue.data.union(allCosmetics) : allCosmetics,
	});
	await viewElders(interaction);
}

export async function setSeason(interaction: APIMessageComponentButtonInteraction) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	const parsedCustomId = Number(
		interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1),
	);

	const season = skySeasons().get(parsedCustomId as SeasonIds);

	if (!season) {
		throw new Error("Unknown season.");
	}

	const allCosmetics = new Set([
		...season.guide.allCosmetics,
		...season.spirits.reduce<number[]>((totalCosmetics, spirit) => {
			totalCosmetics.push(...spirit.allCosmetics);
			return totalCosmetics;
		}, []),
		...season.allCosmetics,
	]);

	await update(interaction, {
		data: catalogue ? catalogue.data.union(allCosmetics) : allCosmetics,
	});
	await viewSeason(interaction, season.id);
}

export async function setSeasonItems(interaction: APIMessageComponentSelectMenuInteraction) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	const parsedCustomId = Number(
		interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1),
	);

	const season = skySeasons().get(parsedCustomId as SeasonIds);

	if (!season) {
		throw new Error("Unknown season.");
	}

	await update(interaction, {
		data: calculateSetItems(interaction, season.allCosmetics, catalogue?.data),
	});
	await viewSeason(interaction, season.id);
}

export async function parseSetItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const resolvedCustomId = interaction.data.custom_id.slice(
		interaction.data.custom_id.indexOf("§") + 1,
	);

	const resolvedCustomIdForSpirits = resolvedCustomId.startsWith("spirit:")
		? Number(resolvedCustomId.slice(7))
		: null;

	const resolvedCustomIdNumberForEvents = resolvedCustomId.startsWith("event:")
		? Number(resolvedCustomId.slice(6))
		: null;

	const spirit = spirits().get(resolvedCustomIdForSpirits as SpiritIds);

	const event =
		resolvedCustomIdNumberForEvents === null
			? null
			: skyEvents().get(resolvedCustomIdNumberForEvents as EventIds);

	if (spirit) {
		await setSpiritItems(interaction, spirit);
	} else if (event) {
		await setEventItems(interaction, event);
	} else {
		switch (Number(resolvedCustomId)) {
			case CatalogueType.StarterPacks: {
				await setStarterPacksItems(interaction);
				return;
			}
			case CatalogueType.SecretArea: {
				await setSecretAreaItems(interaction);
				return;
			}
			case CatalogueType.ClothingShop: {
				await setClothingShopItems(interaction);
				return;
			}
			case CatalogueType.NestingWorkshop: {
				await setNestingWorkshopItems(interaction);
				return;
			}
			default: {
				throw new Error("Could not parse items to set.");
			}
		}
	}
}

function calculateSetItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	allCosmetics: readonly number[],
	data: ReadonlySet<number> = new Set(),
) {
	if (isButton(interaction)) {
		return new Set([...data, ...allCosmetics]);
	}

	// Get the select menu where this interaction came from.
	const component = resolveStringSelectMenu(
		interaction.message.components!,
		interaction.data.custom_id,
	)!;

	// Retrieve all cosmetics in this select menu.
	const selectMenuCosmetics = component.options.reduce((computedCosmetics, { value }) => {
		for (const parsedValue of JSON.parse(value) as readonly number[]) {
			computedCosmetics.add(parsedValue);
		}

		return computedCosmetics;
	}, new Set<number>());

	// Remove the cosmetics from the data.
	const modifiedData = data.difference(selectMenuCosmetics);

	// Calculate the new data.
	return modifiedData.union(
		interaction.data.values.reduce((computedCosmetics, value) => {
			const parsedValue = JSON.parse(value) as readonly number[];

			for (const value of parsedValue) {
				computedCosmetics.add(value);
			}

			return computedCosmetics;
		}, new Set<number>()),
	);
}

async function setSpiritItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	spirit: StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	const { data, show_everything_button } = await update(interaction, {
		data: calculateSetItems(interaction, spirit.allCosmetics, catalogue?.data),
	});

	await viewSpirit(interaction, spirit, {
		data,
		showEverythingButton: show_everything_button,
	});
}

async function setEventItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	event: Event,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	const { data, show_everything_button } = await update(interaction, {
		data: calculateSetItems(interaction, event.allCosmetics, catalogue?.data),
	});

	await viewEvent(interaction, event, { data, showEverythingButton: show_everything_button });
}

async function setStarterPacksItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(interaction, {
		data: calculateSetItems(interaction, STARTER_PACKS.allCosmetics, catalogue?.data),
	});

	await viewStarterPacks(interaction);
}

async function setSecretAreaItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(interaction, {
		data: calculateSetItems(interaction, SECRET_AREA.allCosmetics, catalogue?.data),
	});

	await viewSecretArea(interaction);
}

async function setClothingShopItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(interaction, {
		data: calculateSetItems(interaction, CLOTHING_SHOP.allCosmetics, catalogue?.data),
	});

	await viewClothingShop(interaction);
}

async function setNestingWorkshopItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(interaction, {
		data: calculateSetItems(interaction, NESTING_WORKSHOP.allCosmetics, catalogue?.data),
	});

	await viewNestingWorkshop(interaction);
}

export async function updateEverythingButtonSetting(
	interaction: APIMessageComponentButtonInteraction,
) {
	const customId = interaction.data.custom_id;
	const setting = Number(customId.slice(customId.indexOf("§") + 1));
	await update(interaction, { showEverythingButton: !setting });
	await viewSettings(interaction);
}

interface CatalogueUpdateOptions {
	data?: ReadonlySet<number>;
	showEverythingButton?: boolean;
}

type CatalogueUpdatePayload = Partial<Pick<CataloguePacket, "data" | "show_everything_button">>;

type CatalogueUpdateMergeFields = (keyof CatalogueUpdatePayload | "last_updated_at")[];

async function update(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	{ data, showEverythingButton }: CatalogueUpdateOptions,
) {
	const userId = interactionInvoker(interaction).id;
	const payload: CatalogueUpdatePayload = {};
	const mergeFields: CatalogueUpdateMergeFields = ["last_updated_at"];

	if (data) {
		mergeFields.push("data");
		payload.data = [...data];
	}

	if (showEverythingButton !== undefined) {
		mergeFields.push("show_everything_button");
		payload.show_everything_button = showEverythingButton;
	}

	const [cataloguePacket] = await pg<CataloguePacket>(Table.Catalogue)
		.insert({
			...payload,
			user_id: userId,
			last_updated_at: new Date(DiscordSnowflake.timestampFrom(interaction.id)),
		})
		.onConflict("user_id")
		.merge(mergeFields)
		.returning("*");

	return { ...cataloguePacket!, data: new Set(cataloguePacket!.data) };
}
