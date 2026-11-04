import type { i18n as I18n, TFunction } from "i18next";
import {
	isPublishedPatchNote,
	LATEST_MAJOR_PATCH_NOTES,
	PATCH_NOTES,
	type PatchNote,
	patchNoteVersion,
	thisMonthInSkyURL,
} from "@thatskyapplication/sky-links";
import {
	CatalogueSearchType,
	catalogueSeasonItems,
	catalogueSpiritItems,
	checklistResetPayload,
	communityUpcomingEvents,
	currentNestingWorkshop,
	dailyQuestLabel,
	type Emoji,
	type fetchDailyGuides,
	isActive,
	isDailyQuest,
	type Item,
	itemName,
	KINGDOM,
	nextNestingWorkshop,
	type Packet,
	partitionItemCosts,
	resolveReturningSpirits,
	returningSpiritsSchedule,
	ScheduleType,
	ScheduleTypeToLocaleKey,
	type Season,
	SeasonId,
	shardEruption,
	skyCurrentEvents,
	skyCurrentEventsWithEventTickets,
	skyCurrentSeason,
	skyUpcomingEvents,
	skyUpcomingSeason,
	type Spirit,
	spirits,
	type SpiritIds,
	sumCosts,
	TIME_ZONE,
	travellingSpiritSchedule,
	upcomingMaintenancePeriods,
	nextDailyReset,
} from "@thatskyapplication/utility";
import {
	catalogueLocation,
	cosmeticName,
	itemOfferTile,
	type OfferTile,
	releasedCosmetics,
} from "~/utility/cosmetics.js";
import { DyeTypeToEmoji, SeasonIdToSeasonalEmoji, seasonalCandleEmoji } from "~/utility/emojis.js";
import {
	DOUBLE_HEART_PERIODS,
	DOUBLE_TREASURE_CANDLE_PERIODS,
	doubleSeasonalLightPeriods,
	NESTING_WORKSHOP_CATALOGUE_URL,
	RADIANCE_PERIODS,
	RETURNING_SPIRITS_CATALOGUE_URL,
	SCHEDULE_TYPE_TO_WIKI_KEY,
} from "~/utility/schedule.js";
import { spiritWikiLink } from "~/utility/spirits.js";
import {
	maintenanceBannerLabels,
	shardEruptionTimestampLabels,
	type TimePreferences,
} from "~/utility/time.js";
import type {
	ActiveCard,
	ActiveEntry,
	CardNote,
	ChecklistToggleData,
	Offer,
	SpiritOffer,
	SpiritTree,
	TodayView,
	UpcomingRow,
} from "~/utility/whats-happening-in-sky.js";

type ContextualChecklistColumn =
	| "daily_quests"
	| "event_tickets"
	| "nesting_workshop"
	| "seasonal_candles"
	| "shard_eruptions";

type Checklist = Partial<Packet<"checklist">> | null;

interface ViewContext {
	catalogue: ReturnType<typeof releasedCosmetics>["catalogue"];
	checklist: Checklist;
	dateTimeFormat: Intl.DateTimeFormat;
	i18n: I18n;
	now: Temporal.ZonedDateTime;
	owned: ReadonlySet<number> | null;
	preferences: TimePreferences;
	relativeDays: Intl.RelativeTimeFormat;
	seasonPassEmoji: Emoji | null;
	t: TFunction;
	today: Temporal.PlainDate;
}

interface UpcomingEvent extends Omit<UpcomingRow, "relative" | "when"> {
	start: Temporal.ZonedDateTime;
}

function periodDetails(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
	{ dateTimeFormat, now, t }: ViewContext,
) {
	const firstDay = start.toPlainDate();
	const lastDay = end.subtract({ nanoseconds: 1 }).toPlainDate();
	const today = now.toPlainDate();
	const daysLeft = today.until(lastDay).days;

	return {
		dayOf: t("whats-happening-in-sky.day-of", {
			ns: "features",
			day: firstDay.until(today).days + 1,
			total: firstDay.until(lastDay).days + 1,
		}),
		daysLeft:
			daysLeft === 0
				? t("whats-happening-in-sky.ends-today", { ns: "features" })
				: t("whats-happening-in-sky.days-left", { ns: "features", count: daysLeft }),
		ends: t("schedule.overview-ends-timestamp", {
			ns: "features",
			timestamp: dateTimeFormat.format(end.epochMilliseconds),
		}),
	};
}

