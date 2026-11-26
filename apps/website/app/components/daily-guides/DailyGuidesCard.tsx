import { clsx } from "clsx";
import { ArrowRight } from "lucide-react";
import { type JSX, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { patchNoteVersion, upcomingPatchNote } from "@thatskyapplication/sky-links";
import {
	communityUpcomingEvents,
	type DailyGuidesDaysCountItem,
	DailyQuestToAcknowledgement,
	DailyQuestToInfographicURL,
	dailyQuestLabel,
	daysLeftText,
	daysUntil,
	doublePeriodCountdown,
	eventDaysLeftText,
	type fetchDailyGuides,
	formatEmojiURL,
	isDailyQuest,
	KINGDOM,
	RADIANCE_EVENTS,
	returningSpiritsCountdown,
	returningSpiritsSchedule,
	ScheduleType,
	ScheduleTypeToLocaleKey,
	type ShardEruptionData,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyUpcomingSeason,
	TIME_ZONE,
	upcomingEventCountdown,
	upcomingMaintenanceCountdown,
	upcomingMaintenancePeriods,
	visibleDaysCountItems,
} from "@thatskyapplication/utility";
import { ExternalLink } from "~/components/ExternalLink";
import { ExternalLinkList } from "~/components/ExternalLinkList";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import { MaintenanceBanner } from "~/components/MaintenanceBanner.js";
import {
	type NestingWorkshopProp,
	NestingWorkshopProps,
} from "~/components/NestingWorkshopProps.js";
import { ShardEruptionTimestamp } from "~/components/ShardEruptionTimestamp.js";
import { ShardRewardIcon } from "~/components/ShardRewardIcon.js";
import { SkeletonText } from "~/components/SkeletonText.js";
import { useCDNURL } from "~/hooks/use-cdn-url.js";
import { cdnAssetURL } from "~/utility/cdn.js";
import {
	DyeTypeToEmoji,
	EventIdToEventTicketEmoji,
	MISCELLANEOUS_EMOJIS,
	SeasonIdToSeasonalEmoji,
	seasonalCandleEmoji,
} from "~/utility/emojis.js";
import {
	DOUBLE_HEART_PERIODS,
	DOUBLE_TREASURE_CANDLE_PERIODS,
	type DoublePeriodGroup,
	doubleSeasonalLightPeriods,
	NESTING_WORKSHOP_CATALOGUE_URL,
} from "~/utility/schedule.js";
import { spiritWikiLink } from "~/utility/spirits.js";
import { ICON_LINK_CLASS, NOTE_CLASS, VIEW_LINK_CLASS } from "~/utility/styles.js";
import { maintenanceBannerLabels, type shardEruptionTimestampLabels } from "~/utility/time.js";

const RETURNING_SPIRITS_LIST_PLACEHOLDER = "__RETURNING_SPIRITS_LIST__" as const;
const SECTION_LINK_CLASS = clsx(ICON_LINK_CLASS, "text-xs font-medium");

interface DaysCountItem extends DailyGuidesDaysCountItem {
	key: string;
	content: string | JSX.Element;
	iconURL?: string | undefined;
}

interface DailyGuidesShardEruption extends Omit<ShardEruptionData, "timestamps"> {
	timestamps: ReturnType<typeof shardEruptionTimestampLabels>;
}

interface DailyGuidesTreasureCandleLink {
	footnote: number | null;
	url: string;
}

export interface DailyGuidesCardData {
	dailyGuides: Awaited<ReturnType<typeof fetchDailyGuides>>;
	date: string;
	dateString: string;
	hour12: boolean | undefined;
	isToday: boolean;
	locale: string;
	nestingWorkshop: readonly NestingWorkshopProp[];
	shard: DailyGuidesShardEruption | null;
	shardEruptionExists: boolean;
	timeZone: string;
	timeZoneEstimated: boolean;
	treasureCandleLinks: readonly DailyGuidesTreasureCandleLink[];
	treasureCandleNotes: readonly string[];
}

export interface DailyGuidesCardEditors {
	nestingWorkshop: JSX.Element | null;
	quests: JSX.Element;
	travellingRock: JSX.Element;
}

export function DailyGuidesCard({
	card,
	currentTimestamp,
	editors,
}: {
	card: DailyGuidesCardData;
	currentTimestamp: number;
	editors?: DailyGuidesCardEditors | undefined;
}) {
	const {
		dailyGuides,
		date,
		dateString,
		hour12,
		isToday,
		locale,
		nestingWorkshop,
		shard,
		shardEruptionExists,
		timeZone,
		timeZoneEstimated,
		treasureCandleLinks,
		treasureCandleNotes,
	} = card;

	const [selectedInfographic, setSelectedInfographic] = useState<SelectedInfographic | null>(null);
	const [selectedInfographicDate, setSelectedInfographicDate] = useState(date);
	const cdnURL = useCDNURL();
	const { t } = useTranslation();

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
	const travellingRockURL = travellingRock
		? cdnAssetURL(cdnURL, `daily_guides/travelling_rocks/${travellingRock}.webp`)
		: null;
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

	for (const returningSpirits of returningSpiritsSchedule(today)) {
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

	for (const { id, name, start, end, endUnconfirmed } of skyNotEndedEvents(today).values()) {
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
			content: eventDaysLeftText({ end, endUnconfirmed }, today, { locale, t }, eventName),
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

	const infographicURLs = [
		...quests.map(({ url }) => url),
		...treasureCandleLinks.map(({ url }) => url),
		seasonalCandles?.url,
		shard?.infographic.url,
		travellingRockURL,
	];

	if (selectedInfographic && !infographicURLs.includes(selectedInfographic.imageURL)) {
		setSelectedInfographic(null);
	}

	const handleImageClick = (url: string | null, acknowledgement: string | null = null) => {
		if (url) {
			setSelectedInfographic({ acknowledgement, imageURL: url });
		}
	};

	return (
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
				{(editors || quests.length > 0) && (
					<div className="mb-5">
						<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
							{t("daily-guides.quests-heading", { ns: "features" })}
						</h2>
						{quests.length > 0 && (
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
						)}
						{editors?.quests}
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
										aria-describedby={footnote ? `treasure-candles-note-${footnote}` : undefined}
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
									{footnote !== null && footnote !== treasureCandleLinks[index + 1]?.footnote && (
										<sup
											className={clsx(
												"text-[10px]",
												treasureCandleLinks.length === 1 && "absolute top-0 left-full leading-none",
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
										<span className="text-sm text-gray-700 dark:text-gray-300">{shard.reward}</span>
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
				{(editors || travellingRock || travellingRockNotSpawned) && (
					<div className="mb-5">
						<h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
							{t("daily-guides.travelling-rock", { ns: "features" })}
						</h2>
						{travellingRock ? (
							<button
								className={VIEW_LINK_CLASS}
								onClick={() => handleImageClick(travellingRockURL)}
								type="button"
							>
								{t("view", { ns: "general" })}
							</button>
						) : (
							travellingRockNotSpawned && (
								<p className="my-4 text-sm text-gray-500 dark:text-gray-400">
									{t("none", { ns: "general", context: "travelling-rock" })}
								</p>
							)
						)}
						{editors?.travellingRock}
					</div>
				)}
				{(editors?.nestingWorkshop || nestingWorkshop.length > 0) && (
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
						{nestingWorkshop.length > 0 && (
							<NestingWorkshopProps locale={locale} nestingWorkshop={nestingWorkshop} />
						)}
						{editors?.nestingWorkshop}
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
	);
}
