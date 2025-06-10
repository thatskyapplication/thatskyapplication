import { Collection, type ReadonlyCollection } from "@discordjs/collection";
import {
	type APIButtonComponentWithCustomId,
	type APIChatInputApplicationCommandInteraction,
	type APIComponentInContainer,
	type APIComponentInMessageActionRow,
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
	addCosts,
	ELDER_SPIRITS,
	type ElderSpirit,
	type Event,
	type EventIds,
	formatEmoji,
	type GuideSpirit,
	type Item,
	REALM_SPIRITS,
	REALMS,
	type RealmName,
	resolveAllCosmetics,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	type Season,
	type SeasonalSpirit,
	type SeasonIds,
	type SpiritIds,
	STANDARD_SPIRITS,
	type StandardSpirit,
	skyCurrentEvents,
	skyCurrentSeason,
	skyEvents,
	skyEventYears,
	skyNow,
	skySeasons,
	spirits,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { NESTING_WORKSHOP } from "../data/nesting-workshop.js";
import { PERMANENT_EVENT_STORE } from "../data/permanent-event-store.js";
import { SECRET_AREA } from "../data/secret-area.js";
import { STARTER_PACKS } from "../data/starter-packs.js";
import { client } from "../discord.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import {
	CatalogueType,
	GUIDE_SPIRIT_IN_PROGRESS_TEXT,
	NO_EVENT_INFOGRAPHIC_YET,
	NO_EVENT_OFFER_TEXT,
	NO_FRIENDSHIP_TREE_TEXT,
	NO_FRIENDSHIP_TREE_YET_TEXT,
	resolveCostToString,
} from "../utility/catalogue.js";
import {
	CATALOGUE_EVENTS_THRESHOLD,
	DEFAULT_EMBED_COLOUR,
	ERROR_RESPONSE_COMPONENTS_V2,
	MAXIMUM_TEXT_DISPLAY_LENGTH,
} from "../utility/constants.js";
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
	isRealm,
	resolveStringSelectMenu,
} from "../utility/functions.js";

export const CATALOGUE_VIEW_START_CUSTOM_ID = "CATALOGUE_VIEW_START_CUSTOM_ID" as const;
export const CATALOGUE_BACK_TO_START_CUSTOM_ID = "CATALOGUE_BACK_TO_START_CUSTOM_ID" as const;
export const CATALOGUE_SETTINGS_CUSTOM_ID = "CATALOGUE_SETTINGS_CUSTOM_ID" as const;

export const CATALOGUE_SETTINGS_EVERYTHING_CUSTOM_ID =
	"CATALOGUE_SETTINGS_EVERYTHING_CUSTOM_ID" as const;

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

const I_HAVE_EVERYTHING = "I have everything!" as const;

const BACK_TO_START_BUTTON = {
	type: ComponentType.Button,
	// This custom id must differ to avoid duplicate custom ids.
	custom_id: CATALOGUE_BACK_TO_START_CUSTOM_ID,
	emoji: { name: "⏮️" },
	label: "Start",
	style: ButtonStyle.Secondary,
} as const;

const ELDERS_TITLE = "## Elders \n-# Catalogue" as const;
const SEASONS_TITLE = "## Seasons \n-# Catalogue" as const;
const RETURNING_SPIRITS_TITLE = "## Returning Spirits\n-# Catalogue" as const;

export interface CataloguePacket {
	user_id: Snowflake;
	data: number[];
	show_everything_button: boolean;
}

function progress(offer: readonly Item[], data: ReadonlySet<number> = new Set()) {
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

export function allProgress(data: ReadonlySet<number> = new Set(), round?: boolean) {
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
}: CatalogueStartOptions): Promise<[APIMessageTopLevelComponent]> {
	const catalogue = await fetchCatalogue(userId);
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
						custom_id: CATALOGUE_SETTINGS_CUSTOM_ID,
						emoji: MISCELLANEOUS_EMOJIS.Settings,
					},
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `Welcome to your catalogue!\n\nHere, you can track all the cosmetics in the game, with dynamic calculations, such as remaining seasonal candles for an active season, making this a powerful tool to use.\n\nTotal Progress: ${allProgress(data, true)}%`,
						},
					],
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

