import type { LoaderFunctionArgs } from "@remix-run/node";
import { data, useLoaderData } from "@remix-run/react";
import {
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
import { PanelRightClose, X } from "lucide-react";
import { useState } from "react";
import TopBar from "~/components/TopBar";
import pg from "~/pg.server";
import { SEASONAL_CANDLE_ICON } from "~/utility/constants";
import { getLocaleFromRequest } from "~/utility/functions";

interface DailyGuidesPacket {
	quest1: DailyGuideQuest | null;
	quest2: DailyGuideQuest | null;
	quest3: DailyGuideQuest | null;
	quest4: DailyGuideQuest | null;
	travelling_rock: string | null;
}

interface DailyGuideQuest {
	id: number;
	url: string | null;
}

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

	const quests = [quest1, quest2, quest3, quest4].filter(
		(quest): quest is DailyGuideQuest & { id: DailyQuests } =>
			quest !== null && isDailyQuest(quest.id),
	);

	const treasureCandleURLs = treasureCandles(today);

	const treasureCandlesData = treasureCandleURLs.map((treasureCandleURL, index) => ({
		text: `${index * 4 + 1} - ${index * 4 + 4}`,
		url: treasureCandleURL,
	}));

	let seasonalCandles = null;
	const daysCount = [];

	if (currentSeason) {
		const seasonalCandlesRotation = currentSeason.resolveSeasonalCandlesRotation(today);
		let seasonalCandlesRotationText = null;
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

			const url = currentSeason.seasonalCandlesRotationURL(realm, rotationIdentifier);

			seasonalCandlesRotationText = (
				<button
					type="button"
					onClick={() => setSelectedImage(url)}
					className="regular-link text-sm"
				>
					{`Rotation ${rotationIdentifier}`}
				</button>
			);
		}

		const { seasonalCandlesLeft, seasonalCandlesLeftWithSeasonPass } =
			currentSeason.remainingSeasonalCandles(today);

		seasonalCandles = (
			<>
				{seasonalCandlesRotationText}
				<p className="text-sm my-0 flex items-center">
					{seasonalCandlesLeft}{" "}
					<img src={SEASONAL_CANDLE_ICON} alt="Seasonal candle icon." className="h-4 w-4" /> remain
					in the season.
				</p>
				<p className="text-sm my-0 flex items-center">
					{seasonalCandlesLeftWithSeasonPass}{" "}
					<img src={SEASONAL_CANDLE_ICON} alt="Seasonal candle icon." className="h-4 w-4" /> remain
					with a Season Pass.
				</p>
			</>
		);
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

	return (
		<div className="min-h-screen flex items-center justify-center pt-20 lg:pt-0 pb-4 lg:pb-0 px-4">
			<TopBar />
			{/* biome-ignore lint/a11y/noStaticElementInteractions: This is fine. */}
			<div
				className={`bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow p-6 rounded-3xl w-full max-w-lg transition-all duration-300 ${
					selectedImage && "lg:translate-x-[-25vw] translate-x-0 sm:block"
				}`}
				onKeyDown={(event) => event.key === "Escape" && setSelectedImage(null)}
			>
				<h1 className="text-xl mb-2">{todayString}</h1>
				<hr />
				{quests.length > 0 && (
					<>
						<h2 className="text-lg my-1">Quests</h2>
						<ol className="pl-3">
							{quests.map((quest, index) => (
								<li key={quest.id} className="flex items-start mb-2">
									<span className="mr-2 text-sm font-semibold">{index + 1}.</span>
									{quest.url ? (
										<button
											type="button"
											onClick={() => setSelectedImage(quest.url)}
											className="regular-link text-sm text-left"
										>
											{enGB.general.quests[quest.id]}
										</button>
									) : (
										<span className="text-sm text-left">{enGB.general.quests[quest.id]}</span>
									)}
								</li>
							))}
						</ol>
					</>
				)}
				{treasureCandlesData.length > 0 && (
					<>
						<h2 className="text-lg my-1">Treasure Candles</h2>
						<div className="flex flex-wrap">
							{treasureCandlesData.map((treasureCandle, index) => (
								<span key={treasureCandle.url} className="flex">
									<button
										type="button"
										onClick={() => setSelectedImage(treasureCandle.url)}
										className="regular-link text-sm"
									>
										{treasureCandle.text}
									</button>
									{index < treasureCandlesData.length - 1 && (
										<span className="mx-1 text-sm">|</span>
									)}
								</span>
							))}
						</div>
					</>
				)}
				{seasonalCandles && (
					<>
						<h2 className="text-lg mt-1 mb-0">Seasonal Candles</h2>
						{seasonalCandles}
					</>
				)}
				<h2 className="text-lg my-1">Shard Eruption</h2>
				{shard ? (
					<div className="text-sm">
						<div className="flex w-full">
							<div className="flex flex-col items-start space-y-1">
								<button
									type="button"
									onClick={() => setSelectedImage(shard.url)}
									className="regular-link text-sm text-left"
								>
									{shard.realm} ({shard.skyMap})
								</button>
								<div className="inline-flex items-center">
									<span>{shard.reward}</span>
									{shard.strong ? (
										<img
											src="https://cdn.thatskyapplication.com/icons/ascended_candle.webp"
											alt="Ascended candle."
											className="h-4 w-4 ml-1"
										/>
									) : (
										<img
											src="https://cdn.thatskyapplication.com/icons/piece_of_light.webp"
											alt="Piece of light."
											className="h-4 w-4 ml-1"
										/>
									)}
								</div>
							</div>
							<div className="flex flex-col items-start space-y-1 pl-4">
								{shard.timestamps.map(({ start, end }) => (
									<span key={start.unix} className="whitespace-nowrap">
										<code
											className={`bg-inherit text-xs ${end.unix < now.toUnixInteger() ? "line-through text-black/50 dark:text-white/50" : ""}`}
										>{`${start.format} - ${end.format}`}</code>
									</span>
								))}
							</div>
						</div>
					</div>
				) : (
					<p className="text-sm my-0">None</p>
				)}
				{travellingRock && (
					<>
						<h2 className="text-lg mt-1 mb-0">Travelling Rock</h2>
						<button
							type="button"
							onClick={() =>
								setSelectedImage(
									`https://cdn.thatskyapplication.com/daily_guides/travelling_rocks/${travellingRock}.webp`,
								)
							}
							className="regular-link text-sm"
						>
							View
						</button>
					</>
				)}
				{daysCount.length > 0 && (
					<>
						<hr className="my-1" />
						{daysCount.map((text) => (
							<p key={text} className="text-xs my-0">
								{text}
							</p>
						))}
					</>
				)}
			</div>
			{selectedImage && (
				<div
					className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center ${
						selectedImage ? "lg:hidden" : ""
					}`}
				>
					<button
						type="button"
						onClick={() => setSelectedImage(null)}
						className="text-gray-200 dark:text-gray-200 border-2 border-gray-100 dark:border-gray-100 absolute bottom-4 right-4 rounded-full flex items-center justify-center transition"
					>
						<X className="w-7 h-7" />
					</button>
					<img
						src={selectedImage}
						alt="Infographic."
						className="items-center justify-center p-4 rounded-3xl shadow object-contain"
					/>
				</div>
			)}
			{selectedImage && (
				<div className="hidden lg:flex border-l border-gray-300 dark:border-gray-700 shadow-lg p-4 absolute top-0 right-0 h-full w-1/2 flex-col items-center justify-center">
					<button
						type="button"
						onClick={() => setSelectedImage(null)}
						className="absolute left-0 transform -translate-x-10 flex items-center justify-center transition"
					>
						<PanelRightClose className="w-8 h-8" />
					</button>
					<div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow rounded-3xl max-h-[56vw] max-w-full flex items-center justify-center">
						<img
							src={selectedImage}
							alt="Infographic."
							className="items-center justify-center p-4 object-contain h-full rounded-3xl shadow"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