function upcomingTiming(
	start: Temporal.ZonedDateTime,
	{ dateTimeFormat, preferences: { timeZone }, relativeDays, today }: ViewContext,
) {
	return {
		relative: relativeDays.format(
			today.until(start.withTimeZone(timeZone).toPlainDate()).days,
			"day",
		),
		when: dateTimeFormat.format(start.epochMilliseconds),
	};
}

function nextTiming(start: Temporal.ZonedDateTime, context: ViewContext) {
	const { relative, when } = upcomingTiming(start, context);

	return {
		relative,
		when: context.t("schedule.overview-next-timestamp", { ns: "features", timestamp: when }),
	};
}

function resolveTile(
	item: Item,
	{ catalogue, i18n, owned, seasonPassEmoji, t }: ViewContext,
): OfferTile {
	const nameKeys = catalogue.get(item.cosmeticDisplay)?.nameKeys;

	return itemOfferTile(item, {
		name: nameKeys ? cosmeticName(nameKeys, i18n, t) : itemName(item, t),
		owned: owned !== null && item.cosmetics.every((cosmetic) => owned.has(cosmetic)),
		seasonPassEmoji: item.seasonPass ? seasonPassEmoji : null,
	});
}

function resolveTiles(items: readonly Item[], context: ViewContext) {
	return items.map((item) => resolveTile(item, context));
}

function resolveTreeLevels(spirit: Spirit, context: ViewContext) {
	const levels: (readonly (OfferTile | null)[])[] = [];

	for (const level of spirit.displayFriendshipTree) {
		const lanes: (OfferTile | null)[] = [];

		for (const item of level) {
			lanes.push(item ? resolveTile(item, context) : null);
		}

		if (lanes.some((tile) => tile !== null)) {
			levels.push(lanes);
		}
	}

	return levels;
}

function offerSummary(
	items: readonly Item[],
	tiles: readonly OfferTile[],
	{ owned, t }: ViewContext,
) {
	return {
		ownedLabel:
			owned !== null && tiles.length > 0
				? t("whats-happening-in-sky.owned", {
						ns: "features",
						owned: tiles.filter((tile) => tile.owned).length,
						total: tiles.length,
					})
				: null,
		remaining: owned && sumCosts(partitionItemCosts(items, owned).remaining),
		total: sumCosts(partitionItemCosts(items).remaining),
	};
}

function spiritHeading(spirit: Spirit, t: TFunction) {
	return {
		key: `spirit-${spirit.id}`,
		label: t(`spirits.${spirit.id}`, { ns: "general" }),
		pageURL: `/spirits?spirit=${spirit.id}`,
	};
}

function resolveOffer(items: readonly Item[], context: ViewContext): Offer {
	const tiles = resolveTiles(items, context);
	return { ...offerSummary(items, tiles, context), flat: tiles, spirits: [], trees: [] };
}

function resolveSeasonOffer(season: Season, context: ViewContext): Offer {
	const seasonContext = { ...context, seasonPassEmoji: SeasonIdToSeasonalEmoji[season.id] };
	const itemTiles = resolveTiles(season.items, seasonContext);
	const itemOffers: SpiritOffer[] = [];
	const trees: SpiritTree[] = [];

	for (const spirit of season.spiritsWithGuide.values()) {
		const levels = resolveTreeLevels(spirit, seasonContext);

		if (levels.length > 0) {
			trees.push({ ...spiritHeading(spirit, context.t), levels });
		}
	}

	if (itemTiles.length > 0) {
		itemOffers.push({
			key: "items",
			label: context.t("catalogue.items", { ns: "features" }),
			tiles: itemTiles,
		});
	}

	const treeTiles = trees.flatMap(({ levels }) => levels.flat()).filter((tile) => tile !== null);

	return {
		...offerSummary(catalogueSeasonItems([season]), [...treeTiles, ...itemTiles], context),
		flat: [],
		spirits: itemOffers,
		trees,
	};
}