export async function viewSettings(interaction: APIMessageComponentButtonInteraction) {
	const catalogue = await pg<CataloguePacket>(Table.Catalogue)
		.select("show_everything_button")
		.where({ user_id: interactionInvoker(interaction).id })
		.first();

	const everythingSetting: APIButtonComponentWithCustomId = {
		type: ComponentType.Button,
		style: catalogue?.show_everything_button ? ButtonStyle.Danger : ButtonStyle.Success,
		custom_id: `${CATALOGUE_SETTINGS_EVERYTHING_CUSTOM_ID}§${Number(catalogue?.show_everything_button ?? true)}`,
		label: catalogue?.show_everything_button ? "Disable" : "Enable",
	};

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Settings\n-# Catalogue",
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
								content: `Toggle displaying the "${I_HAVE_EVERYTHING}" button.`,
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
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
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
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
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

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		BACK_TO_START_BUTTON,
		{
			type: ComponentType.Button,
			custom_id: CATALOGUE_VIEW_REALMS_CUSTOM_ID,
			emoji: { name: "⏪" },
			label: "Back",
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_REALM_EVERYTHING_CUSTOM_ID}§${realm}`,
			disabled: hasEverything,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: I_HAVE_EVERYTHING,
			style: ButtonStyle.Success,
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
			components: actionRowComponents,
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
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
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

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		BACK_TO_START_BUTTON,
		{
			type: ComponentType.Button,
			custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
			emoji: { name: "⏪" },
			label: "Back",
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: CATALOGUE_ELDERS_EVERYTHING_CUSTOM_ID,
			disabled: hasEverything,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: I_HAVE_EVERYTHING,
			style: ButtonStyle.Success,
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
			components: actionRowComponents,
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
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
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
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
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

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_SEASON_EVERYTHING_CUSTOM_ID}§${seasonId}`,
					disabled: hasEverything,
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: I_HAVE_EVERYTHING,
					style: ButtonStyle.Success,
				},
			],
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
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);

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

