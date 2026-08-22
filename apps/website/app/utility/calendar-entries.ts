import type { TFunction } from "i18next";
import {
	isPublishedPatchNote,
	PATCH_NOTES,
	patchNoteVersion,
} from "@thatskyapplication/patch-notes";
import {
	aviarysFireworkFestivalSchedule,
	communityEventsBetween,
	DOUBLE_HEART_EVENTS,
	isInternationalSpaceStationDate,
	nextNestingWorkshop,
	KINGDOM,
	MAINTENANCE_PERIODS,
	RADIANCE_EVENTS,
	RETURNING_DATES,
	ScheduleType,
	type SeasonIds,
	type Snowflake,
	shardEruption,
	SHARD_ERUPTION_START_DATE,
	skyEventFamilies,
	skyEventsBetween,
	skySeasons,
	skySeasonsBetween,
	spirits,
	TIME_ZONE,
	TRAVELLING_DATES,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
} from "@thatskyapplication/utility";
import type { ExternalLinkListItem } from "~/components/ExternalLinkList";
import {
	type CalendarEntry,
	CalendarEntryKind,
	type CalendarEntryKinds,
	type CalendarSummaryEntry,
} from "~/utility/calendar.js";
import {
	DyeTypeToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";
import { NESTING_WORKSHOP_CATALOGUE_URL, SCHEDULE_TYPE_TO_WIKI_KEY } from "~/utility/schedule.js";

interface CalendarEntryInput {
	key: string;
	kind: CalendarEntryKinds;
	label: string;
	start: Temporal.ZonedDateTime;
	end?: Temporal.ZonedDateTime;
	dateOnly?: boolean;
	iconEmojiIds?: readonly Snowflake[];
	detail?: string;
	wikiURL?: string;
	pageURL?: string;
	catalogueURL?: string;
	marketingURL?: string;
	infographicURL?: string;
	acknowledgement?: string;
	times?: readonly string[];
	spiritLinks?: readonly ExternalLinkListItem[];
}

interface CalendarEntriesOptions {
	rangeStart: Temporal.ZonedDateTime;
	rangeEnd: Temporal.ZonedDateTime;
	timeZone: string;
	locale: string;
	hour12: boolean | undefined;
	t: TFunction;
	dayMarkers: boolean;
	shardEruptionMaximumDate: string;
	summary?: boolean;
}

function inclusiveDates(
	start: Temporal.ZonedDateTime,
	end: Temporal.ZonedDateTime,
	timeZone: string,
) {
	const zonedStart = start.withTimeZone(timeZone);
	const zonedEnd = end.withTimeZone(timeZone);
	const firstDate = zonedStart.toPlainDate();
	const endDate = zonedEnd.toPlainDate();
	const lastDate = zonedEnd.equals(zonedEnd.startOfDay()) ? endDate.subtract({ days: 1 }) : endDate;

	return {
		firstDate,
		lastDate: Temporal.PlainDate.compare(lastDate, firstDate) < 0 ? firstDate : lastDate,
	};
}

function seasonEmojiId(seasonId: SeasonIds) {
	return SeasonIdToSeasonalEmoji[seasonId]?.id ?? null;
}

export function calendarEntriesBetween(
	options: CalendarEntriesOptions & { summary: true },
): CalendarSummaryEntry[];

export function calendarEntriesBetween(
	options: CalendarEntriesOptions & { summary?: false },
): CalendarEntry[];

export function calendarEntriesBetween({
	rangeStart,
	rangeEnd,
	timeZone,
	locale,
	hour12,
	t,
	dayMarkers,
	shardEruptionMaximumDate,
	summary = false,
}: CalendarEntriesOptions): (CalendarEntry | CalendarSummaryEntry)[] {
	const overlapsRange = (start: Temporal.ZonedDateTime, end: Temporal.ZonedDateTime) =>
		Temporal.ZonedDateTime.compare(start, rangeEnd) < 0 &&
		Temporal.ZonedDateTime.compare(rangeStart, end) < 0;

	const containsInstant = (instant: Temporal.ZonedDateTime) =>
		Temporal.ZonedDateTime.compare(rangeStart, instant) <= 0 &&
		Temporal.ZonedDateTime.compare(instant, rangeEnd) < 0;

	const rangeFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
		hour12,
	});

	const timeFormat = new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 });
	const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeZone });

	const formatDateRange = (firstDate: Temporal.PlainDate, lastDate: Temporal.PlainDate) => {
		const first = firstDate.toZonedDateTime(timeZone).epochMilliseconds;

		return firstDate.equals(lastDate)
			? dateFormat.format(first)
			: dateFormat.formatRange(first, lastDate.toZonedDateTime(timeZone).epochMilliseconds);
	};

	const createCalendarEntry = (input: CalendarEntryInput): CalendarEntry | CalendarSummaryEntry => {
		const end = input.end ?? input.start;
		const { firstDate, lastDate } = inclusiveDates(input.start, end, timeZone);
		const dateOnly = input.dateOnly ?? false;

		const base = {
			key: input.key,
			kind: input.kind,
			label: input.label,
			firstDate: firstDate.toString(),
			lastDate: lastDate.toString(),
			startsAt: input.start.epochMilliseconds,
			endsAt: end.epochMilliseconds,
			iconEmojiIds: input.iconEmojiIds ?? [],
			detail: input.detail ?? null,
			duration: dateOnly ? 0 : input.start.until(end, { largestUnit: "day" }).days,
			wikiURL: input.wikiURL ?? null,
			pageURL: input.pageURL ?? null,
			catalogueURL: input.catalogueURL ?? null,
			marketingURL: input.marketingURL ?? null,
			infographicURL: input.infographicURL ?? null,
			acknowledgement: input.acknowledgement ?? null,
			times: input.times ?? [],
			spiritLinks: input.spiritLinks ?? null,
		};

		return summary
			? {
					...base,
					startLabel: dateOnly
						? dateFormat.format(input.start.epochMilliseconds)
						: rangeFormat.format(input.start.epochMilliseconds),
					endLabel: dateOnly
						? dateFormat.format(lastDate.toZonedDateTime(timeZone).epochMilliseconds)
						: rangeFormat.format(end.epochMilliseconds),
				}
			: {
					...base,
					range: dateOnly
						? formatDateRange(firstDate, lastDate)
						: input.end === undefined
							? rangeFormat.format(input.start.epochMilliseconds)
							: rangeFormat.formatRange(input.start.epochMilliseconds, end.epochMilliseconds),
				};
	};

	const entries: (CalendarEntry | CalendarSummaryEntry)[] = [];
	const catalogueSeasons = skySeasons();
	const catalogueEventFamilies = skyEventFamilies();
	const catalogueSpirits = spirits();

	for (const season of skySeasonsBetween(rangeStart, rangeEnd).values()) {
		const emojiId = seasonEmojiId(season.id);

		entries.push(
			createCalendarEntry({
				key: `season-${season.id}`,
				kind: CalendarEntryKind.Season,
				label: t(`seasons.${season.id}`, { ns: "general" }),
				start: season.start,
				end: season.end,
				iconEmojiIds: emojiId ? [emojiId] : [],
				wikiURL: t(`season-wiki.${season.id}`, { ns: "general" }),
				...(catalogueSeasons.has(season.id)
					? { catalogueURL: `/me/catalogue?view=season&season=${season.id}` }
					: {}),
			}),
		);

		for (const doubleSeasonalLight of season.doubleSeasonalLight ?? []) {
			if (!overlapsRange(doubleSeasonalLight.start, doubleSeasonalLight.end)) {
				continue;
			}

			entries.push(
				createCalendarEntry({
					key: `double-seasonal-light-${season.id}-${doubleSeasonalLight.start.epochMilliseconds}`,
					kind: CalendarEntryKind.DoubleSeasonalLight,
					label: t("event-names.double-seasonal-light", { ns: "general" }),
					start: doubleSeasonalLight.start,
					end: doubleSeasonalLight.end,
					iconEmojiIds: [
						(SeasonIdToSeasonalCandleEmoji[season.id] ?? MISCELLANEOUS_EMOJIS.SeasonalCandle).id,
					],
				}),
			);
		}
	}

	for (const event of skyEventsBetween(rangeStart, rangeEnd).values()) {
		const eventTicketEmoji = EventIdToEventTicketEmoji[event.id];

		entries.push(
			createCalendarEntry({
				key: `event-${event.id}`,
				kind: CalendarEntryKind.Event,
				label: t(event.name, { ns: "general" }),
				start: event.start,
				end: event.end,
				iconEmojiIds: eventTicketEmoji ? [eventTicketEmoji.id] : [],
				wikiURL: t(`event-wiki.${event.id}`, { ns: "general" }),
				...(catalogueEventFamilies.has(event.family)
					? { catalogueURL: `/me/catalogue?view=event-family&family=${event.family}` }
					: {}),
			}),
		);
	}

	for (const [visit, { start, end, spiritId }] of TRAVELLING_DATES) {
		if (!overlapsRange(start, end)) {
			continue;
		}

		const season = KINGDOM.seasonOf(spiritId);
		const emojiId = season ? seasonEmojiId(season.id) : null;

		entries.push(
			createCalendarEntry({
				key: `travelling-spirit-${visit}`,
				kind: CalendarEntryKind.TravellingSpirit,
				label: t(`spirits.${spiritId}`, { ns: "general" }),
				start,
				end,
				iconEmojiIds: emojiId ? [emojiId] : [],
				wikiURL: t(`spirit-wiki.${spiritId}`, { ns: "general" }),
				pageURL: `/spirits?spirit=${spiritId}`,
				...(catalogueSpirits.has(spiritId)
					? { catalogueURL: `/me/catalogue?view=spirit&spirit=${spiritId}` }
					: {}),
			}),
		);
	}

	for (const [visit, { start, end, spiritIds }] of RETURNING_DATES) {
		if (!overlapsRange(start, end)) {
			continue;
		}

		const seasonIds = new Set(
			spiritIds.map((spiritId) => KINGDOM.seasonOf(spiritId)?.id).filter((id) => id !== undefined),
		);

		const [seasonId] = seasonIds;
		const emojiId = seasonIds.size === 1 && seasonId !== undefined ? seasonEmojiId(seasonId) : null;

		entries.push(
			createCalendarEntry({
				key: `returning-spirits-${visit}`,
				kind: CalendarEntryKind.ReturningSpirits,
				label: t("returning-spirits", { ns: "general" }),
				start,
				end,
				iconEmojiIds: emojiId ? [emojiId] : [],
				wikiURL: t(SCHEDULE_TYPE_TO_WIKI_KEY[ScheduleType.ReturningSpirits]!),
				catalogueURL: "/me/catalogue?view=returning-spirits",
				spiritLinks: spiritIds.map((spiritId) => ({
					id: spiritId,
					label: t(`spirits.${spiritId}`, { ns: "general" }),
					href: t(`spirit-wiki.${spiritId}`, { ns: "general" }),
				})),
			}),
		);
	}

	for (const { start, end } of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS) {
		if (!overlapsRange(start, end)) {
			continue;
		}

		entries.push(
			createCalendarEntry({
				key: `double-treasure-candles-${start.epochMilliseconds}`,
				kind: CalendarEntryKind.DoubleTreasureCandles,
				label: t("event-names.double-treasure-candles", { ns: "general" }),
				start,
				end,
				iconEmojiIds: [MISCELLANEOUS_EMOJIS.TreasureCandle.id],
			}),
		);
	}

	for (const { start, end } of DOUBLE_HEART_EVENTS) {
		if (!overlapsRange(start, end)) {
			continue;
		}

		entries.push(
			createCalendarEntry({
				key: `double-hearts-${start.epochMilliseconds}`,
				kind: CalendarEntryKind.DoubleHearts,
				label: t("event-names.double-hearts", { ns: "general" }),
				start,
				end,
				iconEmojiIds: [MISCELLANEOUS_EMOJIS.Heart.id],
			}),
		);
	}

	for (const { start, end, dyes } of RADIANCE_EVENTS) {
		if (!overlapsRange(start, end)) {
			continue;
		}

		entries.push(
			createCalendarEntry({
				key: `radiance-event-${start.epochMilliseconds}`,
				kind: CalendarEntryKind.RadianceEvent,
				label: t("event-names.radiance-event", { ns: "general" }),
				start,
				end,
				iconEmojiIds: dyes.map((dye) => DyeTypeToEmoji[dye].id),
			}),
		);
	}

	for (const { name, start, marketingURL } of communityEventsBetween(rangeStart, rangeEnd)) {
		entries.push(
			createCalendarEntry({
				key: `community-event-${start.epochMilliseconds}`,
				kind: CalendarEntryKind.CommunityEvent,
				label: name,
				start,
				...(marketingURL === undefined ? {} : { marketingURL }),
			}),
		);
	}

	if (dayMarkers) {
		const skyRangeLimit = rangeEnd.withTimeZone(TIME_ZONE);
		const shardEruptionLabel = t(`features:schedule.type.${ScheduleType.ShardEruption}`);
		const eyeOfEdenLabel = t(`features:schedule.type.${ScheduleType.EyeOfEden}`);
		const nestingWorkshopLabel = t(`features:schedule.type.${ScheduleType.NestingWorkshop}`);

		const nestingWorkshopWikiURL = t(SCHEDULE_TYPE_TO_WIKI_KEY[ScheduleType.NestingWorkshop]!);

		const internationalSpaceStationLabel = t(
			`features:schedule.type.${ScheduleType.InternationalSpaceStation}`,
		);

		const internationalSpaceStationWikiURL = t(
			SCHEDULE_TYPE_TO_WIKI_KEY[ScheduleType.InternationalSpaceStation]!,
		);

		const aviarysFireworkFestivalLabel = t(
			`features:schedule.type.${ScheduleType.AviarysFireworkFestival}`,
		);

		const aviarysFireworkFestivalWikiURL = t(
			SCHEDULE_TYPE_TO_WIKI_KEY[ScheduleType.AviarysFireworkFestival]!,
		);

		let skyDate = rangeStart.withTimeZone(TIME_ZONE).startOfDay();

		while (Temporal.ZonedDateTime.compare(skyDate, skyRangeLimit) < 0) {
			const date = skyDate.toPlainDate().toString();

			if (Temporal.ZonedDateTime.compare(skyDate, SHARD_ERUPTION_START_DATE) >= 0) {
				const shard = shardEruption(skyDate);

				if (shard && overlapsRange(skyDate, skyDate.add({ days: 1 }))) {
					const emoji = shard.strong
						? MISCELLANEOUS_EMOJIS.ShardStrong
						: MISCELLANEOUS_EMOJIS.ShardRegular;

					const input: CalendarEntryInput = {
						key: `shard-eruption-${date}`,
						kind: CalendarEntryKind.ShardEruption,
						label: shardEruptionLabel,
						start: skyDate,
						end: skyDate.add({ days: 1 }),
						times: shard.timestamps.map(({ start, end }) =>
							t("time-range", {
								ns: "general",
								start: timeFormat.format(start.epochMilliseconds),
								end: timeFormat.format(end.epochMilliseconds),
							}),
						),
						iconEmojiIds: [emoji.id],
						detail: t("shard-eruption.realm-area", {
							ns: "features",
							realm: shard.realm,
							area: shard.area,
						}),
						infographicURL: shard.infographic.url,
						acknowledgement: shard.infographic.acknowledgement,
					};

					if (date <= shardEruptionMaximumDate) {
						input.pageURL = `/shard-eruption?date=${date}`;
					}

					entries.push(createCalendarEntry(input));
				}
			}

			if (skyDate.dayOfWeek === 7 && containsInstant(skyDate)) {
				entries.push(
					createCalendarEntry({
						key: `eye-of-eden-${date}`,
						kind: CalendarEntryKind.EyeOfEden,
						label: eyeOfEdenLabel,
						start: skyDate,
					}),
				);
			}

			if (
				containsInstant(skyDate) &&
				nextNestingWorkshop(skyDate.subtract({ nanoseconds: 1 }))
					?.toPlainDate()
					.equals(skyDate.toPlainDate())
			) {
				entries.push(
					createCalendarEntry({
						key: `nesting-workshop-${date}`,
						kind: CalendarEntryKind.NestingWorkshop,
						label: nestingWorkshopLabel,
						start: skyDate,
						wikiURL: nestingWorkshopWikiURL,
						catalogueURL: NESTING_WORKSHOP_CATALOGUE_URL,
					}),
				);
			}

			if (
				isInternationalSpaceStationDate(skyDate) &&
				overlapsRange(skyDate, skyDate.add({ days: 1 }))
			) {
				entries.push(
					createCalendarEntry({
						key: `international-space-station-${date}`,
						kind: CalendarEntryKind.InternationalSpaceStation,
						label: internationalSpaceStationLabel,
						start: skyDate,
						end: skyDate.add({ days: 1 }),
						wikiURL: internationalSpaceStationWikiURL,
					}),
				);
			}

			const aviarysFireworkFestival = aviarysFireworkFestivalSchedule(skyDate.with({ hour: 20 }));

			if (
				aviarysFireworkFestival?.start.toPlainDate().equals(skyDate.toPlainDate()) &&
				overlapsRange(skyDate, aviarysFireworkFestival.end)
			) {
				entries.push(
					createCalendarEntry({
						key: `aviarys-firework-festival-${date}`,
						kind: CalendarEntryKind.AviarysFireworkFestival,
						label: aviarysFireworkFestivalLabel,
						start: skyDate,
						end: aviarysFireworkFestival.end,
						wikiURL: aviarysFireworkFestivalWikiURL,
					}),
				);
			}

			skyDate = skyDate.add({ days: 1 });
		}
	}

	for (const patchNote of PATCH_NOTES) {
		const date = Temporal.PlainDate.from(patchNote.date);
		const start = date.toZonedDateTime(timeZone);
		const end = date.add({ days: 1 }).toZonedDateTime(timeZone);

		if (!overlapsRange(start, end)) {
			continue;
		}

		const input: CalendarEntryInput = {
			key: `update-${patchNote.identifier}`,
			kind: CalendarEntryKind.Update,
			label: patchNoteVersion(patchNote.identifier),
			start,
			end,
			dateOnly: true,
		};

		if (isPublishedPatchNote(patchNote)) {
			input.marketingURL = patchNote.url;
		}

		entries.push(createCalendarEntry(input));
	}

	for (const { start, end } of MAINTENANCE_PERIODS) {
		if (!overlapsRange(start, end)) {
			continue;
		}

		entries.push(
			createCalendarEntry({
				key: `maintenance-${start.epochMilliseconds}`,
				kind: CalendarEntryKind.Maintenance,
				label: t("maintenance", { ns: "general" }),
				start,
				end,
			}),
		);
	}

	entries.sort((a, b) => {
		if (a.firstDate !== b.firstDate) {
			return a.firstDate < b.firstDate ? -1 : 1;
		}

		if (a.duration !== b.duration) {
			return b.duration - a.duration;
		}

		if (a.kind !== b.kind) {
			return a.kind - b.kind;
		}

		return a.key < b.key ? -1 : 1;
	});

	return entries;
}