function resolveReturningSpiritsOffer(
	returningSpirits: readonly Spirit[],
	context: ViewContext,
): Offer {
	const spiritOffers: SpiritOffer[] = [];
	const tiles: OfferTile[] = [];

	for (const spirit of returningSpirits) {
		const spiritTiles = resolveTiles(catalogueSpiritItems([spirit]), context);

		if (spiritTiles.length > 0) {
			tiles.push(...spiritTiles);
			spiritOffers.push({ ...spiritHeading(spirit, context.t), tiles: spiritTiles });
		}
	}

	return {
		...offerSummary(catalogueSpiritItems(returningSpirits), tiles, context),
		flat: [],
		spirits: spiritOffers,
		trees: [],
	};
}

function hasCostLeft({ remaining, total }: Offer) {
	return (remaining ?? total).length > 0;
}

function checklistToggle(
	checklist: Checklist,
	column: ContextualChecklistColumn,
	completeLabel: string,
	incompleteLabel: string,
): ChecklistToggleData | undefined {
	return checklist && !checklist[`${column}_hidden` as const]
		? { column, complete: Boolean(checklist[column]), completeLabel, incompleteLabel }
		: undefined;
}

function seasonNotes(season: Season, context: ViewContext) {
	const { now, t } = context;
	const { emoji, name, source } = doubleSeasonalLightPeriods(season);
	const notes: CardNote[] = [];

	for (const { end, start } of source) {
		if (Temporal.ZonedDateTime.compare(end, now) <= 0) {
			continue;
		}

		const note = {
			emoji,
			key: `${name}-${start.epochMilliseconds}`,
			label: t(`general:event-names.${name}`),
		};

		if (isActive(start, end, now)) {
			const { daysLeft, ends } = periodDetails(start, end, context);
			notes.push({ ...note, relative: daysLeft, when: ends });
		} else {
			notes.push({ ...note, ...nextTiming(start, context) });
		}
	}

	return notes;
}

function seasonCard(season: Season, context: ViewContext): ActiveCard {
	const {
		checklist,
		now,
		preferences: { locale },
		t,
	} = context;

	const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
		season.remainingSeasonalCandles(checklist?.seasonal_candles ? nextDailyReset(now) : now);

	const { emoji, name, query, wikiURL } = catalogueLocation(
		{ type: CatalogueSearchType.Season, season },
		t,
	);

	const candleEmoji = seasonalCandleEmoji(season.id);
	const offer = resolveSeasonOffer(season, context);

	return {
		...periodDetails(season.start, season.end, context),
		catalogueURL: `/me/catalogue${query}`,
		earn:
			seasonalCandlesLeftWithSeasonPass > 0 && hasCostLeft(offer)
				? {
						emoji: candleEmoji,
						text: t("whats-happening-in-sky.seasonal-candles-left", {
							ns: "features",
							remaining: seasonalCandlesLeft.toLocaleString(locale),
							remainingSeasonPass: seasonalCandlesLeftWithSeasonPass.toLocaleString(locale),
						}),
					}
				: undefined,
		emoji,
		key: `season-${season.id}`,
		label: name,
		notes: seasonNotes(season, context),
		offer,
		toggle: checklistToggle(
			checklist,
			"seasonal_candles",
			t("checklist.seasonal-candles-message-complete", { ns: "features" }),
			t("checklist.seasonal-candles-message-incomplete", { ns: "features" }),
		),
		wide: true,
		wikiURL,
	};
}

function eventEntries(context: ViewContext) {
	const {
		checklist,
		now,
		preferences: { locale },
		t,
	} = context;

	const eventsWithTickets = skyCurrentEventsWithEventTickets(now);

	const eventTicketsToggle = checklistToggle(
		checklist,
		"event_tickets",
		t("checklist.event-tickets-message-complete", { ns: "features" }),
		t(
			eventsWithTickets.size > 1
				? "checklist.event-tickets-message-incomplete-all-events"
				: "checklist.event-tickets-message-incomplete",
			{ ns: "features" },
		),
	);

	const currentEvents = skyCurrentEvents(now).toSorted((a, b) =>
		Temporal.ZonedDateTime.compare(a.end, b.end),
	);

	const entries: ActiveEntry[] = [];

	for (const event of currentEvents.values()) {
		const { dailyEventTicketsLeft, poolEventTicketsLeft } = event.remainingEventTickets(
			checklist?.event_tickets ? nextDailyReset(now) : now,
		);
		const eventTicketsLeft = dailyEventTicketsLeft + (poolEventTicketsLeft ?? 0);
		const offer = resolveOffer(event.offer, context);

		const { emoji, name, query, wikiURL } = catalogueLocation(
			{ type: CatalogueSearchType.Event, event },
			t,
		);

		entries.push({
			...periodDetails(event.start, event.end, context),
			catalogueURL: `/me/catalogue${query}`,
			earn:
				eventTicketsLeft > 0 && hasCostLeft(offer)
					? {
							emoji,
							text: t("whats-happening-in-sky.event-tickets-left", {
								ns: "features",
								amount: eventTicketsLeft.toLocaleString(locale),
							}),
						}
					: undefined,
			emoji,
			key: `event-${event.id}`,
			label: name,
			offer,
			toggle:
				eventsWithTickets.size === 1 && eventsWithTickets.has(event.id)
					? eventTicketsToggle
					: undefined,
			wikiURL,
		});
	}

	if (eventTicketsToggle && eventsWithTickets.size > 1) {
		entries.push(eventTicketsToggle);
	}

	return entries;
}