export async function viewEvents(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
	yearString: string,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;
	const year = Number(yearString);
	const events = skyEvents().filter((event) => event.start.year === year);
	const eventsYears = skyEventYears();
	const index = eventsYears.indexOf(year);
	const before = eventsYears[index - 1];
	const after = eventsYears[index + 1];
	const title = `## ${year}\n-# Catalogue → Events By Year`;

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

	const { offerProgress } = offerData({
		data: catalogue?.data,
		events: [...events.values()],
		locale,
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - title.length,
		includePercentage: true,
		includeTitles: true,
	});

	if (offerProgress.events.size > CATALOGUE_EVENTS_THRESHOLD) {
		containerComponents.push(
			{
				type: ComponentType.TextDisplay,
				content: [...offerProgress.events.values()].join("\n"),
			},
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.StringSelect,
						custom_id: CATALOGUE_VIEW_EVENT_CUSTOM_ID,
						max_values: 1,
						min_values: 0,
						options: events.map((event) => {
							const { id } = event;

							const stringSelectMenuOption: APISelectMenuOption = {
								label: t(`events.${id}`, { lng: locale, ns: "general" }),
								value: String(id),
							};

							const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

							if (eventTicketEmoji) {
								stringSelectMenuOption.emoji = eventTicketEmoji;
							}

							return stringSelectMenuOption;
						}),
						placeholder: "Select an event!",
					},
				],
			},
		);
	} else {
		for (const [id, text] of offerProgress.events) {
			containerComponents.push({
				type: ComponentType.Section,
				accessory: {
					type: ComponentType.Button,
					style: ButtonStyle.Primary,
					custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${id}`,
					label: t("view", { lng: locale, ns: "general" }),
				},
				components: [{ type: ComponentType.TextDisplay, content: text }],
			});
		}
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
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${before}`,
					disabled: !before,
					emoji: { name: "⬅️" },
					label: "Previous year",
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${after}`,
					disabled: !after,
					emoji: { name: "➡️" },
					label: "Next year",
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
					custom_id: CATALOGUE_VIEW_EVENT_YEARS_CUSTOM_ID,
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

export async function viewReturningSpirits(interaction: APIMessageComponentButtonInteraction) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);
	const { locale } = interaction;
	const spirits = resolveReturningSpirits(skyNow());

	if (!spirits) {
		await start({ locale, userId: invoker.id });
		return;
	}

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: RETURNING_SPIRITS_TITLE,
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
		limit: MAXIMUM_TEXT_DISPLAY_LENGTH - RETURNING_SPIRITS_TITLE.length,
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
			components: [BACK_TO_START_BUTTON],
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
		pino.error(interaction, `Invalid spirit id: ${spiritId}`);

		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);

		return;
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
	const offer = seasonalParsing ? spirit.seasonal : spirit.current;
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

	const breadcrumbs = `Catalogue → ${isStandardSpirit ? `Realms → ${t(`realms.${spirit.realm}`, { lng: locale, ns: "general" })}` : isElderSpirit ? "Elders" : `Seasons → ${t(`seasons.${spirit.seasonId}`, { lng: locale, ns: "general" })}`}`;

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${t(`spirits.${spirit.id}`, { lng: locale, ns: "general" })}](${t(`spirit-wiki.${spirit.id}`, { lng: locale, ns: "general" })})\n-# ${breadcrumbs}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	containerComponents.push({
		type: ComponentType.TextDisplay,
		content: offerProgress.spirits.first() ?? NO_FRIENDSHIP_TREE_TEXT,
	});

	if (imageURL) {
		containerComponents.push({
			type: ComponentType.MediaGallery,
			items: [{ media: { url: imageURL } }],
		});
	} else if (offer.length > 0) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# ${NO_FRIENDSHIP_TREE_YET_TEXT}`,
		});
	}

	if (isGuideSpirit && spirit.inProgress) {
		containerComponents.push({
			type: ComponentType.TextDisplay,
			content: `-# ${GUIDE_SPIRIT_IN_PROGRESS_TEXT}`,
		});
	}

	if (offer.length > 0) {
		const itemSelectionOptions = offer.map(({ name, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => data?.has(cosmetic)),
				label: name,
				value: JSON.stringify(cosmetics),
			};

			const emoji = CosmeticToEmoji[cosmeticDisplay];

			if (emoji) {
				stringSelectMenuOption.emoji = emoji;
			}

			return stringSelectMenuOption;
		});

		const itemSelectionOptionsMaximumLimit = itemSelectionOptions.slice(
			0,
			CATALOGUE_MAXIMUM_OPTIONS_LIMIT,
		);

		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.StringSelect,
					custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§spirit:${spirit.id}`,
					max_values: itemSelectionOptionsMaximumLimit.length,
					min_values: 0,
					options: itemSelectionOptionsMaximumLimit,
					placeholder: "Select what you have!",
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
						custom_id: `${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§spirit:${spirit.id}`,
						max_values: itemSelectionOverflowOptionsMaximumLimit.length,
						min_values: 0,
						options: itemSelectionOverflowOptionsMaximumLimit,
						placeholder: "Select what you have!",
					},
				],
			});
		}
	}

	containerComponents.push({
		type: ComponentType.Separator,
		divider: true,
		spacing: SeparatorSpacingSize.Small,
	});

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
				custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${before?.id ?? "before"}`,
				disabled: !before,
				emoji: { name: "⬅️" },
				label: "Previous spirit",
				style: ButtonStyle.Secondary,
			},
			{
				type: ComponentType.Button,
				custom_id: `${CATALOGUE_VIEW_SPIRIT_CUSTOM_ID}§${after?.id ?? "after"}`,
				disabled: !after,
				emoji: { name: "➡️" },
				label: "Next spirit",
				style: ButtonStyle.Secondary,
			},
		];

		if (showEverythingButton) {
			actionRowComponents.push({
				type: ComponentType.Button,
				custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§spirit:${spirit.id}`,
				disabled: hasEverything,
				emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
				label: I_HAVE_EVERYTHING,
				style: ButtonStyle.Success,
			});
		}

		containerComponents.push({ type: ComponentType.ActionRow, components: actionRowComponents });
	}

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			BACK_TO_START_BUTTON,
			{
				type: ComponentType.Button,
				custom_id: isElderSpirit
					? CATALOGUE_VIEW_ELDERS_CUSTOM_ID
					: isStandardSpirit
						? `${CATALOGUE_VIEW_REALM_CUSTOM_ID}§${spirit.realm}`
						: `${CATALOGUE_VIEW_SEASON_CUSTOM_ID}§${spirit.seasonId}`,
				emoji:
					isSeasonalSpirit || isGuideSpirit
						? SeasonIdToSeasonalEmoji[spirit.seasonId]
						: { name: "⏪" },
				label: "Back",
				style: ButtonStyle.Secondary,
			},
		],
	});

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
		pino.error(interaction, "Could not parse an event for the catalogue.");

		await client.api.interactions.updateMessage(
			interaction.id,
			interaction.token,
			ERROR_RESPONSE_COMPONENTS_V2,
		);

		return;
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
	const { id, start, offer, offerInfographicURL, patchNotesURL } = event;
	const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

	const containerComponents: APIComponentInContainer[] = [
		{
			type: ComponentType.TextDisplay,
			content: `## [${eventTicketEmoji ? formatEmoji(eventTicketEmoji) : ""}${t(`events.${id}`, { lng: locale, ns: "general" })}](${t(`event-wiki.${id}`, { lng: locale, ns: "general" })})\n-# Catalogue → Events By Year → ${event.start.year}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
	];

	let description: string;

	if (offer.length > 0) {
		const { offerDescription } = progress(offer, data);
		description = offerDescription.join("\n");
	} else {
		description = NO_EVENT_OFFER_TEXT;
	}

	if (patchNotesURL) {
		containerComponents.push({
			type: ComponentType.Section,
			accessory: {
				type: ComponentType.Button,
				label: "Patch notes",
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
			content: `-# ${NO_EVENT_INFOGRAPHIC_YET}`,
		});
	}

	if (offer.length > 0) {
		const itemSelectionOptions = offer.map(({ name, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => data?.has(cosmetic)),
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
					custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§event:${id}`,
					max_values: itemSelectionOptions.length,
					min_values: 0,
					options: itemSelectionOptions,
					placeholder: "Select what you have!",
				},
			],
		});
	}

	const events = skyEvents().filter((event) => event.start.year === start.year);
	const before = events.get((id - 1) as EventIds);
	const after = events.get((id + 1) as EventIds);

	// It is possible that for the first event of a year, the custom ids will be the same, leading to an error.
	// We use the nullish coalescing operator to fallback to some default values to mitigate this.
	const actionRowComponents: APIComponentInMessageActionRow[] = [
		{
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${before?.id ?? "before"}`,
			disabled: !before,
			emoji: { name: "⬅️" },
			label: "Previous event",
			style: ButtonStyle.Secondary,
		},
		{
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_VIEW_EVENT_CUSTOM_ID}§${after?.id ?? "after"}`,
			disabled: !after,
			emoji: { name: "➡️" },
			label: "Next event",
			style: ButtonStyle.Secondary,
		},
	];

	if (showEverythingButton) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§event:${id}`,
			disabled: eventProgress([event], data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: I_HAVE_EVERYTHING,
			style: ButtonStyle.Success,
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
			components: actionRowComponents,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				BACK_TO_START_BUTTON,
				{
					type: ComponentType.Button,
					custom_id: `${CATALOGUE_VIEW_EVENT_YEAR_CUSTOM_ID}§${start.year}`,
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

async function viewStarterPacks(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	const itemSelectionOptions = STARTER_PACKS.items.map(({ name, cosmetics, cosmeticDisplay }) => {
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

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		BACK_TO_START_BUTTON,
		{
			type: ComponentType.Button,
			custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
			emoji: { name: "⏪" },
			label: "Back",
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.StarterPacks}`,
			disabled: starterPackProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: I_HAVE_EVERYTHING,
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Starter Packs\n-# Catalogue",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: progress(STARTER_PACKS.items, catalogue?.data).offerDescription.join("\n"),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.StarterPacks}`,
								max_values: itemSelectionOptions.length,
								min_values: 0,
								options: itemSelectionOptions,
								placeholder: "Select what you have!",
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
						components: actionRowComponents,
					},
				],
			},
		],
	});
}

async function viewSecretArea(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);

	const itemSelectionOptions = SECRET_AREA.items.map(({ name, cosmetics, cosmeticDisplay }) => {
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

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		BACK_TO_START_BUTTON,
		{
			type: ComponentType.Button,
			custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
			emoji: { name: "⏪" },
			label: "Back",
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.SecretArea}`,
			disabled: secretAreaProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: I_HAVE_EVERYTHING,
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Secret Area\n-# Catalogue",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: progress(SECRET_AREA.items, catalogue?.data).offerDescription.join("\n"),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.SecretArea}`,
								max_values: itemSelectionOptions.length,
								min_values: 0,
								options: itemSelectionOptions,
								placeholder: "Select what you have!",
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
						components: actionRowComponents,
					},
				],
			},
		],
	});
}

