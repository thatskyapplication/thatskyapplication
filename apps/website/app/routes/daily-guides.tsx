import {
	communityUpcomingEvents,
	type DailyGuidesPacket,
	DailyQuestToInfographicURL,
	isDailyQuest,
	MAINTENANCE_PERIODS,
	RotationIdentifier,
	shardEruption,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyUpcomingSeason,
	Table,
	TIME_ZONE,
	treasureCandles,
} from "@thatskyapplication/utility";
import { AlertTriangle, ExternalLinkIcon, X } from "lucide-react";
import { type JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { LoaderFunctionArgs } from "react-router";
import { data, Link, useLoaderData } from "react-router";
import { getLocale } from "~/middleware/i18next.js";
import pg from "~/pg.server";
import { SEASONAL_CANDLE_ICON } from "~/utility/constants";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const locale = getLocale(context);
	const dailyGuides = await pg<DailyGuidesPacket>(Table.DailyGuides);
	const timeZone = request.headers.get("cf-timezone") ?? TIME_ZONE;
	const shard = shardEruption();

	return data(
		{
			locale,
			timeZone,
			dailyGuides: dailyGuides[0]!,
			todayString: new Intl.DateTimeFormat(locale, {
				timeZone: TIME_ZONE,
				dateStyle: "full",
			}).format(new Date()),
			shard: shard
				? {
						...shard,
						timestamps: shard.timestamps.map(({ start, end }) => ({
							start: {
								unix: start.toUnixInteger(),
								format: new Intl.DateTimeFormat(locale, {
									timeZone,
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
								}).format(start.toMillis()),
							},
							end: {
								unix: end.toUnixInteger(),
								format: new Intl.DateTimeFormat(locale, {
									timeZone,
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit",
								}).format(end.toMillis()),
							},
						})),
					}
				: shard,
		},
		{ headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } },
	);
};

