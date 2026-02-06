import {
	auroraSchedule,
	aviarysFireworkFestivalSchedule,
	dreamsSkaterSchedule,
	grandmaSchedule,
	internationalSpaceStationSchedule,
	meteorShowerSchedule,
	nextDailyReset,
	nextEyeOfEden,
	nextNestingWorkshop,
	nextPassage,
	nineColouredDeerSchedule,
	pollutedGeyserSchedule,
	projectorOfMemoriesSchedule,
	ScheduleType,
	type ScheduleTypes,
	type SpiritIds,
	shardEruptionSchedule,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyUpcomingSeason,
	TIME_ZONE,
	travellingSpiritSchedule,
	turtleSchedule,
	vaultEldersBlessingSchedule,
	WEBSITE_URL,
} from "@thatskyapplication/utility";
import { ExternalLinkIcon } from "lucide-react";
import type { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { getLocale } from "~/middleware/i18next.js";
import {
	APPLICATION_ICON_URL,
	APPLICATION_NAME,
	SCHEDULE_DESCRIPTION,
	SCHEDULE_TITLE,
} from "~/utility/constants.js";

export const meta: MetaFunction = () => [
	{ charSet: "utf-8" },
	{ name: "viewport", content: "width=device-width, initial-scale=1" },
	{ name: "robots", content: "index, follow" },
	{
		name: "keywords",
		content: `Sky, Children of the Light, ${APPLICATION_NAME}, Discord Bot, Discord Application, Sky schedule, Sky timers, Sky events`,
	},
	{ title: SCHEDULE_TITLE },
	{ name: "description", content: SCHEDULE_DESCRIPTION },
	{ name: "theme-color", content: "#A5B5F1" },
	{ property: "og:title", content: SCHEDULE_TITLE },
	{ property: "og:description", content: SCHEDULE_DESCRIPTION },
	{ property: "og:type", content: "website" },
	{ property: "og:site_name", content: "thatskyapplication" },
	{ property: "og:image", content: APPLICATION_ICON_URL },
	{ property: "og:url", content: WEBSITE_URL },
	{ name: "twitter:card", content: "summary" },
	{ name: "twitter:title", content: SCHEDULE_TITLE },
	{ name: "twitter:description", content: SCHEDULE_DESCRIPTION },
	{ rel: "canonical", href: WEBSITE_URL },
];

function formatRelativeTime(date: DateTime, now: DateTime, locale: string) {
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
	const diffMinutes = Math.round(date.diff(now, "minutes").minutes);
	const diffHours = Math.round(date.diff(now, "hours").hours);
	const diffDays = Math.round(date.diff(now, "days").days);

	if (Math.abs(diffMinutes) < 60) {
		return rtf.format(diffMinutes, "minute");
	}

	if (Math.abs(diffHours) < 24) {
		return rtf.format(diffHours, "hour");
	}

	return rtf.format(diffDays, "day");
}

interface BaseSchedule<Type extends ScheduleTypes> {
	type: Type;
	now?: boolean | SpiritIds;
	next: string;
	nextUnix: number;
	relative: string;
	end?: string;
	endUnix?: number | null;
	endRelative?: string | null;
}

interface ScheduleWithEnd<
	Type extends Exclude<
		ScheduleTypes,
		| typeof ScheduleType.DailyReset
		| typeof ScheduleType.EyeOfEden
		| typeof ScheduleType.Passage
		| typeof ScheduleType.NestingWorkshop
	>,
> extends BaseSchedule<Type> {
	now: Required<BaseSchedule<Type>>["now"];
	end: string;
	endUnix: number | null;
	endRelative: string | null;
}

interface ScheduleTravellingSpirit extends ScheduleWithEnd<typeof ScheduleType.TravellingSpirit> {
	now: SpiritIds | false;
	spiritId: SpiritIds | null;
}

function dailyResetNext(
	now: DateTime,
	timeZone: string,
	locale: string,
): BaseSchedule<typeof ScheduleType.DailyReset> {
	const schedule = nextDailyReset(now);

	return {
		type: ScheduleType.DailyReset,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.toMillis(),
		),
		nextUnix: schedule.toMillis(),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function eyeOfEdenNext(
	now: DateTime,
	timeZone: string,
	locale: string,
): BaseSchedule<typeof ScheduleType.EyeOfEden> {
	const schedule = nextEyeOfEden(now);
	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

	if (schedule.diff(now, "days").days > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.EyeOfEden,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.toMillis()),
		nextUnix: schedule.toMillis(),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function internationalSpaceStationOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.InternationalSpaceStation> {
	const schedule = internationalSpaceStationSchedule(now);
	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

	if (schedule.start.diff(now, "days").days > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.InternationalSpaceStation,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.toMillis()),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function travellingSpiritOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleTravellingSpirit {
	const schedule = travellingSpiritSchedule(now);
	const startOptions: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };
	const endOptions: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

	if (schedule.start.diff(now, "days").days > 1) {
		startOptions.dateStyle = "medium";
	}

	if (schedule.visit && schedule.visit.end.diff(now, "days").days > 1) {
		endOptions.dateStyle = "medium";
	}

	return {
		type: ScheduleType.TravellingSpirit,
		now: schedule.visit?.spiritId ?? false,
		spiritId: schedule.spirit?.spiritId ?? null,
		next: new Intl.DateTimeFormat(locale, startOptions).format(schedule.start.toMillis()),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, endOptions).format(schedule.visit?.end.toMillis()),
		endUnix: schedule.visit ? schedule.visit.end.toMillis() : null,
		endRelative: schedule.visit ? formatRelativeTime(schedule.visit.end, now, locale) : null,
	};
}

function pollutedGeyserOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.PollutedGeyser> {
	const schedule = pollutedGeyserSchedule(now);

	return {
		type: ScheduleType.PollutedGeyser,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function grandmaOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.Grandma> {
	const schedule = grandmaSchedule(now);

	return {
		type: ScheduleType.Grandma,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function turtleOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.Turtle> {
	const schedule = turtleSchedule(now);

	return {
		type: ScheduleType.Turtle,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function shardEruptionOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.ShardEruption> {
	const schedule = shardEruptionSchedule(now);

	return {
		type: ScheduleType.ShardEruption,
		now: schedule.active ?? false,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "medium", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function dreamsSkaterOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.DreamsSkater> {
	const schedule = dreamsSkaterSchedule(now);
	const options: Intl.DateTimeFormatOptions = { timeStyle: "short", timeZone };

	if (now.weekday < 5) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.DreamsSkater,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.toMillis()),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function auroraOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.AURORA> {
	const schedule = auroraSchedule(now);

	return {
		type: ScheduleType.AURORA,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function passageNext(
	now: DateTime,
	timeZone: string,
	locale: string,
): BaseSchedule<typeof ScheduleType.Passage> {
	const schedule = nextPassage(now);

	return {
		type: ScheduleType.Passage,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.toMillis(),
		),
		nextUnix: schedule.toMillis(),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function aviarysFireworkFestivalOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.AviarysFireworkFestival> {
	const schedule = aviarysFireworkFestivalSchedule(now);
	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

	if (schedule.start.diff(now, "days").days > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.AviarysFireworkFestival,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.toMillis()),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function meteorShowerOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.MeteorShower> | null {
	const schedule = meteorShowerSchedule(now);

	if (!schedule) {
		return null;
	}

	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

	if (schedule.start.diff(now, "days").days > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.MeteorShower,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.start.toMillis()),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, options).format(schedule.end.toMillis()),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function nineColouredDeerOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.NineColouredDeer> {
	const schedule = nineColouredDeerSchedule(now);

	return {
		type: ScheduleType.NineColouredDeer,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function nestingWorkshopNext(
	now: DateTime,
	timeZone: string,
	locale: string,
): BaseSchedule<typeof ScheduleType.NestingWorkshop> {
	const schedule = nextNestingWorkshop(now);
	const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

	if (schedule.diff(now, "days").days > 1) {
		options.dateStyle = "medium";
	}

	return {
		type: ScheduleType.NestingWorkshop,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.toMillis()),
		nextUnix: schedule.toMillis(),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function vaultEldersBlessingOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.VaultEldersBlessing> {
	const schedule = vaultEldersBlessingSchedule(now);

	return {
		type: ScheduleType.VaultEldersBlessing,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

function projectorOfMemoriesOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleWithEnd<typeof ScheduleType.ProjectorOfMemories> {
	const schedule = projectorOfMemoriesSchedule(now);

	return {
		type: ScheduleType.ProjectorOfMemories,
		now: schedule.active,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.start.toMillis(),
		),
		nextUnix: schedule.start.toMillis(),
		relative: formatRelativeTime(schedule.start, now, locale),
		end: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.end.toMillis(),
		),
		endUnix: schedule.end.toMillis(),
		endRelative: formatRelativeTime(schedule.end, now, locale),
	};
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	return { locale: getLocale(context), timeZone: request.headers.get("cf-timezone") ?? TIME_ZONE };
};

interface DisplayCard {
	kind: DisplayCardKind;
	key: string;
	label: string;
	link?: { href: string; text: string } | undefined;
	pageHref?: string | undefined;
	active: boolean;
	next: string;
	nextUnix: number;
	relative: string;
	end?: string | null | undefined;
	endRelative?: string | null | undefined;
	endUnix?: number | null | undefined;
}

type DisplayCardKind = "season" | "event" | "schedule";

export default function Schedule() {
	const { locale, timeZone } = useLoaderData<typeof loader>();
	const { t } = useTranslation();
	const [, setCurrentTime] = useState(() => Date.now());

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null;

		const scheduleNextUpdate = () => {
			timeout = setTimeout(
				() => {
					setCurrentTime(Date.now());
					scheduleNextUpdate();
				},
				60_000 - (Date.now() % 60_000),
			);
		};

		scheduleNextUpdate();

		return () => {
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, []);

	const now = skyNow();
	const today = now.startOf("day");

	const schedules = [
		dailyResetNext(now, timeZone, locale),
		eyeOfEdenNext(now, timeZone, locale),
		internationalSpaceStationOverview(now, timeZone, locale),
		travellingSpiritOverview(now, timeZone, locale),
		pollutedGeyserOverview(now, timeZone, locale),
		grandmaOverview(now, timeZone, locale),
		turtleOverview(now, timeZone, locale),
		shardEruptionOverview(now, timeZone, locale),
		dreamsSkaterOverview(now, timeZone, locale),
		auroraOverview(now, timeZone, locale),
		passageNext(now, timeZone, locale),
		aviarysFireworkFestivalOverview(now, timeZone, locale),
		nineColouredDeerOverview(now, timeZone, locale),
		meteorShowerOverview(now, timeZone, locale),
		nestingWorkshopNext(now, timeZone, locale),
		vaultEldersBlessingOverview(now, timeZone, locale),
		projectorOfMemoriesOverview(now, timeZone, locale),
	].filter((schedule) => schedule !== null) satisfies readonly BaseSchedule<ScheduleTypes>[];

	const allCards: DisplayCard[] = [];

	for (const schedule of schedules) {
		const label = t(`schedule.type.${schedule.type}`, { ns: "features" });
		let link: DisplayCard["link"];
		const isActive = schedule.now !== undefined && schedule.now !== false;

		if (schedule.type === ScheduleType.TravellingSpirit && schedule.spiritId) {
			const spiritName = t(`spirits.${schedule.spiritId}`, { ns: "general" });
			link = { href: t(`spirit-wiki.${schedule.spiritId}`, { ns: "general" }), text: spiritName };
		}

		allCards.push({
			kind: "schedule",
			key: `${schedule.type}`,
			label,
			link,
			pageHref: schedule.type === ScheduleType.ShardEruption ? "/shard-eruption" : undefined,
			active: isActive,
			next: schedule.next,
			nextUnix: schedule.nextUnix,
			relative: schedule.relative,
			end: schedule.end,
			endRelative: schedule.endRelative,
			endUnix: "endUnix" in schedule ? schedule.endUnix : undefined,
		});
	}

	const season = skyCurrentSeason(now);

	if (season) {
		const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

		if (season.end.diff(now, "days").days > 1) {
			options.dateStyle = "medium";
		}

		const seasonName = t(`seasons.${season.id}`, { ns: "general" });
		allCards.push({
			kind: "season",
			key: `season-${season.id}`,
			label: seasonName,
			link: { href: t(`season-wiki.${season.id}`, { ns: "general" }), text: seasonName },
			active: true,
			next: new Intl.DateTimeFormat(locale, options).format(season.end.toMillis()),
			nextUnix: season.end.toMillis(),
			relative: formatRelativeTime(season.end, now, locale),
			end: new Intl.DateTimeFormat(locale, options).format(season.end.toMillis()),
			endRelative: formatRelativeTime(season.end, now, locale),
			endUnix: season.end.toMillis(),
		});
	}

	const nextSeason = skyUpcomingSeason(today);

	if (nextSeason) {
		const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

		if (nextSeason.start.diff(now, "days").days > 1) {
			options.dateStyle = "medium";
		}

		const nextSeasonName = t(`seasons.${nextSeason.id}`, { ns: "general" });
		allCards.push({
			kind: "season",
			key: `season-${nextSeason.id}`,
			label: nextSeasonName,
			link: { href: t(`season-wiki.${nextSeason.id}`, { ns: "general" }), text: nextSeasonName },
			active: false,
			next: new Intl.DateTimeFormat(locale, options).format(nextSeason.start.toMillis()),
			nextUnix: nextSeason.start.toMillis(),
			relative: formatRelativeTime(nextSeason.start, now, locale),
			endUnix: nextSeason.end.toMillis(),
		});
	}

	for (const { id, start, end } of skyNotEndedEvents(today).values()) {
		const daysUntilStart = start.diff(today, "days").days;
		const name = t(`events.${id}`, { ns: "general" });
		const isActive = daysUntilStart <= 0;

		if (isActive) {
			const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

			if (end.diff(now, "days").days > 1) {
				options.dateStyle = "medium";
			}

			allCards.push({
				kind: "event",
				key: `event-${id}`,
				label: name,
				link: { href: t(`event-wiki.${id}`, { ns: "general" }), text: name },
				active: true,
				next: new Intl.DateTimeFormat(locale, options).format(end.toMillis()),
				nextUnix: end.toMillis(),
				relative: formatRelativeTime(end, now, locale),
				end: new Intl.DateTimeFormat(locale, options).format(end.toMillis()),
				endRelative: formatRelativeTime(end, now, locale),
				endUnix: end.toMillis(),
			});
		} else {
			const options: Intl.DateTimeFormatOptions = { timeZone, timeStyle: "short" };

			if (start.diff(now, "days").days > 1) {
				options.dateStyle = "medium";
			}

			allCards.push({
				kind: "event",
				key: `event-${id}`,
				label: name,
				link: { href: t(`event-wiki.${id}`, { ns: "general" }), text: name },
				active: false,
				next: new Intl.DateTimeFormat(locale, options).format(start.toMillis()),
				nextUnix: start.toMillis(),
				relative: formatRelativeTime(start, now, locale),
			});
		}
	}

	const active: DisplayCard[] = [];
	const upcoming: DisplayCard[] = [];

	for (const card of allCards) {
		if (card.active) {
			active.push(card);
		} else {
			upcoming.push(card);
		}
	}

	active.sort(
		(a, b) => (b.endUnix ?? Number.POSITIVE_INFINITY) - (a.endUnix ?? Number.POSITIVE_INFINITY),
	);

	upcoming.sort((a, b) => a.nextUnix - b.nextUnix);

	return (
		<div className="min-h-[calc(100vh-9rem)] flex items-center justify-center px-4">
			<div className="w-full max-w-2xl space-y-4">
				{/* Active. */}
				{active.length > 0 && (
					<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4">
						<div className="mt-1 mb-2">
							<span className="text-sm font-medium text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">
								{t("schedule.overview-active", { ns: "features" })}
							</span>
						</div>
						<div className="divide-y divide-gray-100 dark:divide-gray-800">
							{active.map((item) => (
								<div
									className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-1 sm:gap-4"
									key={item.key}
								>
									<span className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2 flex-wrap">
										{item.pageHref ? (
											<Link className="regular-link" to={item.pageHref}>
												{item.label}
											</Link>
										) : item.link && item.link.text === item.label ? (
											<a
												className="inline-flex items-center regular-link"
												href={item.link.href}
												rel="noopener noreferrer"
												target="_blank"
											>
												{item.label}
												<ExternalLinkIcon className="ml-1.5 w-3.5 h-3.5" />
											</a>
										) : (
											<>
												{item.label}
												{item.link && (
													<a
														className="inline-flex items-center regular-link"
														href={item.link.href}
														rel="noopener noreferrer"
														target="_blank"
													>
														{item.link.text}
														<ExternalLinkIcon className="ml-1.5 w-3.5 h-3.5" />
													</a>
												)}
											</>
										)}
										{item.kind === "season" && (
											<span className="text-xs font-medium text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900 px-1.5 py-0.5 rounded">
												{t("season", { ns: "general" })}
											</span>
										)}
										{item.kind === "event" && (
											<span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-1.5 py-0.5 rounded">
												{t("event", { ns: "general" })}
											</span>
										)}
									</span>
									<span className="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
										{t("schedule.overview-ends-timestamp", {
											ns: "features",
											timestamp: item.end,
										})}{" "}
										({item.endRelative})
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Upcoming. */}
				<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-4">
					<div className="mt-1 mb-2">
						<span className="text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
							{t("schedule.overview-upcoming", { ns: "features" })}
						</span>
					</div>
					<div className="divide-y divide-gray-100 dark:divide-gray-800">
						{upcoming.map((item) => (
							<div
								className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-1 sm:gap-4"
								key={item.key}
							>
								<span className="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2 flex-wrap">
									{item.pageHref ? (
										<Link className="regular-link" to={item.pageHref}>
											{item.label}
										</Link>
									) : item.link && item.link.text === item.label ? (
										<a
											className="inline-flex items-center regular-link"
											href={item.link.href}
											rel="noopener noreferrer"
											target="_blank"
										>
											{item.label}
											<ExternalLinkIcon className="ml-1.5 w-3.5 h-3.5" />
										</a>
									) : (
										<>
											{item.label}
											{item.link && (
												<a
													className="inline-flex items-center regular-link"
													href={item.link.href}
													rel="noopener noreferrer"
													target="_blank"
												>
													{item.link.text}
													<ExternalLinkIcon className="ml-1.5 w-3.5 h-3.5" />
												</a>
											)}
										</>
									)}
									{item.kind === "season" && (
										<span className="text-xs font-medium text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900 px-1.5 py-0.5 rounded">
											{t("season", { ns: "general" })}
										</span>
									)}
									{item.kind === "event" && (
										<span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-1.5 py-0.5 rounded">
											{t("event", { ns: "general" })}
										</span>
									)}
								</span>
								<span className="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
									{item.next}{" "}
									<span className="text-gray-400 dark:text-gray-500">({item.relative})</span>
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