async function viewPermanentEventStore(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);

	const itemSelectionOptions = PERMANENT_EVENT_STORE.items.map(
		({ name, cosmetics, cosmeticDisplay }) => {
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
		},
	);

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		BACK_TO_START_BUTTON,
		{
			type: ComponentType.Button,
			custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
			emoji: { name: "⏪" },
			label: "Back",
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.PermanentEventStore}`,
			disabled: permanentEventStoreProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: I_HAVE_EVERYTHING,
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Permanent Event Store\n-# Catalogue",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: progress(PERMANENT_EVENT_STORE.items, catalogue?.data).offerDescription.join(
							"\n",
						),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.PermanentEventStore}`,
								max_values: itemSelectionOptions.length,
								min_values: 0,
								options: itemSelectionOptions,
								placeholder: "Select what you have!",
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
						components: actionRowComponents,
					},
				],
			},
		],
	});
}

async function viewNestingWorkshop(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);

	const itemSelectionOptions = NESTING_WORKSHOP.items.map(
		({ name, cosmetics, cosmeticDisplay }) => {
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
		},
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

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		BACK_TO_START_BUTTON,
		{
			type: ComponentType.Button,
			custom_id: CATALOGUE_VIEW_START_CUSTOM_ID,
			emoji: { name: "⏪" },
			label: "Back",
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CATALOGUE_ITEMS_EVERYTHING_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
			disabled: nestingWorkshopProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: I_HAVE_EVERYTHING,
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				accent_color: DEFAULT_EMBED_COLOUR,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: "## Nesting Workshop\n-# Catalogue",
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: progress(NESTING_WORKSHOP.items, catalogue?.data).offerDescription.join("\n"),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CATALOGUE_VIEW_OFFER_1_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
								max_values: itemSelectionOptions1.length,
								min_values: 0,
								options: itemSelectionOptions1,
								placeholder: "Select what you have!",
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CATALOGUE_VIEW_OFFER_2_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
								max_values: itemSelectionOptions2.length,
								min_values: 0,
								options: itemSelectionOptions2,
								placeholder: "Select what you have!",
							},
						],
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CATALOGUE_VIEW_OFFER_3_CUSTOM_ID}§${CatalogueType.NestingWorkshop}`,
								max_values: itemSelectionOptions3.length,
								min_values: 0,
								options: itemSelectionOptions3,
								placeholder: "Select what you have!",
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
						components: actionRowComponents,
					},
				],
			},
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

	await update(invoker.id, { data: catalogue ? catalogue.data.union(allCosmetics) : allCosmetics });
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

	await update(invoker.id, { data: catalogue ? catalogue.data.union(allCosmetics) : allCosmetics });
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

	await update(invoker.id, { data: catalogue ? catalogue.data.union(allCosmetics) : allCosmetics });
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

	await update(invoker.id, {
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
			case CatalogueType.PermanentEventStore: {
				await setPermanentEventStoreItems(interaction);
				return;
			}
			case CatalogueType.NestingWorkshop: {
				await setNestingWorkshopItems(interaction);
				return;
			}
			default: {
				pino.error(interaction, "Could not parse items to set.");

				await client.api.interactions.updateMessage(
					interaction.id,
					interaction.token,
					ERROR_RESPONSE_COMPONENTS_V2,
				);
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

	const { data, show_everything_button } = await update(invoker.id, {
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

	const { data, show_everything_button } = await update(invoker.id, {
		data: calculateSetItems(interaction, event.allCosmetics, catalogue?.data),
	});

	await viewEvent(interaction, event, { data, showEverythingButton: show_everything_button });
}

async function setStarterPacksItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(invoker.id, {
		data: calculateSetItems(interaction, STARTER_PACKS.allCosmetics, catalogue?.data),
	});

	await viewStarterPacks(interaction);
}

async function setSecretAreaItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(invoker.id, {
		data: calculateSetItems(interaction, SECRET_AREA.allCosmetics, catalogue?.data),
	});

	await viewSecretArea(interaction);
}

async function setPermanentEventStoreItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(invoker.id, {
		data: calculateSetItems(interaction, PERMANENT_EVENT_STORE.allCosmetics, catalogue?.data),
	});

	await viewPermanentEventStore(interaction);
}

async function setNestingWorkshopItems(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);

	await update(invoker.id, {
		data: calculateSetItems(interaction, NESTING_WORKSHOP.allCosmetics, catalogue?.data),
	});

	await viewNestingWorkshop(interaction);
}

export async function updateEverythingButtonSetting(
	interaction: APIMessageComponentButtonInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const customId = interaction.data.custom_id;
	const setting = Number(customId.slice(customId.indexOf("§") + 1));
	await update(invoker.id, { showEverythingButton: !setting });
	await viewSettings(interaction);
}

interface CatalogueUpdateOptions {
	data?: ReadonlySet<number>;
	showEverythingButton?: boolean;
}

type CatalogueUpdatePayload = Partial<Omit<CataloguePacket, "user_id">>;

async function update(userId: Snowflake, { data, showEverythingButton }: CatalogueUpdateOptions) {
	const payload: CatalogueUpdatePayload = {};
	const mergeFields: (keyof CatalogueUpdatePayload)[] = [];

	if (data) {
		mergeFields.push("data");
		payload.data = [...data];
	}

	if (showEverythingButton !== undefined) {
		mergeFields.push("show_everything_button");
		payload.show_everything_button = showEverythingButton;
	}

	const [cataloguePacket] = await pg<CataloguePacket>(Table.Catalogue)
		.insert({ user_id: userId, ...payload })
		.onConflict("user_id")
		.merge(mergeFields)
		.returning("*");

	return { ...cataloguePacket!, data: new Set(cataloguePacket!.data) };
}
