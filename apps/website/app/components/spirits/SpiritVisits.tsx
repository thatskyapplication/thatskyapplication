import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	spiritNotReturnedTranslationKey,
	type Spirit,
	TIME_ZONE,
	visitsForSpirit,
} from "@thatskyapplication/utility";
import { SkeletonText } from "~/components/SkeletonText.js";
import { formatRelativeTime } from "~/utility/relative-time.js";
import type { DateTimeLabels } from "~/utility/time.js";
import { VisitNumber } from "./VisitNumber.js";

interface BaseVisitEntry {
	id: string;
	start: Temporal.ZonedDateTime;
}

type VisitEntry =
	| (BaseVisitEntry & { type: "error"; label: string })
	| (BaseVisitEntry & { type: "visit"; visit: number });

function VisitHistory({
	dateTimeLabels,
	entries,
	headingId,
	locale,
	now,
	timeZone,
	timeZoneEstimated,
	title,
}: {
	dateTimeLabels: DateTimeLabels;
	entries: readonly VisitEntry[];
	headingId: string;
	locale: string;
	now: number;
	timeZone: string;
	timeZoneEstimated: boolean;
	title: string;
}) {
	if (entries.length === 0) {
		return null;
	}

	return (
		<section
			aria-labelledby={headingId}
			className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-5"
		>
			<h3
				className="m-0 shrink-0 text-sm font-semibold text-gray-600 sm:w-28 sm:pt-2.5 dark:text-gray-400"
				id={headingId}
			>
				{title}
			</h3>
			<ul className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-2.5 p-0">
				{entries.map((entry) => {
					const { id, start } = entry;
					const timestamp = start.epochMilliseconds;

					return (
						<li
							className="flex max-w-full min-w-0 basis-full items-center gap-2 rounded-lg bg-gray-100/70 px-2.5 py-2 ring-1 ring-gray-200/80 ring-inset sm:basis-auto dark:bg-gray-900/60 dark:ring-gray-700/80"
							key={id}
						>
							{entry.type === "error" ? (
								<span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-300">
									{entry.label}
								</span>
							) : (
								<VisitNumber visit={entry.visit} />
							)}
							<div className="min-w-0">
								<time
									className="block text-sm leading-tight text-gray-900 dark:text-gray-100"
									dateTime={start.toInstant().toString()}
								>
									{timeZoneEstimated ? (
										<SkeletonText>{dateTimeLabels[timestamp]}</SkeletonText>
									) : (
										dateTimeLabels[timestamp]
									)}
								</time>
								<span className="mt-0.5 block text-xs leading-tight text-gray-600 dark:text-gray-400">
									{formatRelativeTime(timestamp, now, locale, timeZone)}
								</span>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export function SpiritVisits({
	dateTimeLabels,
	locale,
	now,
	spirit,
	timeZone,
	timeZoneEstimated,
}: {
	dateTimeLabels: DateTimeLabels;
	locale: string;
	now: number;
	spirit: Spirit;
	timeZone: string;
	timeZoneEstimated: boolean;
}) {
	const { t } = useTranslation();

	if (!spirit.isSeasonalSpirit()) {
		return null;
	}

	const travellingVisits: VisitEntry[] = [];
	const returningVisits: VisitEntry[] = [];
	const { returning, travelling } = visitsForSpirit(spirit.id);

	for (const [visit, { start }] of travelling) {
		travellingVisits.push({
			id: `travelling-${visit}`,
			start,
			type: "visit",
			visit,
		});
	}

	for (const [error, start] of spirit.visits.travellingErrors) {
		travellingVisits.push({
			id: `travelling-error-${error}`,
			label: t("spirits.visit-error", { ns: "features" }),
			start,
			type: "error",
		});
	}

	for (const [visit, { start }] of returning) {
		returningVisits.push({
			id: `returning-${visit}`,
			start,
			type: "visit",
			visit,
		});
	}

	const skyNow = Temporal.Instant.fromEpochMilliseconds(now).toZonedDateTimeISO(TIME_ZONE);
	const notYetReturnedKey = spiritNotReturnedTranslationKey(spirit, skyNow);

	return (
		<>
			{notYetReturnedKey ? (
				<div className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/40">
					<AlertTriangle
						aria-hidden="true"
						className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
					/>
					<p className="m-0 text-sm text-amber-800 dark:text-amber-200">
						{t(notYetReturnedKey, { ns: "features" })}
					</p>
				</div>
			) : null}

			{travellingVisits.length > 0 || returningVisits.length > 0 ? (
				<div className="flex flex-col gap-4">
					<VisitHistory
						dateTimeLabels={dateTimeLabels}
						entries={travellingVisits}
						headingId="travelling-visits-title"
						locale={locale}
						now={now}
						timeZone={timeZone}
						timeZoneEstimated={timeZoneEstimated}
						title={t("spirits.travelling", { ns: "features" })}
					/>
					<VisitHistory
						dateTimeLabels={dateTimeLabels}
						entries={returningVisits}
						headingId="returning-visits-title"
						locale={locale}
						now={now}
						timeZone={timeZone}
						timeZoneEstimated={timeZoneEstimated}
						title={t("spirits.returning", { ns: "features" })}
					/>
				</div>
			) : null}
		</>
	);
}
