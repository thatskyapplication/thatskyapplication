import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
	SeasonId,
	spiritOriginTranslationKey,
	type Spirit,
	TIME_ZONE,
	TRAVELLING_DATES,
} from "@thatskyapplication/utility";
import { BackButton } from "~/components/catalogue/BackButton.js";
import { FriendshipTree } from "~/components/catalogue/FriendshipTree.js";
import { FriendshipTreeCarousel } from "~/components/catalogue/FriendshipTreeCarousel.js";
import { EmojiIcon } from "~/components/EmojiIcon.js";
import { NOTE_CLASS, TREE_COLUMN_CLASS } from "~/utility/catalogue.js";
import { SeasonIdToSeasonalEmoji } from "~/utility/emojis.js";
import { formatRelativeTime } from "~/utility/relative-time.js";
import { VisitNumber } from "./VisitNumber.js";

const EMPTY_CATALOGUE_DATA: ReadonlySet<number> = new Set();

interface BaseVisitEntry {
	id: string;
	start: Temporal.ZonedDateTime;
}

type VisitEntry =
	| (BaseVisitEntry & { type: "error"; label: string })
	| (BaseVisitEntry & { type: "visit"; visit: number });

function VisitHistory({
	entries,
	headingId,
	hour12,
	locale,
	now,
	timeZone,
	title,
}: {
	entries: readonly VisitEntry[];
	headingId: string;
	hour12: boolean | undefined;
	locale: string;
	now: number;
	timeZone: string;
	title: string;
}) {
	if (entries.length === 0) {
		return null;
	}

	const dateFormat = new Intl.DateTimeFormat(locale, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone,
		hour12,
	});

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
									{dateFormat.format(timestamp)}
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

export function SpiritView({
	historyURL,
	hour12,
	locale,
	now,
	spirit,
	timeZone,
}: {
	historyURL: string;
	hour12: boolean | undefined;
	locale: string;
	now: number;
	spirit: Spirit;
	timeZone: string;
}) {
	const { t } = useTranslation();
	const seasonal = spirit.isSeasonalSpirit() || spirit.isGuideSpirit();
	const seasonId = seasonal ? spirit.seasonId : undefined;
	const seasonEmoji = seasonId === undefined ? null : SeasonIdToSeasonalEmoji[seasonId];
	const spiritName = t(`spirits.${spirit.id}`, { ns: "general" });
	const origin = t(spiritOriginTranslationKey(spirit), { ns: "general" });
	const friendshipTrees: {
		key: "current" | "seasonal";
		tree: Spirit["displayFriendshipTree"];
	}[] = [];

	if (spirit.isSeasonalSpirit()) {
		if (spirit.seasonal.length > 0) {
			friendshipTrees.push({
				key: "seasonal",
				tree: spirit.seasonal,
			});
		}

		if (spirit.current.length > 0) {
			friendshipTrees.push({
				key: "current",
				tree: spirit.current,
			});
		}
	} else if (spirit.displayFriendshipTree.length > 0) {
		friendshipTrees.push({
			key: "current",
			tree: spirit.displayFriendshipTree,
		});
	}

	const travellingVisits: VisitEntry[] = [];
	const returningVisits: VisitEntry[] = [];
	let notYetReturnedKey:
		| "spirits.not-yet-returned-entity"
		| "spirits.not-yet-returned-shop"
		| "spirits.not-yet-returned-spirit"
		| null = null;

	if (spirit.isSeasonalSpirit()) {
		const travelling = TRAVELLING_DATES.filter(({ spiritId }) => spiritId === spirit.id);

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

		for (const [visit, { start }] of spirit.visits.returning) {
			returningVisits.push({
				id: `returning-${visit}`,
				start,
				type: "visit",
				visit,
			});
		}

		const skyNow = Temporal.Instant.fromEpochMilliseconds(now).toZonedDateTimeISO(TIME_ZONE);

		if (!spirit.visit(skyNow).visited) {
			notYetReturnedKey =
				spirit.seasonId === SeasonId.Shattering || spirit.seasonId === SeasonId.Nesting
					? "spirits.not-yet-returned-entity"
					: spirit.seasonId === SeasonId.Revival
						? "spirits.not-yet-returned-shop"
						: "spirits.not-yet-returned-spirit";
		}
	}

	return (
		<section className="flex flex-col gap-5" aria-labelledby="selected-spirit-title">
			<BackButton to={historyURL} />

			<div>
				<div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
					{seasonEmoji ? <EmojiIcon emoji={seasonEmoji} /> : null}
					<span>{origin}</span>
				</div>
				<h2
					className="my-0 text-2xl font-bold text-gray-900 dark:text-gray-100"
					id="selected-spirit-title"
				>
					<a
						className="regular-link inline-flex items-center gap-2"
						href={t(`spirit-wiki.${spirit.id}`, { ns: "general" })}
						rel="noopener noreferrer"
						target="_blank"
					>
						{spiritName}
						<ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
					</a>
				</h2>
			</div>

			{notYetReturnedKey ? (
				<p className="m-0 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
					{t(notYetReturnedKey, { ns: "features" })}
				</p>
			) : null}

			{travellingVisits.length > 0 || returningVisits.length > 0 ? (
				<div className="flex flex-col gap-4">
					<VisitHistory
						entries={travellingVisits}
						headingId="travelling-visits-title"
						hour12={hour12}
						locale={locale}
						now={now}
						timeZone={timeZone}
						title={t("spirits.travelling", { ns: "features" })}
					/>
					<VisitHistory
						entries={returningVisits}
						headingId="returning-visits-title"
						hour12={hour12}
						locale={locale}
						now={now}
						timeZone={timeZone}
						title={t("spirits.returning", { ns: "features" })}
					/>
				</div>
			) : null}

			{spirit.isGuideSpirit() && spirit.inProgress ? (
				<p className={NOTE_CLASS}>{t("catalogue.spirit-not-fully-revealed", { ns: "features" })}</p>
			) : null}

			{friendshipTrees.length > 1 ? (
				<FriendshipTreeCarousel>
					{friendshipTrees.map(({ key, tree }) => (
						<div className={TREE_COLUMN_CLASS} key={key}>
							<FriendshipTree
								data={EMPTY_CATALOGUE_DATA}
								locale={locale}
								readOnly
								seasonId={seasonId}
								tree={tree}
							/>
						</div>
					))}
				</FriendshipTreeCarousel>
			) : friendshipTrees.length === 1 ? (
				<div className="flex justify-center">
					<FriendshipTree
						data={EMPTY_CATALOGUE_DATA}
						locale={locale}
						readOnly
						seasonId={seasonId}
						tree={friendshipTrees[0]!.tree}
					/>
				</div>
			) : (
				<p className="m-0 text-base text-gray-600 dark:text-gray-400">
					{t("catalogue.spirit-no-friendship-tree", { ns: "features" })}
				</p>
			)}
		</section>
	);
}
