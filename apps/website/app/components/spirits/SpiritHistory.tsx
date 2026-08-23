import { clsx } from "clsx";
import { ArrowRight, CalendarDays, Hourglass } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	type IndividualSpiritVisit,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	SPIRITS_HISTORY_TITLE_KEYS,
	type Spirit,
	spirits,
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import Pagination from "~/components/Pagination.js";
import { SkeletonText } from "~/components/SkeletonText.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { formatRelativeTime } from "~/utility/relative-time.js";
import { SPIRIT_HISTORY_LOCATION_STATE, spiritURL } from "~/utility/spirits.js";
import { VisitNumber } from "./VisitNumber.js";

const SPIRITS_HISTORY_PAGE_SIZE = 10 as const;

const ORDER_LINK_CLASS =
	"flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors" as const;

function orderURL(searchParams: URLSearchParams, order: SpiritsHistoryOrderTypes) {
	const parameters = new URLSearchParams(searchParams);
	parameters.delete("page");
	parameters.delete("spirit");

	if (order === SpiritsHistoryOrderType.Rarity) {
		parameters.set("order", "rarity");
	} else {
		parameters.delete("order");
	}

	const query = parameters.toString();
	return query.length > 0 ? `?${query}` : "/spirits";
}

function SpiritHistoryEntry({
	dateFormatter,
	locale,
	now,
	searchParams,
	spirit,
	timeZone,
	timeZoneEstimated,
	visit,
	visitNumber,
}: {
	dateFormatter: Intl.DateTimeFormat;
	locale: string;
	now: number;
	searchParams: URLSearchParams;
	spirit: Spirit;
	timeZone: string;
	timeZoneEstimated: boolean;
	visit: IndividualSpiritVisit;
	visitNumber: number | null;
}) {
	const { t } = useTranslation();
	const timestamp = visit.start.toInstant().epochMilliseconds;
	const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
	const seasonEmoji = seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null;

	return (
		<Link
			className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm transition-colors hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/50"
			state={SPIRIT_HISTORY_LOCATION_STATE}
			to={spiritURL(searchParams, spirit.id)}
		>
			{seasonEmoji ? (
				<EmojiIcon className="h-7 w-7 sm:h-8 sm:w-8" emoji={seasonEmoji} />
			) : (
				<span aria-hidden="true" className="h-7 w-7 sm:h-8 sm:w-8" />
			)}
			<div className="min-w-0">
				<div className="flex min-w-0 items-baseline gap-2">
					{visitNumber === null ? null : <VisitNumber visit={visitNumber} />}
					<h3 className="my-0 truncate text-base font-semibold text-gray-900 dark:text-gray-100">
						{t(`spirits.${spirit.id}`, { ns: "general" })}
					</h3>
				</div>
				<div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-600 dark:text-gray-400">
					<time dateTime={visit.start.toInstant().toString()}>
						{timeZoneEstimated ? (
							<SkeletonText>{dateFormatter.format(timestamp)}</SkeletonText>
						) : (
							dateFormatter.format(timestamp)
						)}
					</time>
					<span aria-hidden="true">·</span>
					<span>{formatRelativeTime(timestamp, now, locale, timeZone)}</span>
				</div>
			</div>
			<ArrowRight className="h-4 w-4 text-gray-500 transition-transform group-hover:translate-x-0.5 dark:text-gray-400" />
		</Link>
	);
}

export function SpiritHistory({
	hour12,
	locale,
	now,
	searchParams,
	timeZone,
	timeZoneEstimated,
}: {
	hour12: boolean | undefined;
	locale: string;
	now: number;
	searchParams: URLSearchParams;
	timeZone: string;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();
	const order =
		searchParams.get("order") === "rarity"
			? SpiritsHistoryOrderType.Rarity
			: SpiritsHistoryOrderType.Natural;
	const sourceHistory =
		order === SpiritsHistoryOrderType.Natural ? TRAVELLING_DATES : VISITS_ABSENT;
	const availableSpirits = spirits();
	const history: {
		spirit: Spirit;
		visit: IndividualSpiritVisit;
		visitNumber: number | null;
	}[] = [];

	for (const [key, visit] of sourceHistory) {
		const spirit = availableSpirits.get(visit.spiritId);

		if (spirit) {
			history.push({
				spirit,
				visit,
				visitNumber: order === SpiritsHistoryOrderType.Natural ? key : null,
			});
		}
	}

	const maximumPage = Math.max(1, Math.ceil(history.length / SPIRITS_HISTORY_PAGE_SIZE));
	const requestedPage = Number(searchParams.get("page") ?? 1);
	const currentPage =
		Number.isSafeInteger(requestedPage) && requestedPage > 0
			? Math.min(requestedPage, maximumPage)
			: 1;
	const offset = (currentPage - 1) * SPIRITS_HISTORY_PAGE_SIZE;
	const visits = history.slice(offset, offset + SPIRITS_HISTORY_PAGE_SIZE);
	const dateFormatter = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
		hour12,
	});

	return (
		<section aria-labelledby="spirit-history-title" className="flex flex-col gap-5">
			<nav
				aria-label={t("spirits.order-label", { ns: "features" })}
				className="flex gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900"
			>
				<Link
					aria-current={order === SpiritsHistoryOrderType.Natural ? "true" : undefined}
					className={clsx(
						ORDER_LINK_CLASS,
						order === SpiritsHistoryOrderType.Natural
							? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
							: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
					)}
					to={orderURL(searchParams, SpiritsHistoryOrderType.Natural)}
				>
					<CalendarDays aria-hidden="true" className="h-4 w-4 shrink-0" />
					{t("spirits.order-natural", { ns: "features" })}
				</Link>
				<Link
					aria-current={order === SpiritsHistoryOrderType.Rarity ? "true" : undefined}
					className={clsx(
						ORDER_LINK_CLASS,
						order === SpiritsHistoryOrderType.Rarity
							? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
							: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
					)}
					to={orderURL(searchParams, SpiritsHistoryOrderType.Rarity)}
				>
					<Hourglass aria-hidden="true" className="h-4 w-4 shrink-0" />
					{t("spirits.order-rarity", { ns: "features" })}
				</Link>
			</nav>

			<h2
				className="my-0 text-2xl font-bold text-gray-900 dark:text-gray-100"
				id="spirit-history-title"
			>
				{t(SPIRITS_HISTORY_TITLE_KEYS[order], { ns: "features" })}
			</h2>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{visits.map(({ spirit, visit, visitNumber }) => (
					<SpiritHistoryEntry
						dateFormatter={dateFormatter}
						key={`${visit.spiritId}-${visit.start.epochMilliseconds}`}
						locale={locale}
						now={now}
						searchParams={searchParams}
						spirit={spirit}
						timeZone={timeZone}
						timeZoneEstimated={timeZoneEstimated}
						visit={visit}
						visitNumber={visitNumber}
					/>
				))}
			</div>

			{maximumPage > 1 ? (
				<Pagination currentPage={currentPage} maximumPage={maximumPage} preventScrollReset />
			) : null}
		</section>
	);
}
