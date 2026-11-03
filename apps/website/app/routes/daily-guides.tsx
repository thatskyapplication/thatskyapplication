import { ButtonStyle, ComponentType } from "@discordjs/core/http-only";
import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";
import { type JSX, useState } from "react";
import { useTranslation } from "react-i18next";
import type { HeadersArgs } from "react-router";
import { data, Link, redirect } from "react-router";
import { patchNoteVersion, upcomingPatchNote } from "@thatskyapplication/sky-links";
import {
	communityUpcomingEvents,
	dailyGuidesContainer,
	type DailyGuidesDaysCountItem,
	daysLeftText,
	daysUntil,
	doublePeriodCountdown,
	DailyQuestToAcknowledgement,
	DailyQuestToInfographicURL,
	fetchDailyGuides,
	fetchFirstDailyGuidesDate,
	formatEmojiURL,
	isDailyQuest,
	KINGDOM,
	nestingWorkshopDate,
	nextDailyReset,
	parsePlainDate,
	RADIANCE_EVENTS,
	returningSpiritsCountdown,
	returningSpiritsSchedule,
	ScheduleType,
	ScheduleTypeToLocaleKey,
	shardEruption,
	skyCurrentSeason,
	skyNow,
	skyNotEndedEvents,
	skyUpcomingSeason,
	SHARD_ERUPTION_START_DATE,
	TIME_ZONE,
	treasureCandles,
	upcomingEventCountdown,
	upcomingMaintenanceCountdown,
	upcomingMaintenancePeriods,
	visibleDaysCountItems,
	WEBSITE_URL,
	dailyQuestLabel,
} from "@thatskyapplication/utility";
import { DatePicker } from "~/components/DatePicker";
import { ExternalLink } from "~/components/ExternalLink";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import { MaintenanceBanner } from "~/components/MaintenanceBanner.js";
import { NestingWorkshopProps } from "~/components/NestingWorkshopProps.js";
import { CentredSitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination.js";
import { ShardEruptionTimestamp } from "~/components/ShardEruptionTimestamp.js";
import { ShardRewardIcon } from "~/components/ShardRewardIcon.js";
import { SkeletonText } from "~/components/SkeletonText.js";
import { CDN_URL } from "~/config.server";
import database from "~/database.server";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import { getRequestSession } from "~/middleware/session.js";
import { cdnAssetURL } from "~/utility/cdn.js";
import { WEBSITE_COLOUR, WEBSITE_ICON_URL } from "~/utility/constants.js";
import { fitsDiscordComponentEmbed } from "~/utility/discord-component-embed.server.js";
import {
	DyeTypeToEmoji,
	EMOJIS,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
	seasonalCandleEmoji,
} from "~/utility/emojis.js";
import { hexColour } from "~/utility/functions.js";
import { firstDayOfWeek } from "~/utility/locale.js";
import { fetchNestingWorkshopProps } from "~/utility/nesting-workshop.server.js";
import {
	DOUBLE_HEART_PERIODS,
	DOUBLE_TREASURE_CANDLE_PERIODS,
	type DoublePeriodGroup,
	doubleSeasonalLightPeriods,
	NESTING_WORKSHOP_CATALOGUE_URL,
} from "~/utility/schedule.js";
import { spiritWikiLink } from "~/utility/spirits.js";
import {
	DATE_NAVIGATION_CLASS,
	ICON_LINK_CLASS,
	NOTE_CLASS,
	VIEW_LINK_CLASS,
} from "~/utility/styles.js";
import { maintenanceBannerLabels, shardEruptionTimestampLabels } from "~/utility/time.js";
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
const SECTION_LINK_CLASS = clsx(ICON_LINK_CLASS, "text-xs font-medium");

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
		{ name: "theme-color", content: hexColour(WEBSITE_COLOUR) },
		{ property: "og:title", content: loaderData.title },
		{ property: "og:description", content: DAILY_GUIDES_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: WEBSITE_ICON_URL },
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

	const [dailyGuides, nestingWorkshop] = await Promise.all([
		fetchDailyGuides(database, date),
		fetchNestingWorkshopProps(date, discordUser?.id),
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

	const inCurrentNestingWorkshop =
		nestingWorkshopDate(date)?.getTime() === nestingWorkshopDate(todayDate)?.getTime();

	const upcomingUpdate = upcomingPatchNote(date.toString());
	const shardEruptionURL = new URL("/shard-eruption", WEBSITE_URL);

	if (!isToday) {
		shardEruptionURL.searchParams.set("date", date.toString());
	}

	const { container } = dailyGuidesContainer(
		{
			cdnURL: CDN_URL,
			currentTime: now,
			dailyGuides,
			date,
			emojis: EMOJIS,
			locale,
			nestingWorkshopItems: nestingWorkshop.map(({ item }) => item),
			shardEruptionButton: {
				type: ComponentType.Button,
				style: ButtonStyle.Link,
				url: shardEruptionURL.href,
				label: t("more", { ns: "general" }),
			},
			t,
			upcomingUpdate: upcomingUpdate && {
				date: upcomingUpdate.date,
				version: patchNoteVersion(upcomingUpdate.identifier),
			},
			url: new URL(url.pathname, WEBSITE_URL).href,
		},
		{ bold: false, fits: fitsDiscordComponentEmbed, showShardTimestampStatus: true },
	);

	const cacheMaxAge = dailyGuidesCacheMaxAge(now, isToday || inCurrentNestingWorkshop ? 300 : 3600);

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
			discordComponentEmbed: fitsDiscordComponentEmbed(container) ? container : null,
			nestingWorkshop,
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
						timestamps: shardEruptionTimestampLabels(shard.timestamps, {
							locale,
							timeZone,
							hour12,
						}),
					}
				: null,
		},
		{
			headers: {
				"Cache-Control": discordUser ? "private, no-cache" : `private, max-age=${cacheMaxAge}`,
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
	useSkyDailyResetRevalidator(currentTimestamp, initialTimestamp);

	if (selectedInfographicDate !== date) {
		setSelectedInfographicDate(date);
		setSelectedInfographic(null);
	}

	const now = isToday
		? Temporal.Instant.fromEpochMilliseconds(currentTimestamp).toZonedDateTimeISO(TIME_ZONE)
		: Temporal.PlainDate.from(date).toZonedDateTime(TIME_ZONE);
	const currentUnix = Math.floor(currentTimestamp / 1_000);
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

	let seasonalCandles = null;
	const daysCount: DaysCountItem[] = [];

	const addDoublePeriods = ({ emoji, name, source }: DoublePeriodGroup) => {
		for (const period of source) {
			if (Temporal.ZonedDateTime.compare(period.end, today) > 0) {
				daysCount.push({
					content: doublePeriodCountdown(name, period, today, { locale, t }),
					end: period.end,
					iconURL: formatEmojiURL(emoji.id),
					key: `${name}-${period.start.epochMilliseconds}`,
					start: period.start,
				});
			}
		}
	};

	if (season) {
		const seasonEmoji = SeasonIdToSeasonalEmoji[season.id];

		daysCount.push({
			content: daysLeftText("season", season.end, now, { locale, t }),
			end: season.end,
			iconURL: seasonEmoji ? formatEmojiURL(seasonEmoji.id) : undefined,
			key: `season-current-${season.id}`,
			start: season.start,
		});

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		seasonalCandles = {
			iconURL: formatEmojiURL(seasonalCandleEmoji(season.id).id),
			remaining: seasonalCandlesLeft,
			remainingWithPass: seasonalCandlesLeftWithSeasonPass,
			url: season.seasonalCandles(today),
		};

		addDoublePeriods(doubleSeasonalLightPeriods(season));
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const nextSeasonEmoji = SeasonIdToSeasonalEmoji[next.id];

		daysCount.push({
			content: t("daily-guides.season-upcoming", {
				ns: "features",
				count: Math.floor(daysUntil(next.start, today)),
			}),
			end: next.end,
			iconURL: nextSeasonEmoji ? formatEmojiURL(nextSeasonEmoji.id) : undefined,
			key: `season-upcoming-${next.id}`,
			start: next.start,
		});
	}

	const returningSpirits = returningSpiritsSchedule(today);

	if (returningSpirits) {
		const { start, end, spiritIds } = returningSpirits;

		const commonSeason = KINGDOM.commonSeasonOf(spiritIds);
		const returningSpiritsSeasonEmoji = commonSeason && SeasonIdToSeasonalEmoji[commonSeason.id];

		const countdown = returningSpiritsCountdown(
			returningSpirits,
			RETURNING_SPIRITS_LIST_PLACEHOLDER,
			today,
			{ locale, t },
		);

		const [beforeSpiritList, afterSpiritList] = countdown.split(RETURNING_SPIRITS_LIST_PLACEHOLDER);
		const spiritLinks = spiritIds.map((spiritId) => spiritWikiLink(spiritId, t));

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
		const daysUntilStart = daysUntil(start, today);
		const eventName = t(name, { ns: "general" });
		const eventEmoji = EventIdToEventTicketEmoji[id];
		const iconURL = eventEmoji ? formatEmojiURL(eventEmoji.id) : undefined;

		if (daysUntilStart > 0) {
			const upcoming = upcomingEventCountdown(
				eventName,
				start,
				timeFormat.format(start.epochMilliseconds),
				today,
				{ locale, t },
			);

			daysCount.push({
				content:
					daysUntilStart < 1 && timeZoneEstimated ? (
						<SkeletonText>{upcoming}</SkeletonText>
					) : (
						upcoming
					),
				end,
				iconURL,
				key: `event-upcoming-${name}`,
				start,
			});

			continue;
		}

		daysCount.push({
			content: daysLeftText("event", end, today, { locale, t }, eventName),
			end,
			iconURL,
			key: `event-ending-${name}`,
			start,
		});
	}

	for (const { start, name, marketingURL } of communityUpcomingEvents(today)) {
		const translatedText = upcomingEventCountdown(
			name,
			start,
			timeFormat.format(start.epochMilliseconds),
			today,
			{ locale, t },
		);

		let content: DaysCountItem["content"] = translatedText;

		if (marketingURL) {
			const parts = translatedText.split(name);

			content = (
				<span>
					{parts[0]}
					<ExternalLink href={marketingURL} icon iconClassName="h-3 w-3">
						{name}
					</ExternalLink>
					{parts[1]}
				</span>
			);
		}

		daysCount.push({
			content:
				daysUntil(start, today) < 1 && timeZoneEstimated ? (
					<SkeletonText>{content}</SkeletonText>
				) : (
					content
				),
			key: `community-event-${name}-${start.epochMilliseconds}`,
			start,
		});
	}

	for (const radianceEvent of RADIANCE_EVENTS.filter(
		({ end }) => Temporal.ZonedDateTime.compare(end, today) > 0,
	)) {
		const daysUntilStart = daysUntil(radianceEvent.start, today);
		const radianceName = t("event-names.radiance-event", { ns: "general" });
		const radianceEmojiURL = formatEmojiURL(MISCELLANEOUS_EMOJIS.Dye.id);
		const dyeEmojiURLs = radianceEvent.dyes.map((dye) => formatEmojiURL(DyeTypeToEmoji[dye].id));

		const radianceText =
			daysUntilStart > 0
				? upcomingEventCountdown(
						radianceName,
						radianceEvent.start,
						timeFormat.format(radianceEvent.start.epochMilliseconds),
						today,
						{ locale, t },
					)
				: daysLeftText("event", radianceEvent.end, today, { locale, t }, radianceName);

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

	addDoublePeriods(DOUBLE_TREASURE_CANDLE_PERIODS);
	addDoublePeriods(DOUBLE_HEART_PERIODS);

	const maintenances = maintenanceBannerLabels(now, { locale, timeZone, hour12 });

	for (const {
		days,
		period: { end, start },
	} of upcomingMaintenancePeriods(now)) {
		const upcoming = upcomingMaintenanceCountdown(
			days,
			timeFormat.format(start.epochMilliseconds),
			{ locale, t },
		);

		daysCount.push({
			content: days === 1 && timeZoneEstimated ? <SkeletonText>{upcoming}</SkeletonText> : upcoming,
			end,
			key: `maintenance-upcoming-${start.epochMilliseconds}`,
			start,
		});
	}

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
						{maintenances.length > 0 && (
							<MaintenanceBanner
								className="mb-5"
								maintenances={maintenances}
								timeZoneEstimated={timeZoneEstimated}
							/>
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
							{treasureCandleLinks.length > 0 ? (
								<div className="flex flex-wrap items-baseline gap-1 text-sm">
									{treasureCandleLinks.map(({ url, footnote }, index) => (
										<span className="relative" key={url}>
											<button
												aria-describedby={
													footnote ? `treasure-candles-note-${footnote}` : undefined
												}
												className={
													treasureCandleLinks.length === 1
														? VIEW_LINK_CLASS
														: "regular-link font-medium transition-colors"
												}
												onClick={() => handleImageClick(url)}
												type="button"
											>
												{treasureCandleLinks.length === 1
													? t("view", { ns: "general" })
													: `${index * 4 + 1}–${index * 4 + 4}`}
											</button>
											{footnote !== null &&
												footnote !== treasureCandleLinks[index + 1]?.footnote && (
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
							) : (
								<p className="my-4 text-sm text-gray-500 dark:text-gray-400">
									{t("none", { ns: "general" })}
								</p>
							)}
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
											className={VIEW_LINK_CLASS}
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
											style={{ backgroundImage: `url(${seasonalCandles.iconURL})` }}
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
										className={SECTION_LINK_CLASS}
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
													<ShardRewardIcon strong={shard.strong} />
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
												<ShardRewardIcon strong={shard.strong} />
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
										className={VIEW_LINK_CLASS}
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
						{nestingWorkshop.length > 0 && (
							<div className="mb-5">
								<div className="mb-3 flex items-center justify-between gap-3">
									<h2 className="text-sm font-semibold text-gray-900 dark:text-white">
										{t(ScheduleTypeToLocaleKey[ScheduleType.NestingWorkshop])}
									</h2>
									<Link className={SECTION_LINK_CLASS} to={NESTING_WORKSHOP_CATALOGUE_URL}>
										{t("catalogue.main-title", { ns: "features" })}
										<ArrowRight className="h-3 w-3" />
									</Link>
								</div>
								<NestingWorkshopProps locale={locale} nestingWorkshop={nestingWorkshop} />
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
										<p className={NOTE_CLASS}>{content}</p>
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
