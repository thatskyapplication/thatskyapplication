import { clsx } from "clsx";
import { CalendarDays, Coins, Hourglass, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import {
	type CostEntry,
	type IndividualSpiritVisit,
	SpiritsHistoryOrderType,
	type SpiritsHistoryOrderTypes,
	SPIRITS_HISTORY_ORDER_LABEL_KEYS,
	SPIRITS_HISTORY_ORDER_TYPE_VALUES,
	SPIRITS_HISTORY_TITLE_KEYS,
	type Spirit,
} from "@thatskyapplication/utility";
import { CostList } from "~/components/catalogue/CostList.js";
import { FriendshipTreeToggle } from "~/components/catalogue/FriendshipTreeToggle.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import Pagination from "~/components/Pagination.js";
import { SkeletonText } from "~/components/SkeletonText.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { formatRelativeTime } from "~/utility/relative-time.js";
import {
	SPIRIT_HISTORY_LOCATION_STATE,
	SPIRIT_HISTORY_PAGE_SIZE,
	spiritHistoryOrderURL,
	spiritsHistoryPagination,
	spiritURL,
} from "~/utility/spirits.js";
import type { DateTimeLabels } from "~/utility/time.js";
import { VisitNumber } from "./VisitNumber.js";

const ORDER_LINK_CLASS =
	"flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-center text-xs font-medium wrap-anywhere transition-colors sm:flex-row sm:gap-2 sm:px-3 sm:text-sm" as const;

const SPIRITS_HISTORY_ORDER_ICONS = {
	[SpiritsHistoryOrderType.Natural]: CalendarDays,
	[SpiritsHistoryOrderType.Rarity]: Hourglass,
	[SpiritsHistoryOrderType.Cost]: Coins,
} as const satisfies Readonly<Record<SpiritsHistoryOrderTypes, LucideIcon>>;

function SpiritHistoryEntry({
	costs,
	dateTimeLabels,
	locale,
	now,
	number,
	searchParams,
	spirit,
	timeZone,
	timeZoneEstimated,
	visit,
}: {
	costs: readonly CostEntry[] | null;
	dateTimeLabels: DateTimeLabels;
	locale: string;
	now: number;
	number: number;
	searchParams: URLSearchParams;
	spirit: Spirit;
	timeZone: string;
	timeZoneEstimated: boolean;
	visit: IndividualSpiritVisit;
}) {
	const { t } = useTranslation();
	const timestamp = visit.start.toInstant().epochMilliseconds;
	const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
	const seasonEmoji = seasonal ? SeasonIdToSeasonalEmoji[spirit.seasonId] : null;

	return (
		<Link
			className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3 shadow-sm transition-colors hover:bg-gray-100/50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-900/50"
			state={SPIRIT_HISTORY_LOCATION_STATE}
			to={spiritURL(searchParams, spirit.id)}
		>
			{seasonEmoji ? (
				<EmojiIcon className="h-7 w-7" emoji={seasonEmoji} />
			) : (
				<span aria-hidden="true" className="h-7 w-7" />
			)}
			<div className="min-w-0">
				<div className="flex min-w-0 items-center gap-2">
					<VisitNumber visit={number} />
					<h3 className="min-w-0 text-sm font-semibold wrap-break-word text-gray-900 dark:text-gray-100">
						{t(`spirits.${spirit.id}`, { ns: "general" })}
					</h3>
				</div>
				<div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-gray-600 md:flex-col md:items-start dark:text-gray-400">
					{costs === null ? (
						<>
							<time dateTime={visit.start.toInstant().toString()}>
								{timeZoneEstimated ? (
									<SkeletonText>{dateTimeLabels[timestamp]}</SkeletonText>
								) : (
									dateTimeLabels[timestamp]
								)}
							</time>
							<span aria-hidden="true" className="md:hidden">
								·
							</span>
							<span>{formatRelativeTime(timestamp, now, locale, timeZone)}</span>
						</>
					) : (
						<CostList costs={costs} locale={locale} />
					)}
				</div>
			</div>
		</Link>
	);
}

export function SpiritHistory({
	dateTimeLabels,
	locale,
	now,
	searchParams,
	timeZone,
	timeZoneEstimated,
}: {
	dateTimeLabels: DateTimeLabels;
	locale: string;
	now: number;
	searchParams: URLSearchParams;
	timeZone: string;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();
	const {
		entries,
		maximumPage,
		order,
		page: currentPage,
		seasonal,
	} = spiritsHistoryPagination(searchParams);
	const offset = (currentPage - 1) * SPIRIT_HISTORY_PAGE_SIZE;
	const pageEntries = entries.slice(offset, offset + SPIRIT_HISTORY_PAGE_SIZE);

	return (
		<section aria-labelledby="spirit-history-title" className="flex flex-col gap-5">
			<nav
				aria-label={t("spirits.order-label", { ns: "features" })}
				className="flex gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900"
			>
				{SPIRITS_HISTORY_ORDER_TYPE_VALUES.map((orderType) => {
					const Icon = SPIRITS_HISTORY_ORDER_ICONS[orderType];

					return (
						<Link
							aria-current={order === orderType ? "true" : undefined}
							className={clsx(
								ORDER_LINK_CLASS,
								order === orderType
									? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
									: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
							)}
							key={orderType}
							to={spiritHistoryOrderURL(searchParams, orderType)}
						>
							<Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
							{t(SPIRITS_HISTORY_ORDER_LABEL_KEYS[orderType], { ns: "features" })}
						</Link>
					);
				})}
			</nav>

			<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100" id="spirit-history-title">
				{t(SPIRITS_HISTORY_TITLE_KEYS[order], { ns: "features" })}
			</h2>

			{order === SpiritsHistoryOrderType.Cost && (
				<FriendshipTreeToggle
					search={spiritHistoryOrderURL(searchParams, SpiritsHistoryOrderType.Cost)}
					seasonal={seasonal}
				/>
			)}

			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{pageEntries.map(({ costs, number, spirit, visit }) => (
					<SpiritHistoryEntry
						costs={costs}
						dateTimeLabels={dateTimeLabels}
						key={`${visit.spiritId}-${visit.start.epochMilliseconds}`}
						locale={locale}
						now={now}
						number={number}
						searchParams={searchParams}
						spirit={spirit}
						timeZone={timeZone}
						timeZoneEstimated={timeZoneEstimated}
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