function travellingSpiritCard(
	spiritId: SpiritIds,
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
	context: ViewContext,
): ActiveCard {
	const { t } = context;
	const spirit = spirits().get(spiritId)!;

	const { emoji, pageURL, query } = catalogueLocation(
		{ type: CatalogueSearchType.Spirit, spirit },
		t,
	);

	return {
		...periodDetails(start, end, context),
		catalogueURL: `/me/catalogue${query}`,
		emoji,
		key: `travelling-spirit-${start.epochMilliseconds}`,
		label: t("travelling-spirit", { ns: "general" }),
		offer: resolveOffer(catalogueSpiritItems([spirit]), context),
		pageURL,
		spiritLinks: [spiritWikiLink(spiritId, t)],
	};
}

function returningSpiritsCard(
	spiritIds: readonly SpiritIds[],
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
	context: ViewContext,
): ActiveCard {
	const { now, t } = context;
	const commonSeason = KINGDOM.commonSeasonOf(spiritIds);

	return {
		...periodDetails(start, end, context),
		catalogueURL: RETURNING_SPIRITS_CATALOGUE_URL,
		emoji: commonSeason && SeasonIdToSeasonalEmoji[commonSeason.id],
		key: `returning-spirits-${start.epochMilliseconds}`,
		label: t("returning-spirits", { ns: "general" }),
		offer: resolveReturningSpiritsOffer([...resolveReturningSpirits(now)!.values()], context),
		wide: true,
	};
}

function limitedPeriods(nextSeason: Season | null, context: ViewContext) {
	const { now, t } = context;
	const groups = [RADIANCE_PERIODS, DOUBLE_HEART_PERIODS, DOUBLE_TREASURE_CANDLE_PERIODS];

	if (nextSeason) {
		groups.push(doubleSeasonalLightPeriods(nextSeason));
	}

	const active: { card: ActiveCard; end: Temporal.ZonedDateTime }[] = [];
	const upcoming: UpcomingEvent[] = [];

	for (const { emoji, name, source } of groups) {
		for (const { dyes, end, start } of source) {
			if (Temporal.ZonedDateTime.compare(end, now) <= 0) {
				continue;
			}

			const period = {
				emoji,
				key: `${name}-${start.epochMilliseconds}`,
				label: t(`general:event-names.${name}`),
			};

			if (isActive(start, end, now)) {
				active.push({
					card: {
						...periodDetails(start, end, context),
						...period,
						dyes: dyes?.map((dye) => DyeTypeToEmoji[dye]),
					},
					end,
				});
			} else {
				upcoming.push({ ...period, start });
			}
		}
	}

	return {
		cards: active
			.sort((a, b) => Temporal.ZonedDateTime.compare(a.end, b.end))
			.map(({ card }) => card),
		upcoming,
	};
}

function nestingWorkshopCard(items: readonly Item[], context: ViewContext): ActiveCard | null {
	const { checklist, now, t } = context;
	const start = currentNestingWorkshop(now);
	const end = nextNestingWorkshop(now);

	return start && end && items.length > 0
		? {
				...periodDetails(start, end, context),
				catalogueURL: NESTING_WORKSHOP_CATALOGUE_URL,
				emoji: SeasonIdToSeasonalEmoji[SeasonId.Nesting],
				key: "nesting-workshop",
				label: t(ScheduleTypeToLocaleKey[ScheduleType.NestingWorkshop]),
				offer: resolveOffer(items, context),
				toggle: checklistToggle(
					checklist,
					"nesting_workshop",
					t("checklist.nesting-workshop-message-complete", { ns: "features" }),
					t("checklist.nesting-workshop-message-incomplete", { ns: "features" }),
				),
				wikiURL: t(SCHEDULE_TYPE_TO_WIKI_KEY[ScheduleType.NestingWorkshop]!),
			}
		: null;
}

