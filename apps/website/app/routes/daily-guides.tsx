import { clsx } from "clsx";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { type JSX, useState } from "react";
import { useTranslation } from "react-i18next";
import type { HeadersArgs } from "react-router";
import { data, Link, redirect } from "react-router";
import { patchNoteVersion, upcomingPatchNote } from "@thatskyapplication/sky-links";
import {
	communityUpcomingEvents,
	type DailyGuidesDaysCountItem,
	DailyQuestToAcknowledgement,
	DailyQuestToInfographicURL,
	DOUBLE_HEART_EVENTS,
	epochSeconds,
	fetchDailyGuides,
	fetchFirstDailyGuidesDate,
	fetchNestingWorkshop,
	formatEmojiURL,
	isDailyQuest,
	KINGDOM,
	MAINTENANCE_PERIODS,
	nestingWorkshopDate,
	nestingWorkshopItem,
	nextDailyReset,
	parsePlainDate,
	RADIANCE_EVENTS,
	returningSpiritsSchedule,
	ScheduleType,
	ScheduleTypeToLocaleKey,
	shardEruption,
	skyCurrentSeason,
	skyNow,
	skyNotEndedEvents,
	skyUpcomingSeason,
	SHARD_ERUPTION_START_DATE,
	sumCosts,
	TIME_ZONE,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	treasureCandles,
	visibleDaysCountItems,
	WEBSITE_URL,
	dailyQuestLabel,
} from "@thatskyapplication/utility";
import { CostList } from "~/components/catalogue/CostList.js";
import { DatePicker } from "~/components/DatePicker";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { ExternalLink } from "~/components/ExternalLink";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import { CentredSitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination.js";
import { ShardEruptionTimestamp } from "~/components/ShardEruptionTimestamp.js";
import { SkeletonText } from "~/components/SkeletonText.js";
import { Tooltip } from "~/components/Tooltip";
import database from "~/database.server";
import { getSkyProfileCatalogueData } from "~/features/sky-profile/sky-profile-public.server.js";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { getRequestSession } from "~/middleware/session.js";
import { itemEmoji } from "~/utility/catalogue.js";
import { cdnAssetURL } from "~/utility/cdn.js";
import { APPLICATION_ICON_URL, PIECE_OF_LIGHT_PATH } from "~/utility/constants.js";
import {
	DyeTypeToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";
import { firstDayOfWeek } from "~/utility/locale.js";
import { NESTING_WORKSHOP_CATALOGUE_URL } from "~/utility/schedule.js";
import { DATE_NAVIGATION_CLASS } from "~/utility/styles.js";
import { getTimePreferences } from "~/utility/time.server";
import type { Route } from "./+types/daily-guides.js";

interface DaysCountItem extends DailyGuidesDaysCountItem {
	key: string;
	content: string | JSX.Element;
	iconURL?: string | undefined;
}

const DAILY_GUIDES_DESCRIPTION =
	"Today's quests, treasure candles, seasonal candles, returning spirits, shard eruption, travelling rock, Nesting Workshop, maintenance, and countdowns for Sky: Children of the Light." as const;
const RETURNING_SPIRITS_LIST_PLACEHOLDER = "__RETURNING_SPIRITS_LIST__" as const;

function dailyGuidesCacheMaxAge(now: Temporal.ZonedDateTime, maximum: number) {
	const secondsUntilDailyReset = Math.floor(nextDailyReset(now).since(now).total("seconds"));

	return Math.max(0, Math.min(maximum, secondsUntilDailyReset));
}

export const meta: Route.MetaFunction = ({ loaderData, location }) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title: loaderData.title },
		{ name: "description", content: DAILY_GUIDES_DESCRIPTION },
		{ name: "theme-color", content: "#49add8" },
		{ property: "og:title", content: loaderData.title },
		{ property: "og:description", content: DAILY_GUIDES_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: APPLICATION_ICON_URL },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: loaderData.title },
		{ name: "twitter:description", content: DAILY_GUIDES_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

export const loader = async ({ request, context, url }: Route.LoaderArgs) => {
	const dateParameter = url.searchParams.get("date");
	const todayParameter = url.searchParams.get("today");
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);
	const t = getInstance(context).getFixedT(getLocale(context));
	const now = skyNow();
	const todayDate = now.toPlainDate();
	const firstDate = (await fetchFirstDailyGuidesDate(database)) ?? todayDate;
	const minimumPage = Math.min(0, firstDate.since(todayDate).days);
	let date = todayDate;

	if (todayParameter !== "1" && dateParameter !== null) {
		const targetDate = parsePlainDate(dateParameter);

		if (targetDate === null || Temporal.PlainDate.compare(targetDate, todayDate) > 0) {
			url.searchParams.delete("date");
			throw redirect(`${url.pathname}${url.search}`);
		}

		if (Temporal.PlainDate.compare(targetDate, firstDate) < 0) {
			url.searchParams.set("date", firstDate.toString());
			throw redirect(`${url.pathname}${url.search}`);
		}

		date = targetDate;
	}

	const page = date.since(todayDate).days;
	const isToday = page === 0;
	const paginationDateFormat = new Intl.DateTimeFormat(locale, {
		timeZone: "UTC",
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
	const paginationLabels: Record<number, string> = {};

	for (let offset = Math.max(minimumPage, page - 1); offset <= Math.min(0, page + 1); offset++) {
		paginationLabels[offset] = paginationDateFormat.format(
			todayDate.add({ days: offset }).toZonedDateTime("UTC").epochMilliseconds,
		);
	}

	const dayStart = date.toZonedDateTime(TIME_ZONE);
	const discordUser = getRequestSession(context).get("discord_user");

	const [dailyGuides, nestingWorkshopPacket, catalogue] = await Promise.all([
		fetchDailyGuides(database, date),
		fetchNestingWorkshop(database, date),
		discordUser && nestingWorkshopDate(date) ? getSkyProfileCatalogueData(discordUser.id) : null,
	]);
	const initialTimestamp = now.epochMilliseconds;
	const shardEruptionExists =
		Temporal.ZonedDateTime.compare(dayStart, SHARD_ERUPTION_START_DATE) >= 0;
	const shard = shardEruptionExists ? shardEruption(dayStart) : null;
	const treasureCandleNotes: string[] = [];
	const treasureCandleLinks = treasureCandles(dayStart).map(
		({ url, availableFrom, unavailableAt }, index, candles) => {
			let footnote = null;

			if (availableFrom || unavailableAt) {
				const previous = candles[index - 1];

				if (
					availableFrom?.epochNanoseconds !== previous?.availableFrom?.epochNanoseconds ||
					unavailableAt?.epochNanoseconds !== previous?.unavailableAt?.epochNanoseconds
				) {
					treasureCandleNotes.push(
						t(
							unavailableAt
								? "daily-guides.treasure-candles-previous-day"
								: "daily-guides.treasure-candles-available-from",
							{ ns: "features" },
						),
					);
				}

				footnote = treasureCandleNotes.length;
			}

			return { url, footnote };
		},
	);

	const cacheMaxAge = dailyGuidesCacheMaxAge(now, isToday ? 300 : 3600);

	return data(
		{
			title: t("daily-guides.name", { ns: "features" }),
			initialTimestamp,
			locale,
			timeZone,
			timeZoneEstimated,
			hour12,
			date: date.toString(),
			isToday,
			page,
			minimumPage,
			paginationLabels,
			minimumDate: firstDate.toString(),
			todayDate: todayDate.toString(),
			weekStartsOn: firstDayOfWeek(locale),
			dailyGuides,
			nestingWorkshop: nestingWorkshopPacket?.cosmetics ?? [],
			nestingWorkshopOwned:
				nestingWorkshopPacket?.cosmetics.filter((cosmetic) => catalogue?.has(cosmetic)) ?? [],
			treasureCandleLinks,
			treasureCandleNotes,
			dateString: new Intl.DateTimeFormat(locale, {
				timeZone: TIME_ZONE,
				dateStyle: "full",
			}).format(dayStart.epochMilliseconds),
			shardEruptionExists,
			shard: shard
				? {
						...shard,
						timestamps: shard.timestamps.map(({ start, end }) => ({
							start: {
								unix: epochSeconds(start),
								format: new Intl.DateTimeFormat(locale, {
									timeZone,
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
									hour12,
								}).format(start.epochMilliseconds),
							},
							end: {
								unix: epochSeconds(end),
								format: new Intl.DateTimeFormat(locale, {
									timeZone,
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
									hour12,
								}).format(end.epochMilliseconds),
							},
						})),
					}
				: null,
		},
		{
			headers: {
				"Cache-Control": `private, max-age=${cacheMaxAge}`,
				Vary: "Cookie",
			},
		},
	);
};

export function headers({ loaderHeaders }: HeadersArgs) {
	return loaderHeaders;
}

export default function DailyGuides({ loaderData }: Route.ComponentProps) {
	const {
		initialTimestamp,
		locale,
		timeZone,
		timeZoneEstimated,
		hour12,
		date,
		isToday,
		page,
		minimumPage,
		paginationLabels,
		minimumDate,
		todayDate,
		weekStartsOn,
		dailyGuides,
		nestingWorkshop,
		nestingWorkshopOwned,
		treasureCandleLinks,
		treasureCandleNotes,
		dateString,
		shardEruptionExists,
		shard,
	} = loaderData;

	const [selectedInfographic, setSelectedInfographic] = useState<SelectedInfographic | null>(null);
	const [selectedInfographicDate, setSelectedInfographicDate] = useState(date);
	const cdnURL = useCDNURL();
	const { t } = useTranslation();
	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useSkyDailyResetRevalidator(currentTimestamp);

	if (selectedInfographicDate !== date) {
		setSelectedInfographicDate(date);
		setSelectedInfographic(null);
	}

	const now = isToday
		? Temporal.Instant.fromEpochMilliseconds(currentTimestamp).toZonedDateTimeISO(TIME_ZONE)
		: Temporal.PlainDate.from(date).toZonedDateTime(TIME_ZONE);
	const currentUnix = epochSeconds(now);
	const today = now.startOfDay();
	const quest1 = dailyGuides.quest1;
	const quest2 = dailyGuides.quest2;
	const quest3 = dailyGuides.quest3;
	const quest4 = dailyGuides.quest4;
	const travellingRock = dailyGuides.travelling_rock;
	const travellingRockNotSpawned = dailyGuides.travelling_rock_not_spawned;
	const season = skyCurrentSeason(now);
	const timeFormat = new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone, hour12 });

	const quests = [];

	for (const quest of [quest1, quest2, quest3, quest4]) {
		if (quest !== null && isDailyQuest(quest)) {
			quests.push({
				acknowledgement: DailyQuestToAcknowledgement[quest],
				quest,
				url: DailyQuestToInfographicURL[quest],
			});
		}
	}

	const nestingWorkshopItems = nestingWorkshop
		.map((cosmetic) => nestingWorkshopItem(cosmetic))
		.filter((item) => item !== null);

	let seasonalCandles = null;
	const daysCount: DaysCountItem[] = [];
	const seasonalCandleEmoji = season ? SeasonIdToSeasonalCandleEmoji[season.id] : null;

	if (season) {
		const seasonDaysLeft =
			Math.ceil(season.end.since(now).total({ unit: "days", relativeTo: now })) - 1;

		const daysLeftText = t(
			seasonDaysLeft === 0 ? "days-left.season-ends-today" : "days-left.season",
			{ ns: "general", count: seasonDaysLeft },
		);

		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		daysCount.push({
			content: daysLeftText,
			end: season.end,
			iconURL: seasonEmoji ? formatEmojiURL(seasonEmoji.id) : undefined,
			key: `season-current-${season.id}`,
			start: season.start,
		});

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		seasonalCandles = {
			remaining: seasonalCandlesLeft,
			remainingWithPass: seasonalCandlesLeftWithSeasonPass,
			url: season.seasonalCandles(today),
		};

		for (const doubleSeasonalLight of season.doubleSeasonalLight?.dates.filter(
			({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
		) ?? []) {
			const daysUntilStart = doubleSeasonalLight.start
				.since(today)
				.total({ unit: "days", relativeTo: today });
			const daysLeft =
				Math.ceil(doubleSeasonalLight.end.since(today).total({ unit: "days", relativeTo: today })) -
				1;

			daysCount.push({
				content:
					Temporal.ZonedDateTime.compare(today, doubleSeasonalLight.start) >= 0
						? t(
								daysLeft === 0
									? "days-left.double-seasonal-light-ends-today"
									: "days-left.double-seasonal-light",
								{ ns: "general", count: daysLeft },
							)
						: t("daily-guides.double-seasonal-light-upcoming", {
								ns: "features",
								count: Math.floor(daysUntilStart),
							}),
				end: doubleSeasonalLight.end,
				iconURL: seasonalCandleEmoji ? formatEmojiURL(seasonalCandleEmoji.id) : undefined,
				key: `double-seasonal-light-${season.id}-${doubleSeasonalLight.start.epochMilliseconds}`,
				start: doubleSeasonalLight.start,
			});
		}
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const daysUntilStart = next.start.since(today).total({ unit: "days", relativeTo: today });
		const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

		daysCount.push({
			content: t("daily-guides.season-upcoming", {
				ns: "features",
				count: Math.floor(daysUntilStart),
			}),
			end: next.end,
			iconURL: nextSeasonEmoji ? formatEmojiURL(nextSeasonEmoji.id) : undefined,
			key: `season-upcoming-${next.id}`,
			start: next.start,
		});
	}

	const returningSpiritsName = t("returning-spirits", { ns: "general" });
	const returningSpirits = returningSpiritsSchedule(today);

	if (returningSpirits) {
		const { active, start, end, spiritIds } = returningSpirits;

		const seasonIds = new Set(spiritIds.map((spiritId) => KINGDOM.seasonOf(spiritId)?.id));
		const [seasonId] = seasonIds;

		const returningSpiritsSeasonEmoji =
			seasonIds.size === 1 && seasonId !== undefined ? SeasonIdToSeasonalEmoji[seasonId] : null;

		const returningSpiritsDaysLeft =
			Math.ceil(end.since(today).total({ unit: "days", relativeTo: today })) - 1;

		const countdown = active
			? t(
					returningSpiritsDaysLeft === 0
						? "daily-guides.returning-spirits-leave-today"
						: "daily-guides.returning-spirits-active-list",
					{
						ns: "features",
						count: returningSpiritsDaysLeft,
						returningSpirits: returningSpiritsName,
						spirits: RETURNING_SPIRITS_LIST_PLACEHOLDER,
					},
				)
			: t("daily-guides.returning-spirits-upcoming-list", {
					ns: "features",
					count: start.since(today).total({ unit: "days", relativeTo: today }),
					returningSpirits: returningSpiritsName,
					spirits: RETURNING_SPIRITS_LIST_PLACEHOLDER,
				});
		const [beforeSpiritList, afterSpiritList] = countdown.split(RETURNING_SPIRITS_LIST_PLACEHOLDER);
		const spiritLinks = spiritIds.map((spiritId) => ({
			id: spiritId,
			label: t(`spirits.${spiritId}`, { ns: "general" }),
			href: t(`spirit-wiki.${spiritId}`, { ns: "general" }),
		}));

		daysCount.push({
			content: (
				<>
					{beforeSpiritList}
					<ExternalLinkList items={spiritLinks} locale={locale} />
					{afterSpiritList}
				</>
			),
			end,
			iconURL: returningSpiritsSeasonEmoji
				? formatEmojiURL(returningSpiritsSeasonEmoji.id)
				: undefined,
			key: `returning-spirits-${start.epochMilliseconds}`,
			start,
		});
	}

	for (const { id, name, start, end } of skyNotEndedEvents(today).values()) {
		const daysUntilStart = start.since(today).total({ unit: "days", relativeTo: today });
		const eventName = t(name, { ns: "general" });
		const eventEmoji = EventIdToEventTicketEmoji[id];

		if (daysUntilStart > 0) {
			const showsStartTime = daysUntilStart < 1;

			const upcoming = showsStartTime
				? t("daily-guides.event-upcoming-time", {
						ns: "features",
						event: eventName,
						time: timeFormat.format(start.epochMilliseconds),
					})
				: t("daily-guides.event-upcoming", {
						ns: "features",
						event: eventName,
						count: Math.floor(daysUntilStart),
					});

			daysCount.push({
				content:
					showsStartTime && timeZoneEstimated ? <SkeletonText>{upcoming}</SkeletonText> : upcoming,
				end,
				iconURL: eventEmoji ? formatEmojiURL(eventEmoji.id) : undefined,
				key: `event-upcoming-${name}`,
				start,
			});

			continue;
		}

		const eventDaysLeft =
			Math.ceil(end.since(today).total({ unit: "days", relativeTo: today })) - 1;

		daysCount.push({
			content: t(eventDaysLeft === 0 ? "days-left.event-ends-today" : "days-left.event", {
				ns: "general",
				count: eventDaysLeft,
				name: eventName,
			}),
			end,
			iconURL: eventEmoji ? formatEmojiURL(eventEmoji.id) : undefined,
			key: `event-ending-${name}`,
			start,
		});
	}

	const communityEvents = communityUpcomingEvents(today);

	if (communityEvents.length > 0) {
		for (const { start, name, marketingURL } of communityEvents) {
			const daysUntilStart = start.since(today).total({ unit: "days", relativeTo: today });

			const showsStartTime = daysUntilStart < 1;

			const translatedText = showsStartTime
				? t("daily-guides.event-upcoming-time", {
						ns: "features",
						event: name,
						time: timeFormat.format(start.epochMilliseconds),
					})
				: t("daily-guides.event-upcoming", {
						ns: "features",
						event: name,
						count: Math.floor(daysUntilStart),
					});

			let content: DaysCountItem["content"] = translatedText;

			if (marketingURL) {
				const parts = translatedText.split(name);

				content = (
					<span>
						{parts[0]}
						<ExternalLink
							className="regular-link inline-flex items-center gap-1"
							href={marketingURL}
							icon
							iconClassName="h-3 w-3"
						>
							{name}
						</ExternalLink>
						{parts[1]}
					</span>
				);
			}

			daysCount.push({
				content:
					showsStartTime && timeZoneEstimated ? <SkeletonText>{content}</SkeletonText> : content,
				key: `community-event-${name}-${start.epochMilliseconds}`,
				start,
			});
		}
	}

	for (const radianceEvent of RADIANCE_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	)) {
		const daysUntilStart = radianceEvent.start
			.since(today)
			.total({ unit: "days", relativeTo: today });
		const radianceEmojiURL = formatEmojiURL(MISCELLANEOUS_EMOJIS.Dye.id);
		const dyeEmojiURLs = radianceEvent.dyes.map((dye) => formatEmojiURL(DyeTypeToEmoji[dye].id));
		const radianceDaysLeft =
			Math.ceil(radianceEvent.end.since(today).total({ unit: "days", relativeTo: today })) - 1;

		const radianceText =
			daysUntilStart >= 1
				? t("daily-guides.event-upcoming", {
						ns: "features",
						count: Math.floor(daysUntilStart),
						event: t("event-names.radiance-event", { ns: "general" }),
					})
				: t(radianceDaysLeft === 0 ? "days-left.event-ends-today" : "days-left.event", {
						ns: "general",
						count: radianceDaysLeft,
						name: t("event-names.radiance-event", { ns: "general" }),
					});

		daysCount.push({
			content: (
				<span className="inline-flex items-center gap-1.5">
					<span>{radianceText}</span>
					<span aria-hidden="true" className="inline-flex items-center gap-1">
						{dyeEmojiURLs.map((emojiURL, index) => (
							<span
								className="discord-emoji inline-block h-4 w-4"
								key={`${radianceEvent.start.epochMilliseconds}-${index}`}
								style={{ backgroundImage: `url(${emojiURL})` }}
							/>
						))}
					</span>
				</span>
			),
			end: radianceEvent.end,
			iconURL: radianceEmojiURL,
			key: `radiance-${radianceEvent.start.epochMilliseconds}`,
			start: radianceEvent.start,
		});
	}

	for (const doubleTreasureCandleEvent of TREASURE_CANDLES_DOUBLE_CONFIGURATIONS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	)) {
		const daysUntilStart = doubleTreasureCandleEvent.start
			.since(today)
			.total({ unit: "days", relativeTo: today });
		const daysLeft =
			Math.ceil(
				doubleTreasureCandleEvent.end.since(today).total({ unit: "days", relativeTo: today }),
			) - 1;

		daysCount.push({
			content:
				Temporal.ZonedDateTime.compare(today, doubleTreasureCandleEvent.start) >= 0
					? t(
							daysLeft === 0
								? "days-left.double-treasure-candles-ends-today"
								: "days-left.double-treasure-candles",
							{ ns: "general", count: daysLeft },
						)
					: t("daily-guides.double-treasure-candles-upcoming", {
							ns: "features",
							count: Math.floor(daysUntilStart),
						}),
			end: doubleTreasureCandleEvent.end,
			iconURL: formatEmojiURL(MISCELLANEOUS_EMOJIS.TreasureCandle.id),
			key: `double-treasure-candle-${doubleTreasureCandleEvent.start.epochMilliseconds}`,
			start: doubleTreasureCandleEvent.start,
		});
	}

	for (const doubleHeartEvent of DOUBLE_HEART_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	)) {
		const daysUntilStart = doubleHeartEvent.start
			.since(today)
			.total({ unit: "days", relativeTo: today });
		const daysLeft =
			Math.ceil(doubleHeartEvent.end.since(today).total({ unit: "days", relativeTo: today })) - 1;

		daysCount.push({
			content:
				Temporal.ZonedDateTime.compare(today, doubleHeartEvent.start) >= 0
					? t(daysLeft === 0 ? "days-left.double-hearts-ends-today" : "days-left.double-hearts", {
							ns: "general",
							count: daysLeft,
						})
					: t("daily-guides.double-hearts-upcoming", {
							ns: "features",
							count: Math.floor(daysUntilStart),
						}),
			end: doubleHeartEvent.end,
			iconURL: formatEmojiURL(MISCELLANEOUS_EMOJIS.Heart.id),
			key: `double-heart-${doubleHeartEvent.start.epochMilliseconds}`,
			start: doubleHeartEvent.start,
		});
	}

	const todayMaintenance = [];
	const seenMaintenanceDays = new Set<number>();
	const tomorrow = today.add({ days: 1 });

	for (const maintenance of MAINTENANCE_PERIODS) {
		if (Temporal.ZonedDateTime.compare(maintenance.end, now) <= 0) {
			continue;
		}

		if (Temporal.ZonedDateTime.compare(maintenance.start, tomorrow) < 0) {
			todayMaintenance.push(maintenance);
			continue;
		}

		const daysUntilStart = maintenance.start
			.since(today)
			.total({ unit: "days", relativeTo: today });
		const floorDays = Math.floor(daysUntilStart);

		if (floorDays >= 2) {
			if (!seenMaintenanceDays.has(floorDays)) {
				seenMaintenanceDays.add(floorDays);

				daysCount.push({
					content: t("daily-guides.maintenance-upcoming", {
						ns: "features",
						count: floorDays,
					}),
					end: maintenance.end,
					key: `maintenance-upcoming-${floorDays}`,
					start: maintenance.start,
				});
			}
		} else {
			const upcoming = t("daily-guides.maintenance-tomorrow", {
				ns: "features",
				time: timeFormat.format(maintenance.start.epochMilliseconds),
			});

			daysCount.push({
				content: timeZoneEstimated ? <SkeletonText>{upcoming}</SkeletonText> : upcoming,
				end: maintenance.end,
				key: `maintenance-upcoming-${maintenance.start.epochMilliseconds}`,
				start: maintenance.start,
			});
		}
	}

	const maintenanceDescription =
		todayMaintenance.length === 1
			? t("maintenance-description-singular", {
					ns: "general",
					start: timeFormat.format(todayMaintenance[0]!.start.epochMilliseconds),
					end: timeFormat.format(todayMaintenance[0]!.end.epochMilliseconds),
				})
			: null;

	const upcomingUpdate = upcomingPatchNote(today.toPlainDate().toString());

	if (upcomingUpdate) {
		const start = Temporal.PlainDate.from(upcomingUpdate.date).toZonedDateTime(TIME_ZONE);

		const daysUntilUpdate = today
			.toPlainDate()
			.until(Temporal.PlainDate.from(upcomingUpdate.date)).days;

		daysCount.push({
			content: t(
				daysUntilUpdate === 0
					? "daily-guides.update-releases-today"
					: "daily-guides.update-upcoming",
				{
					ns: "features",
					count: daysUntilUpdate,
					update: t("schedule.update-version", {
						ns: "features",
						version: patchNoteVersion(upcomingUpdate.identifier),
					}),
				},
			),
			key: `update-${upcomingUpdate.date}`,
			start,
		});
	}

	const visibleDaysCount = visibleDaysCountItems(daysCount, today);

	const handleImageClick = (url: string | null, acknowledgement: string | null = null) => {
		if (url) {
			setSelectedInfographic({ acknowledgement, imageURL: url });
		}
	};

	return (
		<CentredSitePage>
			<div className="flex w-full max-w-6xl flex-col items-center py-4 sm:py-8">
				<div className="mb-4 flex w-full justify-center gap-2">
					<Link className={DATE_NAVIGATION_CLASS} to="?today=1">
						{t("today", { ns: "general" })}
					</Link>
					<DatePicker
						anchorDate={date}
						className={DATE_NAVIGATION_CLASS}
						getDateURL={(value) => (value === todayDate ? "?today=1" : `?date=${value}`)}
						label={t("jump-to-date", { ns: "general" })}
						locale={locale}
						maximumDate={todayDate}
						minimumDate={minimumDate}
						monthOpensDays
						todayDate={todayDate}
						weekStartsOn={weekStartsOn}
					/>
				</div>
				<div
					className={clsx(
						"flex w-full gap-6 transition-all duration-300",
						selectedInfographic ? "items-start justify-between" : "justify-center",
					)}
				>
					<div className="w-full max-w-lg shrink-0 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
						<div className="mb-6 border-b-2 border-gray-200 pb-4 dark:border-gray-700">
							<h1 className="text-lg font-bold text-gray-900 dark:text-white">{dateString}</h1>
						</div>
						{todayMaintenance.length > 0 && (
							<div className="mb-5 flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/40">
								<AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
								<div>
									<p className="text-sm font-medium text-amber-800 dark:text-amber-200">
										{t("maintenance", { ns: "general" })}
									</p>
									{todayMaintenance.length === 1 ? (
										<p className="text-xs text-amber-700 dark:text-amber-300">
											{timeZoneEstimated ? (
												<SkeletonText>{maintenanceDescription}</SkeletonText>
											) : (
												maintenanceDescription
											)}
										</p>
									) : (
										<>
											<p className="text-xs text-amber-700 dark:text-amber-300">
												{t("maintenance-description-many", { ns: "general" })}
											</p>
											<ul className="m-0 list-disc ps-4 text-xs text-amber-600 dark:text-amber-400">
												{todayMaintenance.map((maintenance) => {
													const range = t("time-range", {
														ns: "general",
														start: timeFormat.format(maintenance.start.epochMilliseconds),
														end: timeFormat.format(maintenance.end.epochMilliseconds),
													});

													return (
														<li key={maintenance.start.epochMilliseconds}>
															{timeZoneEstimated ? <SkeletonText>{range}</SkeletonText> : range}
														</li>
													);
												})}
											</ul>
										</>
									)}
								</div>
							</div>
						)}
						{quests.length > 0 && (
							<div className="mb-5">
								<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
									{t("daily-guides.quests-heading", { ns: "features" })}
								</h2>
								<div className="space-y-2">
									{quests.map(({ acknowledgement, quest, url }, index) => (
										<div className="flex items-start gap-3" key={quest}>
											<span className="w-4 shrink-0 text-sm font-medium text-gray-600 dark:text-gray-400">
												{index + 1}.
											</span>
											{url ? (
												<button
													className="regular-link text-left text-sm font-medium transition-colors"
													onClick={() => handleImageClick(url, acknowledgement)}
													type="button"
												>
													{dailyQuestLabel(quest, t)}
												</button>
											) : (
												<span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
													{dailyQuestLabel(quest, t)}
												</span>
											)}
										</div>
									))}
								</div>
							</div>
						)}
						<div className="mb-5">
							<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
								{t("daily-guides.treasure-candles", { ns: "features" })}
							</h2>
							<div className="flex flex-wrap items-baseline gap-1 text-sm">
								{treasureCandleLinks.map(({ url, footnote }, index) => (
									<span className="relative" key={url}>
										<button
											aria-describedby={footnote ? `treasure-candles-note-${footnote}` : undefined}
											className={
												treasureCandleLinks.length === 1
													? "rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
													: "regular-link font-medium transition-colors"
											}
											onClick={() => handleImageClick(url)}
											type="button"
										>
											{treasureCandleLinks.length === 1
												? t("view", { ns: "general" })
												: `${index * 4 + 1}–${index * 4 + 4}`}
										</button>
										{footnote !== null && footnote !== treasureCandleLinks[index + 1]?.footnote && (
											<sup
												className={clsx(
													"text-[10px]",
													treasureCandleLinks.length === 1 &&
														"absolute top-0 left-full leading-none",
												)}
											>
												<a className="regular-link" href={`#treasure-candles-note-${footnote}`}>
													[{footnote}]
												</a>
											</sup>
										)}
										{index < treasureCandleLinks.length - 1 && (
											<span className="mx-1 text-gray-600 dark:text-gray-300">|</span>
										)}
									</span>
								))}
							</div>
							{treasureCandleNotes.length > 0 && (
								<ol className="mt-2 list-decimal space-y-1 ps-4 text-xs text-gray-500 dark:text-gray-400">
									{treasureCandleNotes.map((description, index) => (
										<li id={`treasure-candles-note-${index + 1}`} key={description}>
											{description}
										</li>
									))}
								</ol>
							)}
						</div>
						{seasonalCandles && (
							<div className="mb-5">
								<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
									{t("seasonal-candles", { ns: "general" })}
								</h2>
								<div className="space-y-2">
									{seasonalCandles.url && (
										<button
											className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
											onClick={() => handleImageClick(seasonalCandles.url)}
											type="button"
										>
											{t("view", { ns: "general" })}
										</button>
									)}
									<div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
										<div
											aria-label={t("seasonal-candles", { ns: "general" })}
											className="discord-emoji h-4 w-4"
											role="img"
											style={{
												backgroundImage: seasonalCandleEmoji
													? `url(${formatEmojiURL(seasonalCandleEmoji.id)})`
													: undefined,
											}}
										/>
										<span>
											{t("daily-guides.seasonal-candles-remain-with-season-pass", {
												ns: "features",
												remaining: seasonalCandles.remaining,
												remainingSeasonPass: seasonalCandles.remainingWithPass,
											})}
										</span>
									</div>
								</div>
							</div>
						)}
						{shardEruptionExists && (
							<div className="mb-5">
								<div className="mb-3 flex items-center justify-between gap-3">
									<h2 className="text-sm font-semibold text-gray-900 dark:text-white">
										{t("shard-eruption", { ns: "general" })}
									</h2>
									<Link
										className="regular-link inline-flex items-center gap-1 text-xs font-medium"
										to={isToday ? "/shard-eruption" : `/shard-eruption?date=${date}`}
									>
										{t("more", { ns: "general" })}
										<ArrowRight className="h-3 w-3" />
									</Link>
								</div>
								{shard ? (
									<div className="space-y-3">
										<div className="hidden items-start justify-between sm:flex">
											<div>
												<h3 className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
													{t("daily-guides.shard-eruption-data", { ns: "features" })}
												</h3>
												<button
													className="regular-link mb-1 block text-sm font-medium transition-colors"
													onClick={() =>
														handleImageClick(
															shard.infographic.url,
															shard.infographic.acknowledgement,
														)
													}
													type="button"
												>
													{t("shard-eruption.realm-area", {
														ns: "features",
														realm: shard.realm,
														area: shard.area,
													})}
												</button>
												<div className="flex items-center gap-2">
													<span className="text-sm text-gray-700 dark:text-gray-300">
														{shard.reward}
													</span>
													{shard.strong ? (
														<div
															aria-label={t("ascended-candles", { ns: "general" })}
															className="discord-emoji h-4 w-4"
															role="img"
															style={{
																backgroundImage: `url(${formatEmojiURL(MISCELLANEOUS_EMOJIS.AscendedCandle.id)})`,
															}}
														/>
													) : (
														<div
															aria-label="Piece of light"
															className="h-4 w-4 bg-cover bg-center"
															role="img"
															style={{
																backgroundImage: `url(${PIECE_OF_LIGHT_PATH})`,
															}}
														/>
													)}
												</div>
											</div>
											<div className="text-right">
												<h3 className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
													{t("daily-guides.shard-eruption-timestamps", { ns: "features" })}
												</h3>
												<div className="space-y-1">
													{shard.timestamps.map(({ start, end }) => (
														<ShardEruptionTimestamp
															currentUnix={currentUnix}
															end={end}
															key={start.unix}
															start={start}
															timeZoneEstimated={timeZoneEstimated}
															variant="daily-guides"
														/>
													))}
												</div>
											</div>
										</div>
										<div className="space-y-2 sm:hidden">
											<button
												className="regular-link block text-sm font-medium transition-colors"
												onClick={() =>
													handleImageClick(shard.infographic.url, shard.infographic.acknowledgement)
												}
												type="button"
											>
												{t("shard-eruption.realm-area", {
													ns: "features",
													realm: shard.realm,
													area: shard.area,
												})}
											</button>
											<div className="flex items-center gap-2">
												<span className="text-sm text-gray-700 dark:text-gray-300">
													{shard.reward}
												</span>
												{shard.strong ? (
													<div
														aria-label={t("ascended-candles", { ns: "general" })}
														className="discord-emoji h-4 w-4"
														role="img"
														style={{
															backgroundImage: `url(${formatEmojiURL(MISCELLANEOUS_EMOJIS.AscendedCandle.id)})`,
														}}
													/>
												) : (
													<div
														aria-label="Piece of light"
														className="h-4 w-4 bg-cover bg-center"
														role="img"
														style={{
															backgroundImage: `url(${PIECE_OF_LIGHT_PATH})`,
														}}
													/>
												)}
											</div>
											<div className="space-y-1">
												{shard.timestamps.map(({ start, end }) => (
													<ShardEruptionTimestamp
														currentUnix={currentUnix}
														end={end}
														key={start.unix}
														start={start}
														timeZoneEstimated={timeZoneEstimated}
														variant="daily-guides"
													/>
												))}
											</div>
										</div>
									</div>
								) : (
									<p className="my-4 text-sm text-gray-500 dark:text-gray-400">
										{t("none", { ns: "general" })}
									</p>
								)}
							</div>
						)}
						{(travellingRock || travellingRockNotSpawned) && (
							<div className="mb-5">
								<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
									{t("daily-guides.travelling-rock", { ns: "features" })}
								</h2>
								{travellingRock ? (
									<button
										className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
										onClick={() =>
											handleImageClick(
												cdnAssetURL(cdnURL, `daily_guides/travelling_rocks/${travellingRock}.webp`),
											)
										}
										type="button"
									>
										{t("view", { ns: "general" })}
									</button>
								) : (
									<p className="my-4 text-sm text-gray-500 dark:text-gray-400">
										{t("none", { ns: "general", context: "travelling-rock" })}
									</p>
								)}
							</div>
						)}
						{nestingWorkshopItems.length > 0 && (
							<div className="mb-5">
								<div className="mb-3 flex items-center justify-between gap-3">
									<h2 className="text-sm font-semibold text-gray-900 dark:text-white">
										{t(ScheduleTypeToLocaleKey[ScheduleType.NestingWorkshop])}
									</h2>
									<Link
										className="regular-link inline-flex items-center gap-1 text-xs font-medium"
										to={NESTING_WORKSHOP_CATALOGUE_URL}
									>
										{t("catalogue.main-title", { ns: "features" })}
										<ArrowRight className="h-3 w-3" />
									</Link>
								</div>
								<ul className="flex flex-wrap gap-3 text-sm text-gray-700 dark:text-gray-300">
									{nestingWorkshopItems.map((item) => {
										const emoji = itemEmoji(item);

										const name = t(item.translation.key, {
											ns: "general",
											number: item.translation.number,
										});

										const owned = item.cosmetics.every((cosmetic) =>
											nestingWorkshopOwned.includes(cosmetic),
										);

										return (
											<li
												className="flex flex-col items-center gap-1"
												key={item.cosmetics.join(",")}
											>
												<Tooltip content={name}>
													<div
														aria-label={
															owned
																? t("daily-guides.nesting-workshop-prop-owned", {
																		ns: "features",
																		prop: name,
																	})
																: name
														}
														className="relative flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800"
														role="img"
													>
														{emoji ? (
															<EmojiIcon className="size-7" emoji={emoji} />
														) : (
															<span className="px-1 text-center text-[10px] leading-tight">
																{name}
															</span>
														)}
														{owned && (
															<EmojiIcon
																className="absolute -top-1 -right-1 size-4"
																emoji={MISCELLANEOUS_EMOJIS.Yes}
															/>
														)}
													</div>
												</Tooltip>
												{item.cost && <CostList costs={sumCosts([item.cost])} locale={locale} />}
											</li>
										);
									})}
								</ul>
							</div>
						)}
						{visibleDaysCount.length > 0 && (
							<div className="border-t-2 border-gray-200 pt-4 dark:border-gray-700">
								{visibleDaysCount.map(({ content, iconURL, key }) => (
									<div className="mb-1 flex items-center gap-2 last:mb-0" key={key}>
										{iconURL ? (
											<div
												aria-hidden="true"
												className="discord-emoji h-4 w-4"
												style={{ backgroundImage: `url(${iconURL})` }}
											/>
										) : null}
										<p className="text-xs text-gray-500 dark:text-gray-400">{content}</p>
									</div>
								))}
							</div>
						)}
					</div>
					{selectedInfographic && (
						<InfographicPreview
							acknowledgement={selectedInfographic.acknowledgement}
							desktop="inline"
							imageURL={selectedInfographic.imageURL}
							onClose={() => setSelectedInfographic(null)}
							title={t("infographic", { ns: "general" })}
						/>
					)}
				</div>
				<Pagination
					currentPage={page}
					dates={{
						label: (offset) => paginationLabels[offset] ?? String(offset),
						url: (offset) =>
							offset === 0
								? "?today=1"
								: `?date=${Temporal.PlainDate.from(todayDate).add({ days: offset }).toString()}`,
					}}
					maximumPage={0}
					minimumPage={minimumPage}
				/>
			</div>
		</CentredSitePage>
	);
}
