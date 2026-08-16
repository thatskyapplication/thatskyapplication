import { clsx } from "clsx";
import { ArrowRight, CalendarDays, Hourglass } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	spirits,
	TRAVELLING_DATES,
	VISITS_ABSENT,
} from "@thatskyapplication/utility";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import Pagination from "~/components/Pagination.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { formatRelativeTime } from "~/utility/relative-time.js";
import { VisitNumber } from "./VisitNumber.js";

const SPIRITS_HISTORY_PAGE_SIZE = 10 as const;

const ORDER_LINK_CLASS =
	"flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-center text-sm font-medium transition-colors" as const;

type SpiritVisit = (typeof VISITS_ABSENT)[number];

function spiritURL(searchParams: URLSearchParams, spiritId: number) {
	const parameters = new URLSearchParams(searchParams);
	parameters.set("spirit", spiritId.toString());
	return `?${parameters.toString()}`;
}

function SpiritHistoryEntry({
	hour12,
	locale,
	now,
	order,
	searchParams,
	timeZone,
	visit,
}: {
	hour12: boolean | undefined;
	locale: string;
	now: number;
	order: SpiritsHistoryOrderTypes;
	searchParams: URLSearchParams;
	timeZone: string;
	visit: SpiritVisit;
}) {
	const { t } = useTranslation();
	const spirit = spirits().get(visit.spiritId)!;
	const timestamp = visit.start.toInstant().epochMilliseconds;
	const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
	const seasonEmoji = seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null;

	return (
		<Link
			className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 p-4 shadow-sm transition-colors hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/50"
			to={spiritURL(searchParams, spirit.id)}
		>
			{seasonEmoji ? (
				<EmojiIcon className="h-7 w-7 sm:h-8 sm:w-8" emoji={seasonEmoji} />
			) : (
				<span aria-hidden="true" className="h-7 w-7 sm:h-8 sm:w-8" />
			)}
			<div className="min-w-0">
				<div className="flex min-w-0 items-baseline gap-2">
					{order === SpiritsHistoryOrderType.Natural ? <VisitNumber visit={visit.visit} /> : null}
					<h3 className="my-0 truncate text-base font-semibold text-gray-900 dark:text-gray-100">
						{t(`spirits.${spirit.id}`, { ns: "general" })}
					</h3>
				</div>
				<div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-600 dark:text-gray-400">
					<time dateTime={visit.start.toInstant().toString()}>
						{new Intl.DateTimeFormat(locale, {
							dateStyle: "medium",
							timeStyle: "short",
							timeZone,
							hour12,
						}).format(timestamp)}
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
}: {
	hour12: boolean | undefined;
	locale: string;
	now: number;
	searchParams: URLSearchParams;
	timeZone: string;
}) {
	const { t } = useTranslation();
	const order =
		searchParams.get("order") === "rarity"
			? SpiritsHistoryOrderType.Rarity
			: SpiritsHistoryOrderType.Natural;
	const history =
		order === SpiritsHistoryOrderType.Natural ? [...TRAVELLING_DATES.values()] : VISITS_ABSENT;
	const maximumPage = Math.max(1, Math.ceil(history.length / SPIRITS_HISTORY_PAGE_SIZE));
	const requestedPage = Number(searchParams.get("page") ?? 1);
	const currentPage =
		Number.isSafeInteger(requestedPage) && requestedPage > 0
			? Math.min(requestedPage, maximumPage)
			: 1;
	const offset = (currentPage - 1) * SPIRITS_HISTORY_PAGE_SIZE;
	const visits = history.slice(offset, offset + SPIRITS_HISTORY_PAGE_SIZE);

	return (
		<section aria-labelledby="spirit-history-title" className="flex flex-col gap-5">
			<nav
				aria-label={t("spirit-plural", { ns: "general" })}
				className="flex gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900"
			>
				<Link
					aria-current={order === SpiritsHistoryOrderType.Natural ? "page" : undefined}
					className={clsx(
						ORDER_LINK_CLASS,
						order === SpiritsHistoryOrderType.Natural
							? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
							: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
					)}
					to="/spirits"
				>
					<CalendarDays className="h-4 w-4 shrink-0" />
					{t("spirits.order-natural", { ns: "features" })}
				</Link>
				<Link
					aria-current={order === SpiritsHistoryOrderType.Rarity ? "page" : undefined}
					className={clsx(
						ORDER_LINK_CLASS,
						order === SpiritsHistoryOrderType.Rarity
							? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
							: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
					)}
					to="?order=rarity"
				>
					<Hourglass className="h-4 w-4 shrink-0" />
					{t("spirits.order-rarity", { ns: "features" })}
				</Link>
			</nav>

			<h2
				className="my-0 text-2xl font-bold text-gray-900 dark:text-gray-100"
				id="spirit-history-title"
			>
				{t(`spirits.title.${order}`, { ns: "features" })}
			</h2>

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{visits.map((visit) => (
					<SpiritHistoryEntry
						hour12={hour12}
						key={`${visit.spiritId}-${visit.start.epochMilliseconds}`}
						locale={locale}
						now={now}
						order={order}
						searchParams={searchParams}
						timeZone={timeZone}
						visit={visit}
					/>
				))}
			</div>

			{maximumPage > 1 ? (
				<Pagination currentPage={currentPage} maximumPage={maximumPage} preventScrollReset />
			) : null}
		</section>
	);
}
