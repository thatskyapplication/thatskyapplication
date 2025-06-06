import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
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
import {
	ELDER_SPIRITS,
	type ElderSpirit,
	type Event,
	type EventIds,
	type GuideSpirit,
	type Item,
	REALMS,
	REALM_SPIRITS,
	type RealmName,
	STANDARD_SPIRITS,
	type Season,
	type SeasonIds,
	type SeasonalSpirit,
	type SpiritIds,
	type StandardSpirit,
	addCosts,
	formatEmoji,
	resolveAllCosmetics,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	skyCurrentEvents,
	skyCurrentSeason,
	skyEventYears,
	skyEvents,
	skyNow,
	skySeasons,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { NESTING_WORKSHOP } from "../data/nesting-workshop.js";
import { PERMANENT_EVENT_STORE } from "../data/permanent-event-store.js";
import { SECRET_AREA } from "../data/secret-area.js";
import { STARTER_PACKS } from "../data/starter-packs.js";
import { client } from "../discord.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { CatalogueType, resolveCostToString } from "../utility/catalogue.js";
import {
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE_COMPONENTS_V2,
	MAXIMUM_TEXT_DISPLAY_LENGTH,
} from "../utility/constants.js";
import {
	CUSTOM_EMOJI_REPLACEMENTS,
	CosmeticToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import { interactionInvoker, isChatInputCommand } from "../utility/functions.js";

export const CATALOGUE_VIEW_START_CUSTOM_ID = "CATALOGUE_VIEW_START_CUSTOM_ID" as const;
export const CATALOGUE_BACK_TO_START_CUSTOM_ID = "CATALOGUE_BACK_TO_START_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_TYPE_CUSTOM_ID = "CATALOGUE_VIEW_TYPE_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_REALMS_CUSTOM_ID = "CATALOGUE_VIEW_REALMS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_ELDERS_CUSTOM_ID = "CATALOGUE_VIEW_ELDERS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_SEASONS_CUSTOM_ID = "CATALOGUE_VIEW_SEASONS_CUSTOM_ID" as const;
export const CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID = "CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_REALM_CUSTOM_ID = "CATALOGUE_VIEW_REALM_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_SEASON_CUSTOM_ID = "CATALOGUE_VIEW_SEASON_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID" as const;

export const CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID =
	"CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID" as const;

export const CATALOGUE_VIEW_SPIRIT_CUSTOM_ID = "CATALOGUE_VIEW_SPIRIT_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_EVENT_CUSTOM_ID = "CATALOGUE_VIEW_EVENT_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_1_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_1_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_2_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_2_CUSTOM_ID" as const;
export const CATALOGUE_VIEW_OFFER_3_CUSTOM_ID = "CATALOGUE_VIEW_OFFER_3_CUSTOM_ID" as const;
export const CATALOGUE_REALM_EVERYTHING_CUSTOM_ID = "CATALOGUE_REALM_EVERYTHING_CUSTOM_ID" as const;

export const CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID =
	"CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID" as const;

export const CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID =
	"CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID" as const;

export const CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID = "CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID" as const;
const CATALOGUE_MAXIMUM_OPTIONS_LIMIT = 25 as const;

const CATALOGUE_STANDARD_PERCENTAGE_NOTE =
	"Averages are calculated even beyond the second wing buff." as const;

const BACK_TO_START_BUTTON = {
	type: ComponentType.Button,
	// This custom id must differ to avoid duplicate custom ids.
	custom_id: CATALOGUE_BACK_TO_START_CUSTOM_ID,
	emoji: { name: "⏮️" },
	label: "Start",
	style: ButtonStyle.Secondary,
} as const;

export const ELDERS_TITLE = "## Elders \n-# Catalogue" as const;
export const SEASONS_TITLE = "## Seasons \n-# Catalogue" as const;

export interface CataloguePacket {
	user_id: Snowflake;
	data: number[];
}

function progress(offer: readonly Item[], data: ReadonlySet<number>) {
	const offerDescription = [];
	const owned = [];
	const unowned = [];

	for (const { name, cosmetics } of offer) {
		const emojis = cosmetics.map((cosmetic) => {
			const emoji = CosmeticToEmoji[cosmetic];
			return emoji ? formatEmoji(emoji) : name;
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

	const remainingCurrencyResult = remainingCurrency(offer, data, true);
	const resolvedRemainingCurrency = resolveCostToString(remainingCurrencyResult);

	if (resolvedRemainingCurrency.length > 0) {
		offerDescription.push(`${resolvedRemainingCurrency.join("")}`);
	}

	return { remainingCurrencyResult, offerDescription };
}

function ownedProgress(items: readonly Item[], data: ReadonlySet<number>) {
	return {
		owned: resolveAllCosmetics(items).filter((cosmetic) => data.has(cosmetic)),
		total: items.reduce((total, item) => total + item.cosmetics.length, 0),
	};
}

function progressPercentage(owned: readonly number[], total: number, round?: boolean) {
	if (total === 0) {
		return null;
	}

	const percentage = (owned.length / total) * 100;

	if (!round) {
		return percentage;
	}

	const integer = Math.trunc(percentage);

	return integer === 0
		? Math.ceil(percentage)
		: integer === 99
			? Math.floor(percentage)
			: Math.round(percentage);
}

function spiritOwnedProgress(
	spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
	data: ReadonlySet<number>,
) {
	const totalOwned = [];
	let total = 0;

	for (const spirit of spirits) {
		const offer =
			spirit.isStandardSpirit() || spirit.isElderSpirit() || spirit.isGuideSpirit()
				? spirit.current
				: spirit.items;

		const { owned, total: offerTotal } = ownedProgress(offer, data);
		totalOwned.push(...owned);
		total += offerTotal;
	}

	return { owned: totalOwned, total };
}

function spiritProgress(
	spirits: readonly (StandardSpirit | ElderSpirit | SeasonalSpirit | GuideSpirit)[],
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = spiritOwnedProgress(spirits, data);
	return progressPercentage(owned, total, round);
}

function seasonOwnedProgress(seasons: readonly Season[], data: ReadonlySet<number>) {
	const totalOwned = [];
	let total = 0;

	for (const season of seasons) {
		const offers = [
			season.guide.current,
			...season.spirits.map((spirit) => spirit.items),
			season.items,
		];

		for (const offer of offers) {
			const { owned, total: offerTotal } = ownedProgress(offer, data);
			totalOwned.push(...owned);
			total += offerTotal;
		}
	}

	return { owned: totalOwned, total };
}

function seasonProgress(
	seasons: readonly Season[],
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = seasonOwnedProgress(seasons, data);
	return progressPercentage(owned, total, round);
}

function eventOwnedProgress(events: readonly Event[], data: ReadonlySet<number>) {
	const totalOwned = [];
	let total = 0;

	for (const event of events) {
		const { owned, total: offerTotal } = ownedProgress(event.offer, data);

		totalOwned.push(...owned);
		total += offerTotal;
	}

	return { owned: totalOwned, total };
}

function eventProgress(
	events: readonly Event[],
	data: ReadonlySet<number> = new Set(),
	round?: boolean,
) {
	const { owned, total } = eventOwnedProgress(events, data);
	return progressPercentage(owned, total, round);
}

function starterPackOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(STARTER_PACKS.items, data);
}

function starterPackProgress(data: ReadonlySet<number> = new Set(), round?: boolean) {
	const { owned, total } = starterPackOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function secretAreaOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(SECRET_AREA.items, data);
}

function secretAreaProgress(data: ReadonlySet<number> = new Set(), round?: boolean) {
	const { owned, total } = secretAreaOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function permanentEventStoreOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(PERMANENT_EVENT_STORE.items, data);
}

function permanentEventStoreProgress(data: ReadonlySet<number> = new Set(), round?: boolean) {
	const { owned, total } = permanentEventStoreOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function nestingWorkshopOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(NESTING_WORKSHOP.items, data);
}

function nestingWorkshopProgress(data: ReadonlySet<number> = new Set(), round?: boolean) {
	const { owned, total } = nestingWorkshopOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function allProgress(data: ReadonlySet<number> = new Set(), round?: boolean) {
	const standardAndElderOwnedProgress = spiritOwnedProgress([...REALM_SPIRITS.values()], data);
	const seasonalOwnedProgress = seasonOwnedProgress([...skySeasons().values()], data);
	const eventOwnedProgressResult = eventOwnedProgress([...skyEvents().values()], data);
	const starterPackOwnedProgressResult = starterPackOwnedProgress(data);
	const secretAreaOwnedProgressResult = secretAreaOwnedProgress(data);
	const permanentEventStoreOwnedProgressResult = permanentEventStoreOwnedProgress(data);
	const nestingWorkshopOwnedProgressResult = nestingWorkshopOwnedProgress(data);

	const progresses = [
		standardAndElderOwnedProgress,
		seasonalOwnedProgress,
		eventOwnedProgressResult,
		starterPackOwnedProgressResult,
		secretAreaOwnedProgressResult,
		permanentEventStoreOwnedProgressResult,
		nestingWorkshopOwnedProgressResult,
	];

	return progressPercentage(
		progresses.reduce<number[]>((totalOwned, { owned }) => {
			if (Array.isArray(owned)) {
				totalOwned.push(...owned);
			} else {
				totalOwned.push(owned);
			}

			return totalOwned;
		}, []),
		progresses.reduce((totalTotal, { total }) => totalTotal + total, 0),
		round,
	);
}

function remainingCurrency(
	items: readonly Item[],
	data: ReadonlySet<number> = new Set(),
	includeSeasonalCurrency?: boolean,
) {
	const dataSet = new Set(data);

	const result = addCosts(
		items
			.filter(({ cosmetics }) => cosmetics.some((cosmetic) => !dataSet.has(cosmetic)))
			.map((item) => item.cost)
			.filter((cost) => cost !== null),
	);

	if (!includeSeasonalCurrency) {
		for (const seasonalCandle of result.seasonalCandles) {
			seasonalCandle.cost = 0;
		}

		for (const seasonalHeart of result.seasonalHearts) {
			seasonalHeart.cost = 0;
		}
	}

	return result;
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

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
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
		const isSeasonalSpirit = spirit.isSeasonalSpirit();
		const seasonalParsing = isSeasonalSpirit && spirit.current.length === 0;
		const offer = seasonalParsing ? spirit.seasonal : spirit.current;

		if (offer.length === 0) {
			continue;
		}

		const { remainingCurrencyResult, offerDescription } = progress(offer, data);

		if (includeTotalRemainingCurrency) {
			remainingCurrencies.push(remainingCurrencyResult);
		}

		const percentage = spiritProgress([spirit], data, true);

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
		if (event.offer.length === 0) {
			continue;
		}

		const { remainingCurrencyResult, offerDescription } = progress(event.offer, data);

		if (includeTotalRemainingCurrency) {
			remainingCurrencies.push(remainingCurrencyResult);
		}

		const percentage = eventProgress([event], data, true);

		if (percentage !== null && percentage !== 100) {
			hasEverything = false;
		}

		offerProgress.events.set(
			event.id,
			`${
				includeTitles
					? `### ${t(`events.${event.id}`, { lng: locale, ns: "general" })}${includePercentage ? (percentage === null ? "" : ` (${percentage}%)`) : ""}\n\n${offerDescription.join("\n")}`
					: ""
			}`,
		);
	}

	const { remainingCurrencyResult: itemsRemainingCurrency, offerDescription: itemsOfferProgress } =
		progress(items, data);

	if (includeTotalRemainingCurrency) {
		remainingCurrencies.push(itemsRemainingCurrency);
	}

	const { owned, total } = ownedProgress(items, data);
	const itemsPercentage = progressPercentage(owned, total);

	if (itemsPercentage !== null && itemsPercentage !== 100) {
		hasEverything = false;
	}

	if (remainingCurrencies.length > 0) {
		const totalRemainingCurrency = resolveCostToString(addCosts(remainingCurrencies));

		if (totalRemainingCurrency.length > 0) {
			remainingCurrency = `### Remaining currency\n\n${totalRemainingCurrency.join("")}`;
		}
	}

	const itemsOfferProgressText =
		itemsOfferProgress.length > 0 ? `### Items\n\n${itemsOfferProgress.join("\n")}` : null;

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

async function fetch(userId: Snowflake) {
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
}: CatalogueStartOptions): Promise<[APIMessageTopLevelComponent]> {
	const catalogue = await fetch(userId);
	const data = catalogue?.data;
	const standardProgress = spiritProgress([...STANDARD_SPIRITS.values()], data, true);
	const elderProgress = spiritProgress([...ELDER_SPIRITS.values()], data, true);
	const seasonalProgress = seasonProgress([...skySeasons().values()], data, true);
	const eventProgressResult = eventProgress([...skyEvents().values()], data, true);
	const starterPackProgressResult = starterPackProgress(data, true);
	const secretAreaProgressResult = secretAreaProgress(data, true);
	const permanentEventStoreProgressResult = permanentEventStoreProgress(data, true);
	const nestingWorkshopProgressResult = nestingWorkshopProgress(data, true);
	const now = skyNow();
	const currentSeason = skyCurrentSeason(now);
	const events = skyCurrentEvents(now);
	const currentTravellingSpirit = resolveTravellingSpirit(now);
	const currentReturningSpirits = resolveReturningSpirits(now);

	const currentSeasonButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: currentSeason
			? `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${currentSeason.id}`
			: // This would not happen, but it's here to satisfy the API.
				CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
		disabled: !currentSeason,
		label: "Current Season",
		style: currentSeason ? ButtonStyle.Success : ButtonStyle.Secondary,
	};

	if (currentSeason) {
		currentSeasonButton.emoji = SeasonIdToSeasonalEmoji[currentSeason.id];
	}

	const currentEventButtons: APIButtonComponentWithCustomId[] =
		events.size === 0
			? [
					{
						type: ComponentType.Button,
						// This would not happen, but it's here to satisfy the API.
						custom_id: CATALOGUE_VIEW_EVENT_CUSTOM_ID,
						disabled: true,
						style: ButtonStyle.Secondary,
					},
				]
			: events.reduce<APIButtonComponentWithCustomId[]>((buttons, event) => {
					const button: APIButtonComponentWithCustomId = {
						type: ComponentType.Button,
						custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${event.id}`,
						style: ButtonStyle.Success,
					};

					const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

					if (eventTicketEmoji) {
						button.emoji = eventTicketEmoji;
					} else {
						button.label = t(`events.${event.id}`, { lng: locale, ns: "general" });
					}

					buttons.push(button);
					return buttons;
				}, []);

	if (currentEventButtons.length === 1) {
		currentEventButtons[0]!.label = "Current Event";
	}

	const currentTravellingSpiritButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: currentTravellingSpirit
			? `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${currentTravellingSpirit.id}`
			: // This would not happen, but it's here to satisfy the API.
				`${CATALOGUE_VIEW_START_CUSTOM_ID}-travelling`,

		disabled: !currentTravellingSpirit,
		label: "Travelling Spirit",
		style: currentTravellingSpirit ? ButtonStyle.Success : ButtonStyle.Secondary,
	};

	if (currentTravellingSpirit) {
		currentTravellingSpiritButton.emoji = SeasonIdToSeasonalEmoji[currentTravellingSpirit.seasonId];
	}

	const currentReturningSpiritsButton: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		custom_id: currentReturningSpirits
			? CATALOGUE_VIEW_RETURNING_SPIRITS_CUSTOM_ID
			: // This would not happen, but it's here to satisfy the API.
				`${CATALOGUE_VIEW_START_CUSTOM_ID}-returning`,
		disabled: !currentReturningSpirits,
		label: "Returning Spirits",
		style: currentReturningSpirits ? ButtonStyle.Success : ButtonStyle.Secondary,
	};

	if (
		currentReturningSpirits?.every(
			(returningSpirit) => returningSpirit.seasonId === currentReturningSpirits.first()!.seasonId,
		)
	) {
		currentReturningSpiritsButton.emoji =
			SeasonIdToSeasonalEmoji[currentReturningSpirits.first()!.seasonId];
	}

	return [
		{
			type: ComponentType.Container,
			accent_color: DEFAULT_EMBED_COLOUR,
			components: [
				{
					type: ComponentType.TextDisplay,
					content: "## Catalogue",
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `Welcome to your catalogue!\n\nHere, you can track all the cosmetics in the game, with dynamic calculations, such as remaining seasonal candles for an active season, making this a powerful tool to use.\n\nTotal Progress: ${allProgress(data, true)}%`,
				},
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.StringSelect,
							custom_id: CATALOGUE_VIEW_TYPE_CUSTOM_ID,
							max_values: 1,
							min_values: 0,
							options: [
								{
									label: `Standard Spirits${standardProgress === null ? "" : ` (${standardProgress}%)`}`,
									value: String(CatalogueType.StandardSpirits),
								},
								{
									label: `Elders${elderProgress === null ? "" : ` (${elderProgress}%)`}`,
									value: String(CatalogueType.Elders),
								},
								{
									label: `Seasons${seasonalProgress === null ? "" : ` (${seasonalProgress}%)`}`,
									value: String(CatalogueType.SeasonalSpirits),
								},
								{
									label: `Events${eventProgressResult === null ? "" : ` (${eventProgressResult}%)`}`,
									value: String(CatalogueType.Events),
								},
								{
									label: `Starter Packs${starterPackProgressResult === null ? "" : ` (${starterPackProgressResult}%)`}`,
									value: String(CatalogueType.StarterPacks),
								},
								{
									label: `Secret Area${secretAreaProgressResult === null ? "" : ` (${secretAreaProgressResult}%)`}`,
									value: String(CatalogueType.SecretArea),
								},
								{
									label: `Permanent Event Store${
										permanentEventStoreProgressResult === null
											? ""
											: ` (${permanentEventStoreProgressResult}%)`
									}`,
									value: String(CatalogueType.PermanentEventStore),
								},
								{
									label: `Nesting Workshop${
										nestingWorkshopProgressResult === null
											? ""
											: ` (${nestingWorkshopProgressResult}%)`
									}`,
									value: String(CatalogueType.NestingWorkshop),
								},
							],
							placeholder: "What do you want to see?",
						},
					],
				},
				{
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: "### Quick access",
				},
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

export async function parseCatalogueType(interaction: APIMessageComponentSelectMenuInteraction) {
	switch (Number(interaction.data.values[0]) as CatalogueType) {
		case CatalogueType.StandardSpirits: {
			await viewRealms(interaction);
			return;
		}
		case CatalogueType.Elders: {
			await viewElders(interaction);
			return;
		}
		case CatalogueType.SeasonalSpirits: {
			await viewSeasons(interaction);
			return;
		}
		case CatalogueType.Events: {
			await viewEventYears(interaction);
			return;
		}
		case CatalogueType.StarterPacks: {
			await viewStarterPacks(interaction);
			return;
		}
		case CatalogueType.SecretArea: {
			await viewSecretArea(interaction);
			return;
		}
		case CatalogueType.PermanentEventStore: {
			await viewPermanentEventStore(interaction);
			return;
		}
		case CatalogueType.NestingWorkshop: {
			await viewNestingWorkshop(interaction);
		}
	}
}

export async function viewRealms(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetch(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: "## Realms \n-# Catalogue",
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	for (const realm of REALMS) {
		let content = `### ${t(`realms.${realm.name}`, { lng: locale, ns: "general" })}`;
		const percentage = spiritProgress([...realm.spirits.values()], catalogue?.data, true);
		content += percentage === null ? "" : ` (${percentage}%)`;

		const remainingCurrencyResult = resolveCostToString(
			realm.spirits.reduce(
				(remainingCurrencyResult, spirit) =>
					addCosts([remainingCurrencyResult, remainingCurrency(spirit.current, catalogue?.data)]),
				{},
			),
		);

		if (remainingCurrencyResult) {
			content += `\n\n${remainingCurrencyResult.length > 0 ? remainingCurrencyResult.join("") : formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`;
		}

		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				style: ButtonStyle.Primary,
				custom_id: `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${realm.name}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content }],
		});
	}

	containerComponents.push(
		{
			type: ComponentType.TextDisplay,
			content: `-# ${CATALOGUE_STANDARD_PERCENTAGE_NOTE}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				BACK_TO_START_BUTTON,
				{
					type: ComponentType.Button,
					custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
					emoji: { name: "⏪" },
					label: "Back",
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: containerComponents,
			},
		],
	});
}

export async function viewRealm(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	realm: RealmName,
) {
	const catalogue = await fetch(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const spirits = STANDARD_SPIRITS.filter((spirit) => spirit.realm === realm);
	const title = `## ${t(`realms.${realm}`, { lng: locale, ns: "general" })}\n-# Catalogue → Realms`;
	const percentageNote = `-# ${CATALOGUE_STANDARD_PERCENTAGE_NOTE}`;

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
				custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${id}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content: text }],
		});
	}

	containerComponents.push(
		{
			type: ComponentType.TextDisplay,
			content: percentageNote,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				BACK_TO_START_BUTTON,
				{
					type: ComponentType.Button,
					custom_id: CATALOGUE_VIEW_REALMS_CUSTOM_ID,
					emoji: { name: "⏪" },
					label: "Back",
					style: ButtonStyle.Secondary,
				},

				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_REALM_EVERYTHING_CUSTOM_ID}§${realm}`,
					disabled: hasEverything,
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: "I have everything!",
					style: ButtonStyle.Success,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: containerComponents,
			},
		],
	});
}

export async function viewElders(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetch(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: ELDERS_TITLE,
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
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - ELDERS_TITLE.length,
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
				custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${id}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content: text }],
		});
	}

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				BACK_TO_START_BUTTON,
				{
					type: ComponentType.Button,
					custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
					emoji: { name: "⏪" },
					label: "Back",
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID,
					disabled: hasEverything,
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: "I have everything!",
					style: ButtonStyle.Success,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: containerComponents,
			},
		],
	});
}

export async function viewSeasons(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetch(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const currentSeason = skyCurrentSeason(skyNow());
	const containerComponents: APIComponentInContainer[] = [];

	if (currentSeason) {
		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${currentSeason.id}`,
				emoji: SeasonIdToSeasonalEmoji[currentSeason.id],
				style: ButtonStyle.Primary,
			},
			components: [{ type: ComponentType.TextDisplay, content: SEASONS_TITLE }],
		});
	} else {
		containerComponents.push({ type: ComponentType.TextDisplay, content: SEASONS_TITLE });
	}

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.TextDisplay,
			content: "Behold, the entirety of seasons! Select a season using the select menu!",
		},
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: CATALOGUE_VIEW_SEASON_CUSTOM_ID,
					max_values: 1,
					min_values: 0,
					options: skySeasons().map((season) => {
						const percentage = seasonProgress([season], catalogue?.data, true);

						return {
							emoji: SeasonIdToSeasonalEmoji[season.id],
							label: `${t(`seasons.${season.id}`, { lng: locale, ns: "general" })}${
								percentage === null ? "" : ` (${percentage}%)`
							}`,
							value: String(season.id),
						};
					}),
					placeholder: "Select a season!",
				},
			],
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				BACK_TO_START_BUTTON,
				{
					type: ComponentType.Button,
					custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
					emoji: { name: "⏪" },
					label: "Back",
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: containerComponents,
			},
		],
	});
}

