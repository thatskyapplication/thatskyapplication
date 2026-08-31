import { clsx } from "clsx";
import { type Ref, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, redirect, useLocation } from "react-router";
import {
	epochSeconds,
	formatEmojiURL,
	type ShardEruptionData,
	shardEruption,
	SHARD_ERUPTION_START_DATE,
	skyNow,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { DatePicker } from "~/components/DatePicker";
import { InfographicPreview, type SelectedInfographic } from "~/components/InfographicPreview";
import { SitePage } from "~/components/PageLayout";
import Pagination from "~/components/Pagination.js";
import { ShardEruptionTimestamp } from "~/components/ShardEruptionTimestamp.js";
import { SkeletonText } from "~/components/SkeletonText.js";
import { useCurrentTimestamp, useSkyDailyResetRevalidator } from "~/hooks/use-current-timestamp.js";
import { getInstance, getLocale } from "~/middleware/i18next.js";
import {
	PIECE_OF_LIGHT_PATH,
	SHARD_ERUPTION_DESCRIPTION,
	SHARD_ERUPTION_MAXIMUM_PAGE,
} from "~/utility/constants";
import { MISCELLANEOUS_EMOJIS } from "~/utility/emojis.js";
import { firstDayOfWeek } from "~/utility/locale.js";
import { getTimePreferences } from "~/utility/time.server";
import type { Route } from "./+types/shard-eruption.js";

type ShardEruptionCardProps = {
	selected: boolean;
	shard:
		| (Omit<ShardEruptionData, "timestamps"> & {
				timestamps: {
					start: { unix: number; format: string };
					end: { unix: number; format: string };
				}[];
		  })
		| null;
	timeZoneEstimated: boolean;
	todayFormat: string;
	currentUnix: number;
	onPreview: (imageURL: string, acknowledgement: string | null) => void;
	ref: Ref<HTMLDivElement>;
};

const DATE_NAVIGATION_CLASS =
	"inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-blue-300" as const;

export const meta = ({ loaderData, location }: Route.MetaArgs) => {
	const url = String(new URL(location.pathname, WEBSITE_URL));
	const { title } = loaderData;

	return [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ name: "robots", content: "index, follow" },
		{ title },
		{ name: "description", content: SHARD_ERUPTION_DESCRIPTION },
		{ name: "theme-color", content: "#49add8" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: SHARD_ERUPTION_DESCRIPTION },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "thatskyapplication" },
		{ property: "og:image", content: formatEmojiURL(MISCELLANEOUS_EMOJIS.ShardStrong.id) },
		{ property: "og:url", content: url },
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: SHARD_ERUPTION_DESCRIPTION },
		{ tagName: "link", rel: "canonical", href: url },
	];
};