function upcomingEventRows(
	upcomingPeriods: readonly UpcomingEvent[],
	context: ViewContext,
): UpcomingRow[] {
	const { now, t } = context;
	const events: UpcomingEvent[] = [];

	for (const event of skyUpcomingEvents(now).values()) {
		const { emoji, name, wikiURL } = catalogueLocation(
			{ type: CatalogueSearchType.Event, event },
			t,
		);

		events.push({
			emoji,
			key: `event-${event.id}`,
			label: name,
			start: event.start,
			url: wikiURL,
		});
	}

	events.push(...upcomingPeriods);

	for (const { marketingURL, name, start } of communityUpcomingEvents(now)) {
		events.push({
			key: `community-event-${name}-${start.epochMilliseconds}`,
			label: name,
			start,
			url: marketingURL,
		});
	}

	return events
		.sort((a, b) => Temporal.ZonedDateTime.compare(a.start, b.start))
		.map(({ start, ...event }) => Object.assign(event, upcomingTiming(start, context)));
}

function patchNotes({ preferences: { locale, timeZone }, relativeDays, t, today }: ViewContext) {
	const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone });
	const todayString = today.toString();

	const labels = ({ date, identifier }: PatchNote) => ({
		date: dateFormat.format(
			Temporal.PlainDate.from(date).toZonedDateTime(timeZone).epochMilliseconds,
		),
		label: t("schedule.update-version", { ns: "features", version: patchNoteVersion(identifier) }),
	});

	const nextUpdate = PATCH_NOTES.find(
		(patchNote) => patchNote.date >= todayString && !isPublishedPatchNote(patchNote),
	);

	return {
		latestUpdates: LATEST_MAJOR_PATCH_NOTES.map((patchNote) =>
			Object.assign(labels(patchNote), { key: patchNote.identifier, url: patchNote.url }),
		),
		nextUpdate: nextUpdate
			? {
					...labels(nextUpdate),
					relative: relativeDays.format(
						today.until(Temporal.PlainDate.from(nextUpdate.date)).days,
						"day",
					),
				}
			: null,
	};
}

function buildToday(
	dailyGuides: Awaited<ReturnType<typeof fetchDailyGuides>> | null,
	{ checklist, now, preferences, t }: ViewContext,
): TodayView {
	const shard = shardEruption(now);
	const quests: string[] = [];

	for (const quest of [
		dailyGuides?.quest1,
		dailyGuides?.quest2,
		dailyGuides?.quest3,
		dailyGuides?.quest4,
	]) {
		if (typeof quest === "number" && isDailyQuest(quest)) {
			quests.push(dailyQuestLabel(quest, t));
		}
	}

	return {
		quests,
		questsToggle: checklistToggle(
			checklist,
			"daily_quests",
			t("checklist.daily-quests-message-complete", { ns: "features" }),
			t("checklist.daily-quests-message-incomplete", { ns: "features" }),
		),
		shard: shard && {
			label: t("shard-eruption.realm-area", {
				ns: "features",
				realm: shard.realm,
				area: shard.area,
			}),
			reward: shard.reward,
			strong: shard.strong,
			timestamps: shardEruptionTimestampLabels(shard.timestamps, preferences),
			toggle: checklistToggle(
				checklist,
				"shard_eruptions",
				t("checklist.shard-eruptions-message-complete", { ns: "features" }),
				t("checklist.shard-eruptions-message-incomplete", { ns: "features" }),
			),
		},
	};
}

export function resolveChecklist(
	packet: Packet<"checklist"> | undefined,
	now: Temporal.ZonedDateTime,
) {
	return packet
		? {
				...packet,
				...checklistResetPayload(packet.last_updated_at, new Date(now.epochMilliseconds)),
			}
		: {};
}