export async function viewSeason(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	seasonId: SeasonIds,
) {
	const catalogue = await fetch(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const seasons = skySeasons();
	const season = seasons.get(seasonId);

	if (!season) {
		pino.error(interaction, "Failed to view a season.");

		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);

		return;
	}

	const title = `## ${formatEmoji(SeasonIdToSeasonalEmoji[season.id])} [${t(`seasons.${season.id}`, { lng: locale, ns: "general" })}](${t(`season-wiki.${season.id}`, { lng: locale, ns: "general" })})\n-# Catalogue → Seasons`;

	const containerComponents: APIComponentInContainer[] = [
		season.patchNotesURL
			? {
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						label: "Patch notes",
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
				custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${id}`,
				label: t("view", { lng: locale, ns: "general" }),
			},
			components: [{ type: ComponentType.TextDisplay, content: text }],
		});
	}

	if (itemsOfferProgress) {
		containerComponents.push({ type: ComponentType.TextDisplay, content: itemsOfferProgress });
	}

	if (season.items.length > 0) {
		const itemsOptions = season.items.map(({ name, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue?.data.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmeticDisplay];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CATALOGUE_SET_SEASON_ITEMS_CUSTOM_ID}§${seasonId}`,
					max_values: itemsOptions.length,
					min_values: 0,
					options: itemsOptions,
					placeholder: "What items do you have?",
				},
			],
		});
	}

	const before = seasons.get((season.id - 1) as SeasonIds);
	const after = seasons.get((season.id + 1) as SeasonIds);

	containerComponents.push(
		{
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID}§${seasonId}`,
					disabled: hasEverything,
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: "I have everything!",
					style: ButtonStyle.Success,
				},
			],
		},
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
					custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${before?.id}`,
					disabled: !before,
					emoji: before ? SeasonIdToSeasonalEmoji[before.id] : MISCELLANEOUS_EMOJIS.No,
					label: "Previous season",
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${after?.id}`,
					disabled: !after,
					emoji: after ? SeasonIdToSeasonalEmoji[after.id] : MISCELLANEOUS_EMOJIS.No,
					label: "Next season",
					style: ButtonStyle.Secondary,
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [
				BACK_TO_START_BUTTON,
				{
					type: ComponentType.Button,
					custom_id: CATALOGUE_VIEW_SEASONS_CUSTOM_ID,
					emoji: { name: "⏪" },
					label: "Back",
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: containerComponents,
			},
		],
	});
}

export async function viewEventYears(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetch(interactionInvoker(interaction).id);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Events By Year\n-# Catalogue",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: "Events are grouped by year.",
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID,
								max_values: 1,
								min_values: 0,
								options: skyEventYears().map((year) => {
									const percentage = eventProgress(
										[
											...skyEvents()
												.filter((event) => event.start.year === year)
												.values(),
										],
										catalogue?.data,
										true,
									);

									return {
										label: `${year}${percentage === null ? "" : ` (${percentage}%)`}`,
										value: String(year),
									};
								}),
								placeholder: "Select a year!",
							},
						],
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.ActionRow,
						components: [
							BACK_TO_START_BUTTON,
							{
								type: ComponentType.Button,
								custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
								emoji: { name: "⏪" },
								label: "Back",
								style: ButtonStyle.Secondary,
							},
						],
					},
				],
			},
		],
	});
}