export const loader = ({ request, context, url }: Route.LoaderArgs) => {
	const pageParameter = url.searchParams.get("page");
	const dateParameter = url.searchParams.get("date");
	const todayParameter = url.searchParams.get("today");
	const now = skyNow();
	const today = now.startOfDay();
	const startDate = SHARD_ERUPTION_START_DATE.toPlainDate();
	const startDaysOffset = startDate.since(today.toPlainDate()).days;
	const minimumPage =
		startDaysOffset > 0 ? Math.floor((startDaysOffset - 1) / 30) : Math.floor(startDaysOffset / 30);
	const jumpingToPage = Boolean(pageParameter);
	let dateSelection: { date: string; page: number } | null = null;
	let selectedDate: string | null = null;
	let selectedPage: number | null = null;

	if (dateParameter !== null) {
		let targetDate: Temporal.PlainDate | null = null;

		if (/^\d{4}-\d{2}-\d{2}$/.test(dateParameter)) {
			try {
				targetDate = Temporal.PlainDate.from(dateParameter);
			} catch {
				targetDate = null;
			}
		}

		if (!targetDate) {
			url.searchParams.delete("date");
			throw redirect(`${url.pathname}${url.search}`);
		}

		const daysOffset = targetDate.since(today.toPlainDate()).days;
		const targetPage =
			daysOffset > 0 ? Math.floor((daysOffset - 1) / 30) : Math.floor(daysOffset / 30);

		if (
			Temporal.PlainDate.compare(targetDate, startDate) < 0 ||
			targetPage > SHARD_ERUPTION_MAXIMUM_PAGE
		) {
			throw new Response("Date is outside the supported shard-eruption range.", { status: 400 });
		}

		dateSelection = { date: targetDate.toString(), page: targetPage };
	}

	if (!jumpingToPage) {
		if (todayParameter === "1") {
			selectedDate = today.toPlainDate().toString();
		} else if (dateSelection !== null) {
			selectedDate = dateSelection.date;
			selectedPage = dateSelection.page;
		}
	}

	const shards = [];
	const { locale, timeZone, timeZoneEstimated, hour12 } = getTimePreferences(request, context);
	let page = selectedPage ?? (pageParameter ? Number(pageParameter) : 0);

	if (!Number.isInteger(page)) {
		page = 0;
	}

	page = Math.max(minimumPage, Math.min(SHARD_ERUPTION_MAXIMUM_PAGE, page));

	const amount = page === 0 ? 31 : 30;
	const pageStartIndex = page * amount + (page <= 0 ? 0 : 1);
	const startIndex = Math.max(pageStartIndex, startDaysOffset);
	const endIndex = pageStartIndex + amount;

	for (let index = startIndex; index < endIndex; index++) {
		const date = today.add({ days: index });
		const shard = shardEruption(date);

		const todayFormat = new Intl.DateTimeFormat(locale, {
			timeZone,
			dateStyle: "full",
		}).format(date.epochMilliseconds);

		shards.push({
			date: date.toPlainDate().toString(),
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
			todayFormat,
		});
	}

	const t = getInstance(context).getFixedT(getLocale(context));

	return {
		anchorDate: selectedDate ?? today.add({ days: startIndex }).toPlainDate().toString(),
		currentUnix: epochSeconds(now),
		locale,
		maximumDate: today
			.add({ days: SHARD_ERUPTION_MAXIMUM_PAGE * 30 + 30 })
			.toPlainDate()
			.toString(),
		minimumDate: startDate.toString(),
		minimumPage,
		page,
		selectedDate,
		shards,
		timeZoneEstimated,
		title: t("shard-eruption", { ns: "general" }),
		todayDate: today.toPlainDate().toString(),
		weekStartsOn: firstDayOfWeek(locale),
	};
};

function ShardEruptionCard({
	selected,
	shard,
	timeZoneEstimated,
	todayFormat,
	currentUnix,
	onPreview,
	ref,
}: ShardEruptionCardProps) {
	const { t } = useTranslation();
	const realmArea = shard
		? t("shard-eruption.realm-area", {
				ns: "features",
				realm: shard.realm,
				area: shard.area,
			})
		: null;

	return (
		<div
			aria-current={selected ? "date" : undefined}
			className={clsx(
				"flex w-full max-w-sm flex-col items-center rounded-lg border p-6 text-center shadow-sm",
				shard?.strong
					? "border-red-400 bg-red-300 hover:bg-red-300/70 dark:border-red-900 dark:bg-red-950/50 dark:hover:bg-red-950/40"
					: "border-gray-200 bg-gray-100 hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/50",
				selected &&
					"relative z-10 ring-2 ring-blue-500 ring-offset-2 [--shard-eruption-pulse:var(--color-blue-500)] focus:outline-hidden dark:ring-blue-300 dark:ring-offset-gray-950 dark:[--shard-eruption-pulse:var(--color-blue-300)]",
			)}
			ref={ref}
			tabIndex={selected ? -1 : undefined}
		>
			<div className="flex flex-row items-center justify-center">
				{shard && (
					<div
						aria-label={`${shard.strong ? "Strong" : "Regular"} shard eruption icon.`}
						className="discord-emoji mr-1 h-5 w-5"
						role="img"
						style={{
							backgroundImage: `url(${formatEmojiURL(shard.strong ? MISCELLANEOUS_EMOJIS.ShardStrong.id : MISCELLANEOUS_EMOJIS.ShardRegular.id)})`,
						}}
					/>
				)}
				<h2 className="my-0 text-lg">
					{timeZoneEstimated ? <SkeletonText>{todayFormat}</SkeletonText> : todayFormat}
				</h2>
			</div>
			{shard ? (
				<>
					<button
						className="regular-link inline-flex items-center text-sm"
						onClick={() => onPreview(shard.infographic.url, shard.infographic.acknowledgement)}
						type="button"
					>
						{realmArea}
					</button>
					<div className="inline-flex items-center">
						<span className="text-sm">{shard.reward}</span>
						{shard.strong ? (
							<div
								aria-label={t("ascended-candles", { ns: "general" })}
								className="discord-emoji ml-1 h-4 w-4"
								role="img"
								style={{
									backgroundImage: `url(${formatEmojiURL(MISCELLANEOUS_EMOJIS.AscendedCandle.id)})`,
								}}
							/>
						) : (
							<div
								aria-label="Piece of light."
								className="ml-1 h-4 w-4 bg-cover bg-center"
								role="img"
								style={{
									backgroundImage: `url(${PIECE_OF_LIGHT_PATH})`,
								}}
							/>
						)}
					</div>
					{shard.timestamps.map(({ start, end }) => (
						<ShardEruptionTimestamp
							currentUnix={currentUnix}
							end={end}
							key={start.unix}
							start={start}
							timeZoneEstimated={timeZoneEstimated}
							variant="shard-eruption"
						/>
					))}
				</>
			) : (
				<p className="pt-6">{t("none", { ns: "general" })}</p>
			)}
		</div>
	);
}