export function buildWhatsHappeningInSkyView({
	checklist,
	dailyGuides,
	i18n,
	nestingWorkshopItems,
	now,
	owned,
	preferences,
	t,
}: {
	checklist: Checklist;
	dailyGuides: Awaited<ReturnType<typeof fetchDailyGuides>> | null;
	i18n: I18n;
	nestingWorkshopItems: readonly Item[];
	now: Temporal.ZonedDateTime;
	owned: ReadonlySet<number> | null;
	preferences: TimePreferences;
	t: TFunction;
}) {
	const { hour12, locale, timeZone } = preferences;

	const context: ViewContext = {
		catalogue: releasedCosmetics().catalogue,
		checklist,
		dateTimeFormat: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
			hour12,
		}),
		i18n,
		now,
		owned,
		preferences,
		relativeDays: new Intl.RelativeTimeFormat(locale, { numeric: "auto" }),
		seasonPassEmoji: null,
		t,
		today: now.withTimeZone(timeZone).toPlainDate(),
	};

	const active: ActiveEntry[] = [];
	const upcomingSections: { heading: string; rows: readonly UpcomingRow[] }[] = [];
	const season = skyCurrentSeason(now);

	if (season) {
		active.push(seasonCard(season, context));
	}

	active.push(...eventEntries(context));

	const {
		spirit: scheduledVisit,
		start: travellingSpiritStart,
		visit,
	} = travellingSpiritSchedule(now);

	if (visit) {
		active.push(travellingSpiritCard(visit.spiritId, visit.start, visit.end, context));
	} else if (Temporal.ZonedDateTime.compare(travellingSpiritStart, now) > 0) {
		upcomingSections.push({
			heading: t("travelling-spirit", { ns: "general" }),
			rows: [
				{
					...nextTiming(travellingSpiritStart, context),
					key: "travelling-spirit",
					spiritLinks: scheduledVisit ? [spiritWikiLink(scheduledVisit.spiritId, t)] : undefined,
				},
			],
		});
	}

	const returningVisit = returningSpiritsSchedule(now);

	if (returningVisit?.active) {
		const { end, spiritIds, start } = returningVisit;
		active.push(returningSpiritsCard(spiritIds, start, end, context));
	} else if (returningVisit) {
		const { spiritIds, start } = returningVisit;

		upcomingSections.push({
			heading: t("returning-spirits", { ns: "general" }),
			rows: [
				{
					...nextTiming(start, context),
					key: `returning-spirits-${start.epochMilliseconds}`,
					spiritLinks: spiritIds.map((spiritId) => spiritWikiLink(spiritId, t)),
				},
			],
		});
	}

	const nextSeason = skyUpcomingSeason(now);

	if (nextSeason) {
		const { emoji, name, wikiURL } = catalogueLocation(
			{ type: CatalogueSearchType.Season, season: nextSeason },
			t,
		);

		upcomingSections.push({
			heading: t("whats-happening-in-sky.upcoming-season", { ns: "features" }),
			rows: [
				{
					...upcomingTiming(nextSeason.start, context),
					emoji,
					key: `season-${nextSeason.id}`,
					label: name,
					url: wikiURL,
				},
			],
		});
	}

	const periods = limitedPeriods(nextSeason, context);
	active.push(...periods.cards);
	const nestingWorkshop = nestingWorkshopCard(nestingWorkshopItems, context);

	if (nestingWorkshop) {
		active.push(nestingWorkshop);
	}

	const upcomingEvents = upcomingEventRows(periods.upcoming, context);

	if (upcomingEvents.length > 0) {
		upcomingSections.push({
			heading: t("whats-happening-in-sky.upcoming-events", {
				ns: "features",
				count: upcomingEvents.length,
			}),
			rows: upcomingEvents,
		});
	}

	const [nextMaintenance] = upcomingMaintenancePeriods(now);

	if (nextMaintenance) {
		upcomingSections.push({
			heading: t("maintenance", { ns: "general" }),
			rows: [{ ...nextTiming(nextMaintenance.period.start, context), key: "maintenance" }],
		});
	}

	return {
		active,
		...patchNotes(context),
		maintenance: maintenanceBannerLabels(now, preferences),
		thisMonthInSky: {
			label: new Intl.DateTimeFormat(locale, {
				month: "long",
				year: "numeric",
				timeZone: TIME_ZONE,
			}).format(now.epochMilliseconds),
			url: thisMonthInSkyURL(now),
		},
		today: buildToday(dailyGuides, context),
		upcomingSections,
	};
}
