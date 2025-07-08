import type { LoaderFunctionArgs } from "@remix-run/node";
import { data, useLoaderData } from "@remix-run/react";
import {
	type DailyGuideQuest,
	type DailyGuidesPacket,
	type DailyQuests,
	enGB,
	isDailyQuest,
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
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import pg from "~/pg.server";
import { SEASONAL_CANDLE_ICON } from "~/utility/constants";
import { getLocaleFromRequest } from "~/utility/functions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	try {
		const locale = getLocaleFromRequest(request);
		const dailyGuides = await pg<DailyGuidesPacket>(Table.DailyGuides);
		const timeZone = request.headers.get("cf-timezone") ?? TIME_ZONE;
		const shard = shardEruption();

		return data(
			{
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
	} catch {
		throw new Response("Unable to fetch daily guides.", { status: 500 });
	}
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This is fine.
export default function DailyGuides() {
	const { dailyGuides, todayString, shard } = useLoaderData<typeof loader>();
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const now = skyNow();
	const today = now.startOf("day");
	const quest1 = dailyGuides.quest1;
	const quest2 = dailyGuides.quest2;
	const quest3 = dailyGuides.quest3;
	const quest4 = dailyGuides.quest4;
	const travellingRock = dailyGuides.travelling_rock;
	const currentSeason = skyCurrentSeason(now);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && selectedImage) {
				setSelectedImage(null);
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [selectedImage]);

	const quests = [quest1, quest2, quest3, quest4].filter(
		(quest): quest is DailyGuideQuest & { id: DailyQuests } =>
			quest !== null && isDailyQuest(quest.id),
	);

	const treasureCandleURLs = treasureCandles(today);

	const treasureCandlesData = treasureCandleURLs.map((treasureCandleURL, index) => ({
		text: `${index * 4 + 1}–${index * 4 + 4}`,
		url: treasureCandleURL,
	}));

	let seasonalCandles = null;
	let seasonalCandlesUrl = null;
	const daysCount = [];

	if (currentSeason) {
		const seasonalCandlesRotation = currentSeason.resolveSeasonalCandlesRotation(today);
		const daysLeft = Math.ceil(currentSeason.end.diff(now, "days").days) - 1;

		const daysLeftText =
			daysLeft === 0
				? "The season ends today."
				: daysLeft === 1
					? "1 day left in the season."
					: `${daysLeft} days left in the season.`;

		daysCount.push(daysLeftText);

		if (seasonalCandlesRotation) {
			const { rotation, realm } = seasonalCandlesRotation;
			let rotationIdentifier: RotationIdentifier = rotation;

			if (currentSeason.isDuringDoubleSeasonalLightEvent(today)) {
				rotationIdentifier = RotationIdentifier.Double;
			}

			seasonalCandlesUrl = currentSeason.seasonalCandlesRotationURL(realm, rotationIdentifier);
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			currentSeason.remainingSeasonalCandles(today);

		seasonalCandles = {
			remaining: seasonalCandlesLeft,
			remainingWithPass: seasonalCandlesLeftWithSeasonPass,
			url: seasonalCandlesUrl,
		};
	} else {
		const next = skyUpcomingSeason(today);

		if (next) {
			const daysUntilStart = next.start.diff(now, "days").days;

			daysCount.push(
				daysUntilStart <= 1
					? "The new season starts tomorrow."
					: daysUntilStart >= 2
						? `The new season starts in ${Math.floor(daysUntilStart)} days.`
						: "The new season starts in 1 day.",
			);
		}
	}

	for (const { id, start, end } of skyNotEndedEvents(today).values()) {
		const daysUntilStart = start.diff(today, "days").days;
		const name = enGB.general.events[id];

		if (daysUntilStart > 0) {
			daysCount.push(
				daysUntilStart < 1
					? `${name} starts today.`
					: daysUntilStart >= 2
						? `${name} starts in ${Math.floor(daysUntilStart)} days.`
						: `${name} starts tomorrow.`,
			);

			continue;
		}

		const daysLeft = Math.ceil(end.diff(now, "days").days) - 1;

		daysCount.push(
			daysLeft === 0
				? `${name} ends today.`
				: daysLeft === 1
					? `1 day left in ${name}.`
					: `${daysLeft} days left in ${name}.`,
		);
	}

	const handleImageClick = (url: string | null) => {
		if (url) {
			setSelectedImage(url);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div
				className={`flex gap-6 w-full max-w-6xl transition-all duration-300 ${
					selectedImage ? "justify-between" : "justify-center"
				}`}
			>
				<div className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 w-full max-w-lg">
					<div className="mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
						<h1 className="text-lg font-bold text-gray-900 dark:text-white m-0">{todayString}</h1>
					</div>
					{quests.length > 0 && (
						<div className="mb-5">
							<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quests</h2>
							<div className="space-y-2">
								{quests.map((quest, index) => (
									<div key={quest.id} className="flex items-start gap-3">
										<span className="text-gray-600 dark:text-gray-400 text-sm font-medium w-4 flex-shrink-0">
											{index + 1}.
										</span>
										{quest.url ? (
											<button
												type="button"
												onClick={() => handleImageClick(quest.url)}
												className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors text-left flex-1"
											>
												{enGB.general.quests[quest.id]}
											</button>
										) : (
											<span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
												{enGB.general.quests[quest.id]}
											</span>
										)}
									</div>
								))}
							</div>
						</div>
					)}
					{treasureCandlesData.length > 0 && (
						<div className="mb-5">
							<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								Treasure Candles
							</h2>
							{treasureCandlesData.length === 1 ? (
								<button
									type="button"
									onClick={() => handleImageClick(treasureCandlesData[0]!.url)}
									className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
								>
									View
								</button>
							) : (
								<div className="flex flex-wrap gap-1 text-sm">
									{treasureCandlesData.map((candle, index) => (
										<span key={candle.url}>
											<button
												type="button"
												onClick={() => handleImageClick(candle.url)}
												className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
											>
												{candle.text}
											</button>
											{index < treasureCandlesData.length - 1 && (
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
								Seasonal Candles
							</h2>
							<div className="space-y-2">
								{seasonalCandles.url && (
									<button
										type="button"
										onClick={() => handleImageClick(seasonalCandles.url)}
										className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
									>
										View
									</button>
								)}
								<div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
									<img src={SEASONAL_CANDLE_ICON} alt="Seasonal candle" className="h-4 w-4" />
									<span>
										{seasonalCandles.remaining} remain ({seasonalCandles.remainingWithPass} with a
										season pass)
									</span>
								</div>
							</div>
						</div>
					)}
					<div className="mb-5">
						<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
							Shard Eruption
						</h2>
						{shard ? (
							<div className="space-y-3">
								<div className="hidden sm:flex items-start justify-between">
									<div>
										<h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
											Data
										</h3>
										<button
											type="button"
											onClick={() => handleImageClick(shard.url)}
											className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors block mb-1"
										>
											{shard.realm} ({shard.skyMap})
										</button>
										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-700 dark:text-gray-300">
												{shard.reward}
											</span>
											{shard.strong ? (
												<img
													src="https://cdn.thatskyapplication.com/icons/ascended_candle.webp"
													alt="Ascended candle"
													className="h-4 w-4"
												/>
											) : (
												<img
													src="https://cdn.thatskyapplication.com/icons/piece_of_light.webp"
													alt="Piece of light"
													className="h-4 w-4"
												/>
											)}
										</div>
									</div>
									<div className="text-right">
										<h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
											Timestamps
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
														{start.format} - {end.format}
													</code>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="sm:hidden space-y-2">
									<button
										type="button"
										onClick={() => handleImageClick(shard.url)}
										className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors block"
									>
										{shard.realm} ({shard.skyMap})
									</button>
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-700 dark:text-gray-300">{shard.reward}</span>
										{shard.strong ? (
											<img
												src="https://cdn.thatskyapplication.com/icons/ascended_candle.webp"
												alt="Ascended candle"
												className="h-4 w-4"
											/>
										) : (
											<img
												src="https://cdn.thatskyapplication.com/icons/piece_of_light.webp"
												alt="Piece of light"
												className="h-4 w-4"
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
													{start.format} - {end.format}
												</code>
											</div>
										))}
									</div>
								</div>
							</div>
						) : (
							<p className="text-sm text-gray-500 dark:text-gray-400">None</p>
						)}
					</div>
					{travellingRock && (
						<div className="mb-5">
							<h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
								Travelling Rock
							</h2>
							<button
								type="button"
								onClick={() =>
									handleImageClick(
										`https://cdn.thatskyapplication.com/daily_guides/travelling_rocks/${travellingRock}.webp`,
									)
								}
								className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
							>
								View
							</button>
						</div>
					)}
					{daysCount.length > 0 && (
						<div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
							{daysCount.map((text) => (
								<p
									key={text}
									className="text-xs text-gray-500 dark:text-gray-400 m-0 mb-1 last:mb-0"
								>
									{text}
								</p>
							))}
						</div>
					)}
				</div>
				{selectedImage && (
					<div className="hidden lg:flex w-1/2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 max-h-[80vh] flex-col">
						<div className="flex items-center justify-between mb-4 flex-shrink-0">
							<h3 className="font-semibold text-gray-900 dark:text-white text-sm">Infographic</h3>
							<button
								type="button"
								onClick={() => setSelectedImage(null)}
								className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
								aria-label="Close infographic"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
						<div className="flex items-center justify-center flex-1 min-h-0 overflow-hidden">
							<img
								src={selectedImage}
								alt="Infographic"
								className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
								style={{ objectFit: "contain" }}
							/>
						</div>
					</div>
				)}
			</div>
			{selectedImage && (
				<div className="lg:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex flex-col">
					<div className="flex items-center justify-between p-4 bg-gray-800/50 flex-shrink-0">
						<h3 className="text-white font-medium">Infographic</h3>
						<button
							type="button"
							onClick={() => setSelectedImage(null)}
							className="p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
							aria-label="Close infographic"
						>
							<X className="w-6 h-6" />
						</button>
					</div>
					<div className="flex-1 flex items-center justify-center p-4 min-h-0 overflow-hidden">
						<img
							src={selectedImage}
							alt="Infographic"
							className="max-w-full max-h-full object-contain"
							style={{ objectFit: "contain" }}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
