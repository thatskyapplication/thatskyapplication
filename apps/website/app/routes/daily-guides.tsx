import { clsx } from "clsx";
import { AlertTriangle, ArrowRight, ExternalLinkIcon } from "lucide-react";
import { type JSX, useState } from "react";
import { useTranslation } from "react-i18next";
import type { HeadersArgs } from "react-router";
import { data, Link } from "react-router";
import { patchNoteVersion, upcomingPatchNote } from "@thatskyapplication/patch-notes";
import {
	communityUpcomingEvents,
	type DailyGuidesDaysCountItem,
	DailyQuestToAcknowledgement,
	DailyQuestToInfographicURL,
	DOUBLE_HEART_EVENTS,
	epochSeconds,
	formatEmojiURL,
	isDailyQuest,
	MAINTENANCE_PERIODS,
	nextDailyReset,
	RADIANCE_EVENTS,
	returningSpiritsSchedule,
	shardEruption,
	skyCurrentSeason,
	skyNow,
	skyNotEndedEvents,
	skyUpcomingSeason,
	sortDaysCountItems,
	TIME_ZONE,
	TREASURE_CANDLES_DOUBLE_CONFIGURATIONS,
	treasureCandles,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import { CentredSitePage } from "~/components/PageLayout";
import { ShardEruptionTimestamp } from "~/components/ShardEruptionTimestamp.js";
import database from "~/database.server";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { cdnAssetURL, getCDNURLFromMatches } from "~/utility/cdn.js";
import { APPLICATION_NAME } from "~/utility/constants.js";
import {
	DyeTypeToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalCandleEmoji,
	SeasonIdToSeasonalEmoji,
} from "~/utility/emojis.js";
import { getTimePreferences } from "~/utility/time.server";
import type { Route } from "./+types/daily-guides.js";

interface DaysCountItem extends DailyGuidesDaysCountItem {
	key: string;
	content: string | JSX.Element;
	iconURL?: string | undefined;
}

const DAILY_GUIDES_TITLE = "Daily guides" as const;
const DAILY_GUIDES_DESCRIPTION =
	"Today's quests, treasure candles, seasonal candles, returning spirits, shard eruption, travelling rock, maintenance, and countdowns for Sky: Children of the Light." as const;
const RETURNING_SPIRITS_LIST_PLACEHOLDER = "__RETURNING_SPIRITS_LIST__" as const;

function dailyGuidesCacheMaxAge(timestamp: number) {
	const now = Temporal.Instant.fromEpochMilliseconds(timestamp).toZonedDateTimeISO(TIME_ZONE);
	const secondsUntilDailyReset = Math.floor(nextDailyReset(now).since(now).total("seconds"));

	return Math.max(0, Math.min(300, secondsUntilDailyReset));
}

export const meta: Route.MetaFunction = ({ location, matches }) => {
	const cdnURL = getCDNURLFromMatches(matches);
	const url = String(new URL(location.pathname, WEBSITE_URL));

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{
			name: "keywords",
			content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord bot, Discord application, Daily guides, Daily quests, Treasure candles, Seasonal candles, Returning spirits, Shard eruption, Travelling rock, Maintenance, Season countdown, Event countdowns`,
		},
		{ title: DAILY_GUIDES_TITLE },
		{ name: "description", content: DAILY_GUIDES_DESCRIPTION },
		{ name: "theme-color", content: "#A5B5F1" },
		{ property: "og:title", content: DAILY_GUIDES_TITLE },
		{ property: "og:description", content: DAILY_GUIDES_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: cdnAssetURL(cdnURL, "avatar_icons/caelus.webp") },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: DAILY_GUIDES_TITLE },
		{ name: "twitter:description", content: DAILY_GUIDES_DESCRIPTION },
		{ rel: "canonical", href: url },
	];
};

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const { locale, timeZone, hour12 } = getTimePreferences(request, context);
	const dailyGuides = await database.selectFrom("daily_guides").selectAll().execute();
	const now = skyNow();
	const initialTimestamp = now.epochMilliseconds;
	const shard = shardEruption(now);

	const cacheMaxAge = dailyGuidesCacheMaxAge(initialTimestamp);

	return data(
		{
			initialTimestamp,
			locale,
			timeZone,
			hour12,
			dailyGuides: dailyGuides[0]!,
			todayString: new Intl.DateTimeFormat(locale, {
				timeZone: TIME_ZONE,
				dateStyle: "full",
			}).format(initialTimestamp),
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
	const { initialTimestamp, locale, timeZone, hour12, dailyGuides, todayString, shard } =
		loaderData;

	const [selectedInfographic, setSelectedInfographic] = useState<SelectedInfographic | null>(null);
	const cdnURL = useCDNURL();
	const { t } = useTranslation();
	const currentTimestamp = useCurrentTimestamp(initialTimestamp);
	useSkyDailyResetRevalidator(currentTimestamp);

	const now =
		Temporal.Instant.fromEpochMilliseconds(currentTimestamp).toZonedDateTimeISO(TIME_ZONE);
	const currentUnix = epochSeconds(now);
	const today = now.startOfDay();
	const quest1 = dailyGuides.quest1;
	const quest2 = dailyGuides.quest2;
	const quest3 = dailyGuides.quest3;
	const quest4 = dailyGuides.quest4;
	const travellingRock = dailyGuides.travelling_rock;
	const travellingRockNotSpawned = dailyGuides.travelling_rock_not_spawned;
	const season = skyCurrentSeason(now);

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

	const treasureCandleURLs = treasureCandles(today);
	let seasonalCandles = null;
	const daysCount: DaysCountItem[] = [];
	const seasonalCandleEmoji = season ? SeasonIdToSeasonalCandleEmoji[season.id] : null;

	if (season) {
		const daysLeftText = t("days-left.season", {
			ns: "general",
			count: Math.ceil(season.end.since(now).total({ unit: "days", relativeTo: now })) - 1,
		});

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

		for (const doubleSeasonalLight of season.doubleSeasonalLight?.filter(
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
						? t("days-left.double-seasonal-light", {
								ns: "general",
								count: daysLeft,
							})
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
		const countdown = active
			? t("daily-guides.returning-spirits-active-list", {
					ns: "features",
					count: Math.ceil(end.since(today).total({ unit: "days", relativeTo: today })) - 1,
					returningSpirits: returningSpiritsName,
					spirits: RETURNING_SPIRITS_LIST_PLACEHOLDER,
				})
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
			key: `returning-spirits-${start.epochMilliseconds}`,
			start,
		});
	}

	for (const { id, name, start, end } of skyNotEndedEvents(today).values()) {
		const daysUntilStart = start.since(today).total({ unit: "days", relativeTo: today });
		const eventName = t(name, { ns: "general" });
		const eventEmoji = EventIdToEventTicketEmoji[id];

		if (daysUntilStart > 0) {
			daysCount.push({
				content: t("daily-guides.event-upcoming", {
					ns: "features",
					event: eventName,
					count: Math.floor(daysUntilStart),
				}),
				end,
				iconURL: eventEmoji ? formatEmojiURL(eventEmoji.id) : undefined,
				key: `event-upcoming-${name}`,
				start,
			});

			continue;
		}

		daysCount.push({
			content: t("days-left.event", {
				ns: "general",
				count: Math.ceil(end.since(today).total({ unit: "days", relativeTo: today })) - 1,
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

			const translatedText =
				daysUntilStart >= 1
					? t("daily-guides.event-upcoming", {
							ns: "features",
							event: name,
							count: Math.floor(daysUntilStart),
						})
					: t("daily-guides.event-upcoming-time", {
							ns: "features",
							event: name,
							time: new Intl.DateTimeFormat(locale, {
								timeZone,
								timeStyle: "short",
								hour12,
							}).format(start.epochMilliseconds),
						});

			if (marketingURL) {
				const parts = translatedText.split(name);

				daysCount.push({
					content: (
						<span>
							{parts[0]}
							<a
								className="regular-link inline-flex items-center gap-1"
								href={marketingURL}
								rel="noopener noreferrer"
								target="_blank"
							>
								{name}
								<ExternalLinkIcon className="h-3 w-3" />
							</a>
							{parts[1]}
						</span>
					),
					key: `community-event-${name}-${start.epochMilliseconds}`,
					start,
				});
			} else {
				daysCount.push({
					content: translatedText,
					key: `community-event-${name}-${start.epochMilliseconds}`,
					start,
				});
			}
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
		const radianceText =
			daysUntilStart >= 1
				? t("daily-guides.event-upcoming", {
						ns: "features",
						count: Math.floor(daysUntilStart),
						event: t("event-names.radiance-event", { ns: "general" }),
					})
				: t("days-left.event", {
						ns: "general",
						count:
							Math.ceil(radianceEvent.end.since(today).total({ unit: "days", relativeTo: today })) -
							1,
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
					? t("days-left.double-treasure-candles", {
							ns: "general",
							count: daysLeft,
						})
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
					? t("days-left.double-hearts", {
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
			daysCount.push({
				content: t("daily-guides.maintenance-upcoming", {
					ns: "features",
					count: 1,
					time: new Intl.DateTimeFormat(locale, {
						timeZone,
						timeStyle: "short",
						hour12,
					}).format(maintenance.start.epochMilliseconds),
				}),
				end: maintenance.end,
				key: `maintenance-upcoming-${maintenance.start.epochMilliseconds}`,
				start: maintenance.start,
			});
		}
	}

	const upcomingUpdate = upcomingPatchNote(today.toPlainDate().toString());

	if (upcomingUpdate) {
		const start = Temporal.PlainDate.from(upcomingUpdate.date).toZonedDateTime(TIME_ZONE);

		daysCount.push({
			content: t("daily-guides.update-upcoming", {
				ns: "features",
				count: today.toPlainDate().until(Temporal.PlainDate.from(upcomingUpdate.date)).days,
				update: t("schedule.update-version", {
					ns: "features",
					version: patchNoteVersion(upcomingUpdate.identifier),
				}),
			}),
			key: `update-${upcomingUpdate.date}`,
			start,
		});
	}

	sortDaysCountItems(daysCount, now);

	const handleImageClick = (url: string | null, acknowledgement: string | null = null) => {
		if (url) {
			setSelectedInfographic({ acknowledgement, imageURL: url });
		}
	};

	return (
		<CentredSitePage>
			<div
				className={clsx(
					"flex w-full max-w-6xl gap-6 transition-all duration-300",
					selectedInfographic ? "items-start justify-between" : "justify-center",
				)}
			>
				<div className="w-full max-w-lg shrink-0 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
					<div className="mb-6 border-b-2 border-gray-200 pb-4 dark:border-gray-700">
						<h1 className="m-0 text-lg font-bold text-gray-900 dark:text-white">{todayString}</h1>
					</div>
					{todayMaintenance.length > 0 && (
						<div className="mb-5 flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/40">
							<AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
							<div>
								<p className="m-0 text-sm font-medium text-amber-800 dark:text-amber-200">
									{t("maintenance", { ns: "general" })}
								</p>
								{todayMaintenance.length === 1 ? (
									<p className="m-0 text-xs text-amber-700 dark:text-amber-300">
										{t("maintenance-description-singular", {
											ns: "general",
											start: new Intl.DateTimeFormat(locale, {
												timeStyle: "short",
												timeZone,
												hour12,
											}).format(todayMaintenance[0]!.start.epochMilliseconds),
											end: new Intl.DateTimeFormat(locale, {
												timeStyle: "short",
												timeZone,
												hour12,
											}).format(todayMaintenance[0]!.end.epochMilliseconds),
										})}
									</p>
								) : (
									<>
										<p className="m-0 text-xs text-amber-700 dark:text-amber-300">
											{t("maintenance-description-many", { ns: "general" })}
										</p>
										<ul className="m-0 list-disc ps-4 text-xs text-amber-600 dark:text-amber-400">
											{todayMaintenance.map((maintenance) => (
												<li key={maintenance.start.epochMilliseconds}>
													{t("time-range", {
														ns: "general",
														start: new Intl.DateTimeFormat(locale, {
															timeStyle: "short",
															timeZone,
															hour12,
														}).format(maintenance.start.epochMilliseconds),
														end: new Intl.DateTimeFormat(locale, {
															timeStyle: "short",
															timeZone,
															hour12,
														}).format(maintenance.end.epochMilliseconds),
													})}
												</li>
											))}
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
												{t(`quests.${quest}`, { ns: "general" })}
											</button>
										) : (
											<span className="flex-1 text-sm text-gray-700 dark:text-gray-300">
												{t(`quests.${quest}`, { ns: "general" })}
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}
					{treasureCandleURLs.length > 0 && (
						<div className="mb-5">
							<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
								{t("daily-guides.treasure-candles", { ns: "features" })}
							</h2>
							{treasureCandleURLs.length === 1 ? (
								<button
									className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
									onClick={() => handleImageClick(treasureCandleURLs[0])}
									type="button"
								>
									{t("view", { ns: "general" })}
								</button>
							) : (
								<div className="flex flex-wrap gap-1 text-sm">
									{treasureCandleURLs.map((treasureCandleURL, index) => (
										<span key={treasureCandleURL}>
											<button
												className="regular-link font-medium transition-colors"
												onClick={() => handleImageClick(treasureCandleURL)}
												type="button"
											>
												{`${index * 4 + 1}–${index * 4 + 4}`}
											</button>
											{index < treasureCandleURLs.length - 1 && (
												<span className="mx-1 text-gray-600 dark:text-gray-300">|</span>
											)}
										</span>
									))}
								</div>
							)}
						</div>
					)}
					{seasonalCandles && (
						<div className="mb-5">
							<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
								{t("daily-guides.seasonal-candles", { ns: "features" })}
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
					<div className="mb-5">
						<div className="mb-3 flex items-center justify-between gap-3">
							<h2 className="m-0 text-sm font-semibold text-gray-900 dark:text-white">
								{t("shard-eruption", { ns: "general" })}
							</h2>
							<Link
								className="regular-link inline-flex items-center gap-1 text-xs font-medium"
								to="/shard-eruption"
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
														backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/piece_of_light.webp")})`,
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
										<span className="text-sm text-gray-700 dark:text-gray-300">{shard.reward}</span>
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
													backgroundImage: `url(${cdnAssetURL(cdnURL, "assets/piece_of_light.webp")})`,
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
												variant="daily-guides"
											/>
										))}
									</div>
								</div>
							</div>
						) : (
							<p className="text-sm text-gray-500 dark:text-gray-400">
								{t("daily-guides.shard-eruption-none", { ns: "features" })}
							</p>
						)}
					</div>
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
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{t("daily-guides.shard-eruption-none", { ns: "features" })}
								</p>
							)}
						</div>
					)}
					{daysCount.length > 0 && (
						<div className="border-t-2 border-gray-200 pt-4 dark:border-gray-700">
							{daysCount.map(({ content, iconURL, key }) => (
								<div className="mb-1 flex items-center gap-2 last:mb-0" key={key}>
									{iconURL ? (
										<div
											aria-hidden="true"
											className="discord-emoji h-4 w-4"
											style={{ backgroundImage: `url(${iconURL})` }}
										/>
									) : null}
									<p className="m-0 text-xs text-gray-500 dark:text-gray-400">{content}</p>
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
		</CentredSitePage>
	);
}
