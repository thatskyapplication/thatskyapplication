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
	type CataloguePacket,
	ELDER_SPIRITS,
	type ElderSpirit,
	type Emoji,
	type Event,
	EventId,
	type EventIds,
	formatEmoji,
	friendshipTreeToItems,
	type GuideSpirit,
	type Item,
	type ItemCost,
	isRealm,
	REALM_SPIRITS,
	REALMS,
	type RealmName,
	resolveAllCosmeticsFromItems,
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
	Table,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { NESTING_WORKSHOP } from "../data/nesting-workshop.js";
import { PERMANENT_EVENT_STORE } from "../data/permanent-event-store.js";
import { SECRET_AREA } from "../data/secret-area.js";
import { STARTER_PACKS } from "../data/starter-packs.js";
import { client } from "../discord.js";
import pg from "../pg.js";
import { CatalogueType, resolveCostToString } from "../utility/catalogue.js";
import { CATALOGUE_EVENTS_THRESHOLD, MAXIMUM_TEXT_DISPLAY_LENGTH } from "../utility/constants.js";
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

const MAXIMUM_SEASONS_DISPLAY_LIMIT = 9 as const;

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
						: t(translation?.key ?? `cosmetic-names.${cosmetic}`, { lng: locale, ns: "general" });
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

