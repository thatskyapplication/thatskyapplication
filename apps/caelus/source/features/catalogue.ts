import {
	type APIButtonComponentWithCustomId,
	type APIComponentInContainer,
	type APIMessageComponentButtonInteraction,
	type APIMessageComponentSelectMenuInteraction,
	type APIMessageTopLevelComponent,
	ButtonStyle,
	ComponentType,
	type Locale,
	SeparatorSpacingSize,
	type Snowflake,
} from "@discordjs/core";
import {
	ELDER_SPIRITS,
	type ElderSpirit,
	type Event,
	type GuideSpirit,
	type Item,
	REALMS,
	REALM_SPIRITS,
	STANDARD_SPIRITS,
	type Season,
	type SeasonalSpirit,
	type StandardSpirit,
	addCosts,
	formatEmoji,
	resolveAllCosmetics,
	resolveReturningSpirits,
	resolveTravellingSpirit,
	skyCurrentEvents,
	skyCurrentSeason,
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
import { CatalogueType, resolveCostToString } from "../utility/catalogue.js";
import { DEFAULT_EMBED_COLOUR } from "../utility/constants.js";
import {
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "../utility/emojis.js";
import { interactionInvoker } from "../utility/functions.js";

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

export interface CataloguePacket {
	user_id: Snowflake;
	data: number[];
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
	data: ReadonlySet<number>,
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

function seasonProgress(seasons: readonly Season[], data: ReadonlySet<number>, round?: boolean) {
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

function eventProgress(events: readonly Event[], data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = eventOwnedProgress(events, data);
	return progressPercentage(owned, total, round);
}

function starterPackOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(STARTER_PACKS.items, data);
}

function starterPackProgress(data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = starterPackOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function secretAreaOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(SECRET_AREA.items, data);
}

function secretAreaProgress(data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = secretAreaOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function permanentEventStoreOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(PERMANENT_EVENT_STORE.items, data);
}

function permanentEventStoreProgress(data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = permanentEventStoreOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function nestingWorkshopOwnedProgress(data: ReadonlySet<number>) {
	return ownedProgress(NESTING_WORKSHOP.items, data);
}

function nestingWorkshopProgress(data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = nestingWorkshopOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function allProgress(data: ReadonlySet<number>, round?: boolean) {
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
	data: ReadonlySet<number>,
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

async function fetch(userId: Snowflake) {
	const catalogue = await pg<CataloguePacket>(Table.Catalogue).where({ user_id: userId }).first();
	return catalogue ? { ...catalogue, data: new Set(catalogue.data) } : null;
}

interface CatalogueStartOptions {
	userId: Snowflake;
	locale: Locale;
}

export async function start({
	userId,
	locale,
}: CatalogueStartOptions): Promise<[APIMessageTopLevelComponent]> {
	const catalogue = await fetch(userId);
	const data = catalogue?.data;
	const standardProgress = data ? spiritProgress([...STANDARD_SPIRITS.values()], data, true) : null;
	const elderProgress = data ? spiritProgress([...ELDER_SPIRITS.values()], data, true) : null;
	const seasonalProgress = data ? seasonProgress([...skySeasons().values()], data, true) : null;
	const eventProgressResult = data ? eventProgress([...skyEvents().values()], data, true) : null;
	const starterPackProgressResult = data ? starterPackProgress(data, true) : null;
	const secretAreaProgressResult = data ? secretAreaProgress(data, true) : null;
	const permanentEventStoreProgressResult = data ? permanentEventStoreProgress(data, true) : null;
	const nestingWorkshopProgressResult = data ? nestingWorkshopProgress(data, true) : null;
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

	let message =
		"Welcome to your catalogue!\n\nHere, you can track all the cosmetics in the game, with dynamic calculations, such as remaining seasonal candles for an active season, making this a powerful tool to use.";

	if (data) {
		message += `\n\nTotal Progress: ${allProgress(data, true)}%`;
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
					content: message,
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

		if (catalogue) {
			const percentage = spiritProgress([...realm.spirits.values()], catalogue.data, true);
			content += percentage === null ? "" : ` (${percentage}%)`;

			const remainingCurrencyResult = resolveCostToString(
				realm.spirits.reduce(
					(remainingCurrencyResult, spirit) =>
						addCosts([remainingCurrencyResult, remainingCurrency(spirit.current, catalogue.data)]),
					{},
				),
			);

			if (remainingCurrencyResult) {
				content += `\n\n${remainingCurrencyResult.length > 0 ? remainingCurrencyResult.join("") : formatEmoji(MISCELLANEOUS_EMOJIS.Yes)}`;
			}
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