export default function ShardEruption({ loaderData }: Route.ComponentProps) {
	const {
		anchorDate,
		currentUnix: initialUnix,
		locale,
		maximumDate,
		minimumDate,
		minimumPage,
		page,
		selectedDate,
		shards,
		timeZoneEstimated,
		todayDate,
		weekStartsOn,
	} = loaderData;
	const { t } = useTranslation();
	const { key: locationKey } = useLocation();
	const [selectedInfographic, setSelectedInfographic] = useState<SelectedInfographic | null>(null);
	const selectedCardRef = useRef<HTMLDivElement>(null);
	const currentTimestamp = useCurrentTimestamp(initialUnix * 1000);
	useSkyDailyResetRevalidator(currentTimestamp);
	const currentUnix = Math.floor(currentTimestamp / 1000);

	useEffect(() => {
		const card = selectedCardRef.current;

		if (card === null) {
			return;
		}

		const { bottom, top } = card.getBoundingClientRect();

		const obscuredHeight =
			Number.parseFloat(
				getComputedStyle(document.documentElement).getPropertyValue("--site-top-bar-height"),
			) || 0;

		if (top < obscuredHeight || bottom > window.innerHeight) {
			card.scrollIntoView({ block: "center" });
		}

		card.focus({ preventScroll: true });

		const animation = card.animate(
			[
				{ outline: "2px solid var(--shard-eruption-pulse)", outlineOffset: "6px" },
				{ outline: "2px solid transparent", outlineOffset: "6px" },
			],
			{ duration: 450, easing: "ease-out", iterations: 2 },
		);

		return () => animation.cancel();
	}, [locationKey]);

	const shardCards = shards.map((shard) => (
		<ShardEruptionCard
			currentUnix={currentUnix}
			key={shard.date}
			onPreview={(imageURL, acknowledgement) =>
				setSelectedInfographic({ acknowledgement, imageURL })
			}
			ref={shard.date === selectedDate ? selectedCardRef : null}
			selected={shard.date === selectedDate}
			shard={shard.shard}
			timeZoneEstimated={timeZoneEstimated}
			todayFormat={shard.todayFormat}
		/>
	));

	const [firstShard, ...restShards] = shardCards;

	return (
		<SitePage>
			<div className="flex flex-col items-center justify-center">
				<div className="mb-4 flex w-full justify-center gap-2">
					<Link className={DATE_NAVIGATION_CLASS} to="?today=1">
						{t("today", { ns: "general" })}
					</Link>
					<DatePicker
						anchorDate={anchorDate}
						className={DATE_NAVIGATION_CLASS}
						getDateURL={(date) => `?date=${date}`}
						label={t("jump-to-date", { ns: "general" })}
						locale={locale}
						maximumDate={maximumDate}
						minimumDate={minimumDate}
						todayDate={todayDate}
						weekStartsOn={weekStartsOn}
					/>
				</div>
				<div className="flex-wrap">
					{page === 0 ? (
						<>
							<div className="mb-2 flex w-full justify-center">{firstShard}</div>
							<div className="flex w-full max-w-full flex-wrap justify-center gap-2">
								{restShards}
							</div>
						</>
					) : (
						<div className="flex w-full max-w-full flex-wrap justify-center gap-2">
							{shardCards}
						</div>
					)}
					<Pagination
						currentPage={page}
						excludeSearchParameters={["date", "today"]}
						maximumPage={SHARD_ERUPTION_MAXIMUM_PAGE}
						minimumPage={minimumPage}
					/>
				</div>
			</div>
			{selectedInfographic && (
				<InfographicPreview
					acknowledgement={selectedInfographic.acknowledgement}
					imageURL={selectedInfographic.imageURL}
					onClose={() => setSelectedInfographic(null)}
					title={t("infographic", { ns: "general" })}
				/>
			)}
		</SitePage>
	);
}