export default function DailyGuides() {
	const { locale, timeZone, dailyGuides, todayString, shard } = useLoaderData<typeof loader>();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const { t } = useTranslation();
	const now = skyNow();
	const today = now.startOf("day");
	const quest1 = dailyGuides.quest1;
	const quest2 = dailyGuides.quest2;
	const quest3 = dailyGuides.quest3;
	const quest4 = dailyGuides.quest4;
	const travellingRock = dailyGuides.travelling_rock;
	const season = skyCurrentSeason(now);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && selectedImage) {
				setSelectedImage(null);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [selectedImage]);

	const quests = [];

	for (const quest of [quest1, quest2, quest3, quest4]) {
		if (quest !== null && isDailyQuest(quest)) {
			quests.push({ quest, url: DailyQuestToInfographicURL[quest] });
		}
	}

	const treasureCandleURLs = treasureCandles(today);
	let seasonalCandles = null;
	let seasonalCandlesURL = null;
	const daysCount: (string | JSX.Element)[] = [];

	if (season) {
		const seasonalCandlesRotation = season.resolveSeasonalCandlesRotation(today);

		const daysLeftText = t("days-left.season", {
			ns: "general",
			count: Math.ceil(season.end.diff(now, "days").days) - 1,
		});

		daysCount.push(daysLeftText);

		if (seasonalCandlesRotation) {
			const { rotation, realm } = seasonalCandlesRotation;
			let rotationIdentifier: RotationIdentifier = rotation;

			if (season.isDuringDoubleSeasonalLightEvent(today)) {
				rotationIdentifier = RotationIdentifier.Double;
			}

			seasonalCandlesURL = season.seasonalCandlesRotationURL(realm, rotationIdentifier);
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			season.remainingSeasonalCandles(today);

		seasonalCandles = {
			remaining: seasonalCandlesLeft,
			remainingWithPass: seasonalCandlesLeftWithSeasonPass,
			url: seasonalCandlesURL,
		};
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const daysUntilStart = next.start.diff(today, "days").days;
		daysCount.push(t("daily-guides.season-upcoming", { ns: "features", count: daysUntilStart }));
	}

	for (const { id, start, end } of skyNotEndedEvents(today).values()) {
		const daysUntilStart = start.diff(today, "days").days;
		const name = t(`events.${id}`, { ns: "general" });

		if (daysUntilStart > 0) {
			daysCount.push(
				t("daily-guides.event-upcoming", { ns: "features", event: name, count: daysUntilStart }),
			);

			continue;
		}

		daysCount.push(
			t("days-left.event", {
				ns: "general",
				count: Math.ceil(end.diff(today, "days").days) - 1,
				name,
			}),
		);
	}

	const communityEvents = communityUpcomingEvents(today);

	if (communityEvents.length > 0) {
		for (const { start, name, marketingURL } of communityEvents) {
			const daysUntilStart = start.diff(today, "days").days;

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
							}).format(start.toMillis()),
						});

			if (marketingURL) {
				const parts = translatedText.split(name);

				daysCount.push(
					<span key={`community-event-${name}`}>
						{parts[0]}
						<a
							className="regular-link inline-flex items-center gap-1"
							href={marketingURL}
							rel="noopener noreferrer"
							target="_blank"
						>
							{name}
							<ExternalLinkIcon className="w-3 h-3" />
						</a>
						{parts[1]}
					</span>,
				);
			} else {
				daysCount.push(translatedText);
			}
		}
	}

	const todayMaintenance = [];

	for (const maintenance of MAINTENANCE_PERIODS) {
		const daysUntilStart = maintenance.start.diff(today, "days").days;

		if (daysUntilStart < 1) {
			if (maintenance.end > now) {
				todayMaintenance.push(maintenance);
			}

			continue;
		}

		if (daysUntilStart >= 2) {
			daysCount.push(
				t("daily-guides.maintenance-upcoming", {
					ns: "features",
					count: Math.floor(daysUntilStart),
				}),
			);
		} else {
			daysCount.push(
				t("daily-guides.maintenance-upcoming", {
					ns: "features",
					count: 1,
					time: new Intl.DateTimeFormat(locale, {
						timeZone,
						timeStyle: "short",
					}).format(maintenance.start.toMillis()),
				}),
			);
		}
	}

	const handleImageClick = (url: string | null) => {
		if (url) {
			setSelectedImage(url);
		}
	};

	return (
		<div className="min-h-[calc(100vh-9rem)] flex items-center justify-center p-4">
			<div
				className={`flex gap-6 w-full max-w-6xl transition-all duration-300 ${
					selectedImage ? "justify-between items-center" : "justify-center"
				}`}
			>
				<div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 w-full max-w-lg shrink-0">
					<div className="mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
						<h1 className="text-lg font-bold text-gray-900 dark:text-white m-0">{todayString}</h1>
					</div>
					{todayMaintenance.length > 0 && (
						<div className="mb-5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl px-4 py-3 flex items-center gap-3">
							<AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
							<div>
								<p className="text-sm font-medium text-amber-800 dark:text-amber-200 m-0">
									{t("maintenance", { ns: "general" })}
								</p>
								<p className="text-xs text-amber-700 dark:text-amber-300 m-0">
									{t("schedule.maintenance-description", { ns: "features" })}
								</p>
								{todayMaintenance.map((maintenance) => (
									<p
										className="text-xs text-amber-600 dark:text-amber-400 m-0"
										key={maintenance.start.toMillis()}
									>
										{t("time-range", {
											ns: "general",
											start: new Intl.DateTimeFormat(locale, {
												timeStyle: "short",
												timeZone,
											}).format(maintenance.start.toMillis()),
											end: new Intl.DateTimeFormat(locale, {
												timeStyle: "short",
												timeZone,
											}).format(maintenance.end.toMillis()),
										})}
									</p>
								))}
							</div>
						</div>
					)}
					{quests.length > 0 && (
						<div className="mb-5">
							<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								{t("daily-guides.quests-heading", { ns: "features" })}
							</h2>
							<div className="space-y-2">
								{quests.map(({ quest, url }, index) => (
									<div className="flex items-start gap-3" key={quest}>
										<span className="text-gray-600 dark:text-gray-400 text-sm font-medium w-4 shrink-0">
											{index + 1}.
										</span>
										{url ? (
											<button
												className="regular-link text-sm font-medium transition-colors text-left"
												onClick={() => handleImageClick(url)}
												type="button"
											>
												{t(`quests.${quest}`, { ns: "general" })}
											</button>
										) : (
											<span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
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
							<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								{t("daily-guides.treasure-candles", { ns: "features" })}
							</h2>
							{treasureCandleURLs.length === 1 ? (
								<button
									className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
							<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								{t("daily-guides.seasonal-candles", { ns: "features" })}
							</h2>
							<div className="space-y-2">
								{seasonalCandles.url && (
									<button
										className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
										onClick={() => handleImageClick(seasonalCandles.url)}
										type="button"
									>
										{t("view", { ns: "general" })}
									</button>
								)}
								<div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
									<img alt="Seasonal candle" className="h-4 w-4" src={SEASONAL_CANDLE_ICON} />
									<span>
										{t(
											`daily-guides.${seasonalCandles.remaining === seasonalCandles.remainingWithPass ? "seasonal-candles-remain" : "seasonal-candles-remain-with-season-pass"}`,
											{
												ns: "features",
												remaining: seasonalCandles.remaining,
												remainingSeasonPass: seasonalCandles.remainingWithPass,
											},
										)}
									</span>
								</div>
							</div>
						</div>
					)}
					<div className="mb-5">
						<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
							<Link className="regular-link" to="/shard-eruption">
								{t("daily-guides.shard-eruption", { ns: "features" })}
							</Link>
						</h2>
						{shard ? (
							<div className="space-y-3">
								<div className="hidden sm:flex items-start justify-between">
									<div>
										<h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
											{t("daily-guides.shard-eruption-data", { ns: "features" })}
										</h3>
										<button
											className="regular-link text-sm font-medium transition-colors block mb-1"
											onClick={() => handleImageClick(shard.url)}
											type="button"
										>
											{t("shard-eruption.realm-map", {
												ns: "features",
												realm: shard.realm,
												map: shard.skyMap,
											})}
										</button>
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-700 dark:text-gray-300">
												{shard.reward}
											</span>
											{shard.strong ? (
												<img
													alt="Ascended candle"
													className="h-4 w-4"
													src="https://cdn.thatskyapplication.com/icons/ascended_candle.webp"
												/>
											) : (
												<img
													alt="Piece of light"
													className="h-4 w-4"
													src="https://cdn.thatskyapplication.com/icons/piece_of_light.webp"
												/>
											)}
										</div>
									</div>
									<div className="text-right">
										<h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
											{t("daily-guides.shard-eruption-timestamps", { ns: "features" })}
										</h3>
										<div className="space-y-1">
											{shard.timestamps.map(({ start, end }) => (
												<div key={start.unix}>
													<code
														className={`text-xs ${
															end.unix < now.toUnixInteger()
																? "line-through text-gray-400 dark:text-gray-500"
																: "text-gray-600 dark:text-gray-300"
														}`}
													>
														{start.format}–{end.format}
													</code>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="sm:hidden space-y-2">
									<button
										className="regular-link text-sm font-medium transition-colors block"
										onClick={() => handleImageClick(shard.url)}
										type="button"
									>
										{t("shard-eruption.realm-map", {
											ns: "features",
											realm: shard.realm,
											map: shard.skyMap,
										})}
									</button>
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-700 dark:text-gray-300">{shard.reward}</span>
										{shard.strong ? (
											<img
												alt="Ascended candle"
												className="h-4 w-4"
												src="https://cdn.thatskyapplication.com/icons/ascended_candle.webp"
											/>
										) : (
											<img
												alt="Piece of light"
												className="h-4 w-4"
												src="https://cdn.thatskyapplication.com/icons/piece_of_light.webp"
											/>
										)}
									</div>
									<div className="space-y-1">
										{shard.timestamps.map(({ start, end }) => (
											<div key={start.unix}>
												<code
													className={`text-xs ${
														end.unix < now.toUnixInteger()
															? "line-through text-gray-400 dark:text-gray-500"
															: "text-gray-600 dark:text-gray-300"
													}`}
												>
													{start.format}–{end.format}
												</code>
											</div>
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
					{travellingRock && (
						<div className="mb-5">
							<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								{t("daily-guides.travelling-rock", { ns: "features" })}
							</h2>
							<button
								className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
								onClick={() =>
									handleImageClick(
										`https://cdn.thatskyapplication.com/daily_guides/travelling_rocks/${travellingRock}.webp`,
									)
								}
								type="button"
							>
								{t("view", { ns: "general" })}
							</button>
						</div>
					)}
					{daysCount.length > 0 && (
						<div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
							{daysCount.map((item, index) => (
								<p
									className="text-xs text-gray-500 dark:text-gray-400 m-0 mb-1 last:mb-0"
									key={typeof item === "string" ? item : `event-${index}`}
								>
									{item}
								</p>
							))}
						</div>
					)}
				</div>
				{selectedImage && (
					<div className="hidden lg:flex w-1/2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 max-h-[70vh] flex-col">
						<div className="flex items-center justify-between mb-4 shrink-0">
							<h3 className="font-semibold text-gray-900 dark:text-white text-sm">
								{t("daily-guides.infographic", { ns: "features" })}
							</h3>
							<button
								aria-label="Close infographic"
								className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								onClick={() => setSelectedImage(null)}
								type="button"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
						<div className="flex items-center justify-center flex-1 min-h-0 overflow-hidden">
							<img
								alt="Infographic"
								className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
								src={selectedImage}
								style={{ objectFit: "contain" }}
							/>
						</div>
					</div>
				)}
			</div>
			{selectedImage && (
				<div className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-xs z-50 flex flex-col">
					<div className="flex items-center justify-between p-4 bg-gray-800/50 shrink-0">
						<h3 className="text-white font-medium">
							{t("daily-guides.infographic", { ns: "features" })}
						</h3>
						<button
							aria-label="Close infographic"
							className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
							onClick={() => setSelectedImage(null)}
							type="button"
						>
							<X className="w-6 h-6" />
						</button>
					</div>
					<div className="flex-1 flex items-center justify-center p-4 min-h-0 overflow-hidden">
						<img
							alt="Infographic"
							className="max-w-full max-h-full object-contain"
							src={selectedImage}
							style={{ objectFit: "contain" }}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
