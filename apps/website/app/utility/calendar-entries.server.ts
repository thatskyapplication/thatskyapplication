import type { TFunction } from "i18next";
import {
	aviarysFireworkFestivalSchedule,
	communityEventsBetween,
	DOUBLE_HEART_EVENTS,
	EventId,
	formatEmojiURL,
	INTERNATIONAL_SPACE_STATION_DATES,
	KINGDOM,
	MAINTENANCE_PERIODS,
	RADIANCE_EVENTS,
	RETURNING_DATES,
	ScheduleType,
	type SeasonIds,
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
} from "~/utility/calendar.js";
import {
	DyeTypeToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";

interface CalendarEntryInput {
	key: string;
	kind: CalendarEntryKinds;
	label: string;
	start: Temporal.ZonedDateTime;
	end?: Temporal.ZonedDateTime;
	iconURLs?: readonly string[];
	detail?: string;
	wikiURL?: string;
	pageURL?: string;
	catalogueURL?: string;
	marketingURL?: string;
	infographicURL?: string;
	acknowledgement?: string;
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

function seasonEmojiURL(seasonId: SeasonIds) {
	const emoji = SeasonIdToSeasonalEmoji[seasonId];
	return emoji ? formatEmojiURL(emoji.id) : null;
}

export function calendarEntriesBetween({
	rangeStart,
	rangeEnd,
	timeZone,
	locale,
	hour12,
	t,
	dayMarkers,
}: CalendarEntriesOptions): CalendarEntry[] {
	const overlapsRange = (start: Temporal.ZonedDateTime, end: Temporal.ZonedDateTime) =>
		Temporal.ZonedDateTime.compare(start, rangeEnd) < 0 &&
		Temporal.ZonedDateTime.compare(rangeStart, end) < 0;

	const rangeFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
		hour12,
	});

	const createCalendarEntry = (input: CalendarEntryInput): CalendarEntry => {
		const end = input.end ?? input.start;
		const { firstDate, lastDate } = inclusiveDates(input.start, end, timeZone);

		return {
			key: input.key,
			kind: input.kind,
			label: input.label,
			firstDate: firstDate.toString(),
			lastDate: lastDate.toString(),
			startsAt: input.start.epochMilliseconds,
			endsAt: end.epochMilliseconds,
			startLabel: rangeFormat.format(input.start.epochMilliseconds),
			endLabel: rangeFormat.format(end.epochMilliseconds),
			iconURLs: input.iconURLs ?? [],
			detail: input.detail ?? null,
			range:
				input.end === undefined
					? rangeFormat.format(input.start.epochMilliseconds)
					: rangeFormat.formatRange(input.start.epochMilliseconds, end.epochMilliseconds),
			duration: input.start.until(end, { largestUnit: "day" }).days,
			wikiURL: input.wikiURL ?? null,
			pageURL: input.pageURL ?? null,
			catalogueURL: input.catalogueURL ?? null,
			marketingURL: input.marketingURL ?? null,
			infographicURL: input.infographicURL ?? null,
			acknowledgement: input.acknowledgement ?? null,
			spiritLinks: input.spiritLinks ?? null,
		};
	};

	const entries: CalendarEntry[] = [];
	const catalogueSeasons = skySeasons();
	const catalogueEventFamilies = skyEventFamilies();
	const catalogueSpirits = spirits();

	for (const season of skySeasonsBetween(rangeStart, rangeEnd).values()) {
		const iconURL = seasonEmojiURL(season.id);

		entries.push(
			createCalendarEntry({
				key: `season-${season.id}`,
				kind: CalendarEntryKind.Season,
				label: t(`seasons.${season.id}`, { ns: "general" }),
				start: season.start,
				end: season.end,
				iconURLs: iconURL ? [iconURL] : [],
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
					iconURLs: [formatEmojiURL(MISCELLANEOUS_EMOJIS.SeasonalCandle.id)],
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
				iconURLs: eventTicketEmoji ? [formatEmojiURL(eventTicketEmoji.id)] : [],
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
		const iconURL = season ? seasonEmojiURL(season.id) : null;

		entries.push(
			createCalendarEntry({
				key: `travelling-spirit-${visit}`,
				kind: CalendarEntryKind.TravellingSpirit,
				label: t(`spirits.${spiritId}`, { ns: "general" }),
				start,
				end,
				iconURLs: iconURL ? [iconURL] : [],
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
		const iconURL =
			seasonIds.size === 1 && seasonId !== undefined ? seasonEmojiURL(seasonId) : null;

		entries.push(
			createCalendarEntry({
				key: `returning-spirits-${visit}`,
				kind: CalendarEntryKind.ReturningSpirits,
				label: t("returning-spirits", { ns: "general" }),
				start,
				end,
				iconURLs: iconURL ? [iconURL] : [],
				wikiURL: t("schedule.detailed-breakdown-returning-spirits-wiki-button-url", {
					ns: "features",
				}),
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
				iconURLs: [formatEmojiURL(MISCELLANEOUS_EMOJIS.Candle.id)],
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
				iconURLs: [formatEmojiURL(MISCELLANEOUS_EMOJIS.Heart.id)],
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
				iconURLs: dyes.map((dye) => formatEmojiURL(DyeTypeToEmoji[dye].id)),
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
		let skyDate = rangeStart.withTimeZone(TIME_ZONE).startOfDay();

		while (Temporal.ZonedDateTime.compare(skyDate, skyRangeLimit) < 0) {
			if (Temporal.ZonedDateTime.compare(skyDate, SHARD_ERUPTION_START_DATE) >= 0) {
				const shard = shardEruption(skyDate);

				const first = shard?.timestamps[0];
				const last = shard?.timestamps.at(-1);

				if (shard && first && last && overlapsRange(first.start, last.end)) {
					const emoji = shard.strong
						? MISCELLANEOUS_EMOJIS.ShardStrong
						: MISCELLANEOUS_EMOJIS.ShardRegular;

					entries.push(
						createCalendarEntry({
							key: `shard-eruption-${skyDate.toPlainDate().toString()}`,
							kind: CalendarEntryKind.ShardEruption,
							label: t(`schedule.type.${ScheduleType.ShardEruption}`, { ns: "features" }),
							start: first.start,
							end: last.end,
							iconURLs: [formatEmojiURL(emoji.id)],
							detail: t("shard-eruption.realm-area", {
								ns: "features",
								realm: shard.realm,
								area: shard.area,
							}),
							infographicURL: shard.infographic.url,
							acknowledgement: shard.infographic.acknowledgement,
						}),
					);
				}
			}

			if (skyDate.dayOfWeek === 7) {
				entries.push(
					createCalendarEntry({
						key: `eye-of-eden-${skyDate.toPlainDate().toString()}`,
						kind: CalendarEntryKind.EyeOfEden,
						label: t(`schedule.type.${ScheduleType.EyeOfEden}`, { ns: "features" }),
						start: skyDate,
					}),
				);
			}

			if (skyDate.dayOfWeek === 5) {
				entries.push(
					createCalendarEntry({
						key: `nesting-workshop-${skyDate.toPlainDate().toString()}`,
						kind: CalendarEntryKind.NestingWorkshop,
						label: t(`schedule.type.${ScheduleType.NestingWorkshop}`, { ns: "features" }),
						start: skyDate,
						wikiURL: t("schedule.detailed-breakdown-nesting-workshop-wiki-button-url", {
							ns: "features",
						}),
						catalogueURL: "/me/catalogue?view=nesting-workshop",
					}),
				);
			}

			const dayOfMonth = skyDate.day;

			if (INTERNATIONAL_SPACE_STATION_DATES.some((date) => date === dayOfMonth)) {
				entries.push(
					createCalendarEntry({
						key: `international-space-station-${skyDate.toPlainDate().toString()}`,
						kind: CalendarEntryKind.InternationalSpaceStation,
						label: t(`schedule.type.${ScheduleType.InternationalSpaceStation}`, {
							ns: "features",
						}),
						start: skyDate,
						end: skyDate.add({ days: 1 }),
						wikiURL: t("schedule.detailed-breakdown-international-space-station-wiki-button-url", {
							ns: "features",
						}),
					}),
				);
			}

			if (dayOfMonth === 1) {
				entries.push(
					createCalendarEntry({
						key: `aviarys-firework-festival-${skyDate.toPlainDate().toString()}`,
						kind: CalendarEntryKind.AviarysFireworkFestival,
						label: t(`schedule.type.${ScheduleType.AviarysFireworkFestival}`, { ns: "features" }),
						start: skyDate,
						end: aviarysFireworkFestivalSchedule(skyDate.with({ hour: 20 })).end,
						wikiURL: t(`event-wiki.${EventId.AviarysFireworkFestival2023}`, { ns: "general" }),
					}),
				);
			}

			skyDate = skyDate.add({ days: 1 });
		}
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