function ownedProgress(items: readonly Item[], data: ReadonlySet<number> = new Set()) {
	const spentCosts: ItemCost[] = [];
	let total = 0;

	for (const { cosmetics, cost } of items) {
		total += cosmetics.length;

		if (cost && cosmetics.every((cosmetic) => data.has(cosmetic))) {
			spentCosts.push(cost);
		}
	}

	return {
		owned: resolveAllCosmeticsFromItems(items).filter((cosmetic) => data.has(cosmetic)),
		total,
		spentCosts,
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

		const { owned, total: offerTotal } = ownedProgress(friendshipTreeToItems(offer), data);
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
		const friendshipTrees = [season.guide.current, ...season.spirits.map((spirit) => spirit.items)];

		for (const friendshipTree of friendshipTrees) {
			const { owned, total: offerTotal } = ownedProgress(
				friendshipTreeToItems(friendshipTree),
				data,
			);
			totalOwned.push(...owned);
			total += offerTotal;
		}

		const { owned, total: offerTotal } = ownedProgress(season.items, data);
		totalOwned.push(...owned);
		total += offerTotal;
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

function starterPackOwnedProgress(data: ReadonlySet<number> = new Set()) {
	return ownedProgress(STARTER_PACKS.items, data);
}

function starterPackProgress(data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = starterPackOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function secretAreaOwnedProgress(data: ReadonlySet<number> = new Set()) {
	return ownedProgress(SECRET_AREA.items, data);
}

function secretAreaProgress(data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = secretAreaOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function permanentEventStoreOwnedProgress(data: ReadonlySet<number> = new Set()) {
	return ownedProgress(PERMANENT_EVENT_STORE.items, data);
}

function permanentEventStoreProgress(data: ReadonlySet<number>, round?: boolean) {
	const { owned, total } = permanentEventStoreOwnedProgress(data);
	return progressPercentage(owned, total, round);
}

function nestingWorkshopOwnedProgress(data: ReadonlySet<number> = new Set()) {
	return ownedProgress(NESTING_WORKSHOP.items, data);
}

function nestingWorkshopProgress(data: ReadonlySet<number>, round?: boolean) {
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
	const itemCosts = [];

	for (const { cosmetics, cost } of items) {
		if (cost && cosmetics.some((cosmetic) => !data.has(cosmetic))) {
			itemCosts.push(cost);
		}
	}

	const result = addCosts(itemCosts);

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

		const { remainingCurrencyResult, offerDescription } = progress(
			locale,
			friendshipTreeToItems(offer),
			data,
		);

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

		const { remainingCurrencyResult, offerDescription } = progress(locale, event.offer, data);

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
		progress(locale, items, data);

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

		// Days of Mischief 2025 is pretty big. Remove the preview until there is a better solution.
		if (offerProgress.events.has(EventId.DaysOfMischief2025)) {
			const event = offerProgress.events.get(EventId.DaysOfMischief2025)!;
			offerProgress.events.set(
				EventId.DaysOfMischief2025,
				`${event.slice(0, event.indexOf("\n"))}\n\nPreview is too big!`,
			);
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
	const spentCosts: ItemCost[] = [];
	const standardOwned = [];
	let standardTotal = 0;
	const elderOwned = [];
	let elderTotal = 0;
	const seasonalOwned = [];
	let seasonalTotal = 0;
	const eventOwned = [];
	let eventTotal = 0;

	for (const spirit of STANDARD_SPIRITS.values()) {
		const items = friendshipTreeToItems(spirit.current);
		const { owned, total, spentCosts: itemSpentCosts } = ownedProgress(items, data);
		standardOwned.push(...owned);
		standardTotal += total;
		spentCosts.push(...itemSpentCosts);
	}

	const standardProgress = progressPercentage(standardOwned, standardTotal, true);

	for (const spirit of ELDER_SPIRITS.values()) {
		const items = friendshipTreeToItems(spirit.current);
		const { owned, total, spentCosts: itemSpentCosts } = ownedProgress(items, data);
		elderOwned.push(...owned);
		elderTotal += total;
		spentCosts.push(...itemSpentCosts);
	}

	const elderProgress = progressPercentage(elderOwned, elderTotal, true);

	for (const season of skySeasons().values()) {
		const guideItems = friendshipTreeToItems(season.guide.current);
		const guideOwnedProgress = ownedProgress(guideItems, data);
		seasonalOwned.push(...guideOwnedProgress.owned);
		seasonalTotal += guideOwnedProgress.total;
		spentCosts.push(...guideOwnedProgress.spentCosts);

		for (const spirit of season.spirits.values()) {
			const items = friendshipTreeToItems(spirit.items);
			const spiritOwnedProgress = ownedProgress(items, data);
			seasonalOwned.push(...spiritOwnedProgress.owned);
			seasonalTotal += spiritOwnedProgress.total;
			spentCosts.push(...spiritOwnedProgress.spentCosts);
		}

		const seasonItemsOwnedProgress = ownedProgress(season.items, data);
		seasonalOwned.push(...seasonItemsOwnedProgress.owned);
		seasonalTotal += seasonItemsOwnedProgress.total;
		spentCosts.push(...seasonItemsOwnedProgress.spentCosts);
	}

	const seasonalProgress = progressPercentage(seasonalOwned, seasonalTotal, true);

	for (const event of skyEvents().values()) {
		const eventOwnedProgress = ownedProgress(event.offer, data);
		eventOwned.push(...eventOwnedProgress.owned);
		eventTotal += eventOwnedProgress.total;
		spentCosts.push(...eventOwnedProgress.spentCosts);
	}

	const eventProgressResult = progressPercentage(eventOwned, eventTotal, true);
	const starterPackOwnedProgressResult = starterPackOwnedProgress(data);

	const starterPackProgressResult = progressPercentage(
		starterPackOwnedProgressResult.owned,
		starterPackOwnedProgressResult.total,
		true,
	);

	spentCosts.push(...starterPackOwnedProgressResult.spentCosts);
	const secretAreaOwnedProgressResult = secretAreaOwnedProgress(data);

	const secretAreaProgressResult = progressPercentage(
		secretAreaOwnedProgressResult.owned,
		secretAreaOwnedProgressResult.total,
		true,
	);

	spentCosts.push(...secretAreaOwnedProgressResult.spentCosts);
	const permanentEventStoreOwnedProgressResult = permanentEventStoreOwnedProgress(data);

	const permanentEventStoreProgressResult = progressPercentage(
		permanentEventStoreOwnedProgressResult.owned,
		permanentEventStoreOwnedProgressResult.total,
		true,
	);

	spentCosts.push(...permanentEventStoreOwnedProgressResult.spentCosts);
	const nestingWorkshopOwnedProgressResult = nestingWorkshopOwnedProgress(data);

	const nestingWorkshopProgressResult = progressPercentage(
		nestingWorkshopOwnedProgressResult.owned,
		nestingWorkshopOwnedProgressResult.total,
		true,
	);

	spentCosts.push(...nestingWorkshopOwnedProgressResult.spentCosts);

	const totalSpent = addCosts(spentCosts);
	const totalSpentString = resolveCostToString(totalSpent, { formatNumber: true, locale });
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
			: t("catalogue.current-season-fallback", { lng: locale, ns: "features" }),
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
						label: t("catalogue.current-event-fallback", { lng: locale, ns: "features" }),
						disabled: true,
					},
				]
			: events.reduce<APIButtonComponentWithCustomId[]>((buttons, event) => {
					const button: APIButtonComponentWithCustomId = {
						type: ComponentType.Button,
						style: ButtonStyle.Success,
						custom_id: `${CustomId.CatalogueViewEvent}§${event.id}`,
						label: t(`events.${event.id}`, { lng: locale, ns: "general" }),
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

	return [
		{
			type: ComponentType.Container,
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
						custom_id: CustomId.CatalogueSettings,
						emoji: MISCELLANEOUS_EMOJIS.Settings,
					},
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `### ${t("catalogue.main-description", { lng: locale, ns: "features" })}`,
						},
					],
				},
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.main-total-spent", { lng: locale, ns: "features" })}\n\n${totalSpentString.length > 0 ? `${totalSpentString.join(" ")}\n-# ${t("catalogue.main-total-spent-subtext", { lng: locale, ns: "features" })}` : t("catalogue.main-total-spent-nothing", { lng: locale, ns: "features" })}\n\n${t("catalogue.main-total-progress", { lng: locale, ns: "features", progress: allProgress(data, true) })}`,
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
							content: `### ${t("catalogue.seasons", { lng: locale, ns: "features" })}\n\n${seasonalProgress === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: seasonalProgress })}`,
						},
					],
				},
				{
					type: ComponentType.Section,
					accessory: {
						type: ComponentType.Button,
						style: ButtonStyle.Primary,
						custom_id: CustomId.CatalogueViewEventYears,
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
						custom_id: CustomId.CatalogueViewPermanentEventStore,
						label: t("view", { lng: locale, ns: "general" }),
					},
					components: [
						{
							type: ComponentType.TextDisplay,
							content: `### ${t("catalogue.permanent-event-store", { lng: locale, ns: "features" })}\n\n${permanentEventStoreProgressResult === null ? t("catalogue.main-no-progress", { lng: locale, ns: "features" }) : t("catalogue.main-progress", { lng: locale, ns: "features", number: permanentEventStoreProgressResult })}`,
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
					type: ComponentType.Separator,
					divider: true,
					spacing: SeparatorSpacingSize.Small,
				},
				{
					type: ComponentType.TextDisplay,
					content: `### ${t("catalogue.quick-access", { lng: locale, ns: "features" })}`,
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
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.ActionRow,
						components: [
							backToStartButton(locale),
							{
								type: ComponentType.Button,
								custom_id: CustomId.CatalogueViewStart,
								emoji: { name: "⏪" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
								style: ButtonStyle.Secondary,
							},
						],
					},
				],
			},
		],
	});
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
		let content = `### ${t(`realms.${realm.name}`, { lng: locale, ns: "general" })}`;
		const percentage = spiritProgress([...realm.spirits.values()], catalogue?.data, true);
		content += percentage === null ? "" : ` (${percentage}%)`;
		const itemCosts: ItemCost[] = [];

		for (const spirit of realm.spirits.values()) {
			itemCosts.push(remainingCurrency(friendshipTreeToItems(spirit.current), catalogue?.data));
		}

		const remainingCurrencyResult = resolveCostToString(addCosts(itemCosts));
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

	containerComponents.push(
		{
			type: ComponentType.TextDisplay,
			content: `-# ${t("catalogue.realms-percentage-note", { lng: locale, ns: "features" })}`,
		},
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [
				backToStartButton(locale),
				{
					type: ComponentType.Button,
					custom_id: CustomId.CatalogueViewStart,
					emoji: { name: "⏪" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
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

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		backToStartButton(locale),
		{
			type: ComponentType.Button,
			custom_id: CustomId.CatalogueViewRealms,
			emoji: { name: "⏪" },
			label: t("navigation-back", { lng: locale, ns: "general" }),
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueRealmEverything}§${realm}`,
			disabled: hasEverything,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
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

	const actionRowComponents: APIComponentInMessageActionRow[] = [
		backToStartButton(locale),
		{
			type: ComponentType.Button,
			custom_id: CustomId.CatalogueViewStart,
			emoji: { name: "⏪" },
			label: t("navigation-back", { lng: locale, ns: "general" }),
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: CustomId.CatalogueEldersEverything,
			disabled: hasEverything,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
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
				components: containerComponents,
			},
		],
	});
}

export async function viewSeasons(interaction: APIMessageComponentButtonInteraction) {
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

	const page = Number(
		interaction.data.custom_id.slice(interaction.data.custom_id.indexOf("§") + 1),
	);

	const offset = (page - 1) * MAXIMUM_SEASONS_DISPLAY_LIMIT;
	const limit = offset + MAXIMUM_SEASONS_DISPLAY_LIMIT;
	const maximumPage = Math.ceil(seasons.size / MAXIMUM_SEASONS_DISPLAY_LIMIT);

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

		const seasonalProgress = seasonProgress([season], catalogue?.data, true);

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
		},
		{
			type: ComponentType.ActionRow,
			components: [
				backToStartButton(locale),
				{
					type: ComponentType.Button,
					custom_id: CustomId.CatalogueViewStart,
					emoji: { name: "⏪" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
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
		const itemsOptions = season.items.map(({ translation, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue?.data.has(cosmetic)),
				label: t(translation?.key ?? `cosmetic-names.${cosmeticDisplay}`, {
					lng: interaction.locale,
					ns: "general",
					number: translation?.number,
				}),
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

	if (catalogue?.show_everything_button) {
		containerComponents.push({
			type: ComponentType.ActionRow,
			components: [
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueSeasonEverything}§${seasonId}`,
					disabled: hasEverything,
					emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
					label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
					style: ButtonStyle.Success,
				},
			],
		});
	}

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

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [previousSeasonButton, nextSeasonButton],
		},
		{
			type: ComponentType.ActionRow,
			components: [
				backToStartButton(locale),
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueViewSeasons}§${Math.ceil((season.id + 1) / MAXIMUM_SEASONS_DISPLAY_LIMIT)}`,
					emoji: { name: "⏪" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
		],
	});
}

export async function viewEventYears(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("catalogue.event-years-title", { lng: locale, ns: "features" }),
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: t("catalogue.event-years-description", { lng: locale, ns: "features" }),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: CustomId.CatalogueViewEventYear,
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
								placeholder: t("catalogue.event-years-select-year-string-select-menu-placeholder", {
									lng: locale,
									ns: "features",
								}),
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
							backToStartButton(locale),
							{
								type: ComponentType.Button,
								custom_id: CustomId.CatalogueViewStart,
								emoji: { name: "⏪" },
								label: t("navigation-back", { lng: locale, ns: "general" }),
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
	const title = t("catalogue.events-title", { lng: locale, ns: "features", year });

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
		limit:
			MAXIMUM_TEXT_DISPLAY_LENGTH -
			title.length -
			(events.size > CATALOGUE_EVENTS_THRESHOLD ? "\n".length * events.size : 0),
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
						custom_id: CustomId.CatalogueViewEvent,
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
						placeholder: t("catalogue.events-select-event-string-select-menu-placeholder", {
							lng: locale,
							ns: "features",
						}),
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
					custom_id: `${CustomId.CatalogueViewEvent}§${id}`,
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
					custom_id: `${CustomId.CatalogueViewEventYear}§${before}`,
					disabled: !before,
					emoji: { name: "⬅️" },
					label: t("catalogue.events-previous-year", { lng: locale, ns: "features" }),
					style: ButtonStyle.Secondary,
				},
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueViewEventYear}§${after}`,
					disabled: !after,
					emoji: { name: "➡️" },
					label: t("catalogue.events-next-year", { lng: locale, ns: "features" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
		{
			type: ComponentType.ActionRow,
			components: [
				backToStartButton(locale),
				{
					type: ComponentType.Button,
					custom_id: CustomId.CatalogueViewEventYears,
					emoji: { name: "⏪" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
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

	containerComponents.push(
		{
			type: ComponentType.Separator,
			divider: true,
			spacing: SeparatorSpacingSize.Small,
		},
		{
			type: ComponentType.ActionRow,
			components: [backToStartButton(locale)],
		},
	);

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
		const itemSelectionOptions = friendshipTreeToItems(friendshipTree).map(
			({ translation, cosmetics, cosmeticDisplay, regularHeart }) => {
				const stringSelectMenuOption: APISelectMenuOption = {
					default: cosmetics.every((cosmetic) => data?.has(cosmetic)),
					label: t(translation?.key ?? `cosmetic-names.${cosmeticDisplay}`, {
						lng: locale,
						ns: "general",
						number: translation?.number,
					}),
					value: JSON.stringify(cosmetics),
				};

				// Too complex to represent. Assert.
				const emoji = regularHeart
					? (MISCELLANEOUS_EMOJIS.Heart as Emoji)
					: (CosmeticToEmoji[cosmeticDisplay] as Emoji);

				if (emoji) {
					stringSelectMenuOption.emoji = emoji;
				}

				return stringSelectMenuOption;
			},
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

	containerComponents.push({
		type: ComponentType.ActionRow,
		components: [
			backToStartButton(locale),
			{
				type: ComponentType.Button,
				custom_id: isElderSpirit
					? CustomId.CatalogueViewElders
					: isStandardSpirit
						? `${CustomId.CatalogueViewRealm}§${spirit.realm}`
						: `${CustomId.CatalogueViewSeason}§${spirit.seasonId}`,
				emoji:
					isSeasonalSpirit || isGuideSpirit
						? (SeasonIdToSeasonalEmoji[spirit.seasonId] ?? { name: "⏪" })
						: { name: "⏪" },
				label: t("navigation-back", { lng: locale, ns: "general" }),
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
	const { id, start, offer, offerInfographicURL, patchNotesURL } = event;

	const titleEvent = t("catalogue.event-title", {
		lng: locale,
		ns: "features",
		event: `[${t(`events.${id}`, { lng: locale, ns: "general" })}](${t(`event-wiki.${id}`, { lng: locale, ns: "general" })})`,
		year: event.start.year,
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
		const itemSelectionOptions = offer.map(({ translation, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => data?.has(cosmetic)),
				label: t(translation?.key ?? `cosmetic-names.${cosmeticDisplay}`, {
					lng: interaction.locale,
					ns: "general",
					number: translation?.number,
				}),
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

	const events = skyEvents().filter((event) => event.start.year === start.year);
	const before = events.get((id - 1) as EventIds);
	const after = events.get((id + 1) as EventIds);

	// It is possible that for the first event of a year, the custom ids will be the same, leading to an error.
	// We use the nullish coalescing operator to fallback to some default values to mitigate this.
	const actionRowComponents: APIComponentInMessageActionRow[] = [
		{
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueViewEvent}§${before?.id ?? "before"}`,
			disabled: !before,
			emoji: { name: "⬅️" },
			label: t("catalogue.event-previous-event", { lng: locale, ns: "features" }),
			style: ButtonStyle.Secondary,
		},
		{
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueViewEvent}§${after?.id ?? "after"}`,
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
			disabled: eventProgress([event], data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
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
				backToStartButton(locale),
				{
					type: ComponentType.Button,
					custom_id: `${CustomId.CatalogueViewEventYear}§${start.year}`,
					emoji: { name: "⏪" },
					label: t("navigation-back", { lng: locale, ns: "general" }),
					style: ButtonStyle.Secondary,
				},
			],
		},
	);

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: containerComponents,
			},
		],
	});
}

export async function viewStarterPacks(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const invoker = interactionInvoker(interaction);
	const catalogue = await fetchCatalogue(invoker.id);
	const { locale } = interaction;

	const itemSelectionOptions = STARTER_PACKS.items.map(
		({ translation, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue?.data.has(cosmetic)),
				label: t(translation?.key ?? `cosmetic-names.${cosmeticDisplay}`, {
					lng: interaction.locale,
					ns: "general",
					number: translation?.number,
				}),
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
		backToStartButton(locale),
		{
			type: ComponentType.Button,
			custom_id: CustomId.CatalogueViewStart,
			emoji: { name: "⏪" },
			label: t("navigation-back", { lng: locale, ns: "general" }),
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.StarterPacks}`,
			disabled: starterPackProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
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

export async function viewSecretArea(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const itemSelectionOptions = SECRET_AREA.items.map(
		({ translation, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue?.data.has(cosmetic)),
				label: t(translation?.key ?? `cosmetic-names.${cosmeticDisplay}`, {
					lng: interaction.locale,
					ns: "general",
					number: translation?.number,
				}),
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
		backToStartButton(locale),
		{
			type: ComponentType.Button,
			custom_id: CustomId.CatalogueViewStart,
			emoji: { name: "⏪" },
			label: t("navigation-back", { lng: locale, ns: "general" }),
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.SecretArea}`,
			disabled: secretAreaProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
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

export async function viewPermanentEventStore(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const itemSelectionOptions = PERMANENT_EVENT_STORE.items.map(
		({ translation, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue?.data.has(cosmetic)),
				label: t(translation?.key ?? `cosmetic-names.${cosmeticDisplay}`, {
					lng: interaction.locale,
					ns: "general",
					number: translation?.number,
				}),
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
		backToStartButton(locale),
		{
			type: ComponentType.Button,
			custom_id: CustomId.CatalogueViewStart,
			emoji: { name: "⏪" },
			label: t("navigation-back", { lng: locale, ns: "general" }),
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.PermanentEventStore}`,
			disabled: permanentEventStoreProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: t("catalogue.permanent-event-store-title", { lng: locale, ns: "features" }),
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
							PERMANENT_EVENT_STORE.items,
							catalogue?.data,
						).offerDescription.join("\n"),
					},
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.StringSelect,
								custom_id: `${CustomId.CatalogueViewOffer1}§${CatalogueType.PermanentEventStore}`,
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

export async function viewNestingWorkshop(
	interaction: APIMessageComponentButtonInteraction | APIMessageComponentSelectMenuInteraction,
) {
	const catalogue = await fetchCatalogue(interactionInvoker(interaction).id);
	const { locale } = interaction;

	const itemSelectionOptions = NESTING_WORKSHOP.items.map(
		({ translation, cosmetics, cosmeticDisplay }) => {
			const stringSelectMenuOption: APISelectMenuOption = {
				default: cosmetics.every((cosmetic) => catalogue?.data.has(cosmetic)),
				label: t(translation?.key ?? `cosmetic-names.${cosmeticDisplay}`, {
					lng: interaction.locale,
					ns: "general",
					number: translation?.number,
				}),
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
		backToStartButton(locale),
		{
			type: ComponentType.Button,
			custom_id: CustomId.CatalogueViewStart,
			emoji: { name: "⏪" },
			label: t("navigation-back", { lng: locale, ns: "general" }),
			style: ButtonStyle.Secondary,
		},
	];

	if (catalogue?.show_everything_button) {
		actionRowComponents.push({
			type: ComponentType.Button,
			custom_id: `${CustomId.CatalogueItemsEverything}§${CatalogueType.NestingWorkshop}`,
			disabled: nestingWorkshopProgress(catalogue?.data) === 100,
			emoji: MISCELLANEOUS_EMOJIS.ConstellationFlag,
			label: t("catalogue.i-have-everything-button-label", { lng: locale, ns: "features" }),
			style: ButtonStyle.Success,
		});
	}

	await client.api.interactions.updateMessage(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
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
