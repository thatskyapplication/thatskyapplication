import {
	auroraSchedule,
	aviarysFireworkFestivalSchedule,
	dreamsSkaterSchedule,
	grandmaSchedule,
	internationalSpaceStationSchedule,
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
	skyNow,
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
import { useLoaderData } from "react-router";
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

function getEventColor(available: boolean | SpiritIds | undefined) {
	return available === undefined || available === false
		? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
		: "bg-emerald-50 dark:bg-emerald-900 border-emerald-200 dark:border-emerald-700";
}

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
		nestingWorkshopNext(now, timeZone, locale),
		vaultEldersBlessingOverview(now, timeZone, locale),
		projectorOfMemoriesOverview(now, timeZone, locale),
	] satisfies readonly BaseSchedule<ScheduleTypes>[];

	const active = [];
	const upcoming = [];

	for (const schedule of schedules) {
		if (schedule.now === undefined || schedule.now === false) {
			upcoming.push(schedule);
			continue;
		}

		active.push(schedule);
	}

	upcoming.sort((a, b) => a.nextUnix - b.nextUnix);

	return (
		<div className="px-4">
			<div className="max-w-6xl mx-auto">
				{/* Active. */}
				{active.length > 0 && (
					<div className="mb-12">
						<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
							<span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
							{t("schedule.overview-active", { ns: "features" })}
						</h2>

						{/* Desktop. */}
						<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{active.map((schedule) => (
								<div
									className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getEventColor(schedule.now)}`}
									key={schedule.type}
								>
									<div className="absolute top-0 right-0 w-20 h-20 opacity-10">
										<div className="absolute inset-0 bg-linear-to-br from-current to-transparent rounded-full blur-xl" />
									</div>
									<div className="relative z-10">
										<div className="flex items-center justify-between mb-3">
											<h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
												{schedule.type === ScheduleType.TravellingSpirit ? (
													schedule.now === false ? (
														t(`schedule.type.${schedule.type}`, { ns: "features" })
													) : (
														<a
															className="inline-flex items-center regular-link"
															href={t(`spirit-wiki.${schedule.now}`, { ns: "general" })}
															rel="noopener noreferrer"
															target="_blank"
														>
															{t(`spirits.${schedule.now}`, { ns: "general" })}
															<ExternalLinkIcon className="ml-2 w-4 h-4" />
														</a>
													)
												) : (
													t(`schedule.type.${schedule.type}`, { ns: "features" })
												)}
											</h3>
											<div className="flex items-center gap-2">
												<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
												<span className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wider">
													{t("schedule.overview-active", { ns: "features" })}
												</span>
											</div>
										</div>
										<div className="space-y-2">
											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600 dark:text-gray-400">
													{t("schedule.overview-ends", { ns: "features" })}
												</span>
												<span className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">
													{schedule.end}
												</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600 dark:text-gray-400">
													{t("schedule.overview-in", { ns: "features" })}
												</span>
												<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
													{schedule.endRelative}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Mobile. */}
						<div className="md:hidden space-y-3">
							{active.map((schedule) => (
								<div
									className={`rounded-lg border p-4 ${getEventColor(schedule.now)}`}
									key={schedule.type}
								>
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-bold text-gray-900 dark:text-gray-100">
											{schedule.type === ScheduleType.TravellingSpirit ? (
												schedule.now === false ? (
													t(`schedule.type.${schedule.type}`, { ns: "features" })
												) : (
													<a
														className="inline-flex items-center regular-link"
														href={t(`spirit-wiki.${schedule.now}`, { ns: "general" })}
														rel="noopener noreferrer"
														target="_blank"
													>
														{t(`spirits.${schedule.now}`, { ns: "general" })}
														<ExternalLinkIcon className="ml-2 w-4 h-4" />
													</a>
												)
											) : (
												t(`schedule.type.${schedule.type}`, { ns: "features" })
											)}
										</h3>
										<div className="flex items-center gap-2">
											<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
											<span className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wider">
												{t("schedule.overview-active", { ns: "features" })}
											</span>
										</div>
									</div>
									<div className="flex justify-between items-center text-sm">
										<span className="text-gray-600 dark:text-gray-400">
											{t("schedule.overview-ends-timestamp", {
												ns: "features",
												timestamp: schedule.end,
											})}
										</span>
										<span className="font-medium text-gray-700 dark:text-gray-300">
											{schedule.endRelative}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Upcoming. */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3">
						<span className="w-3 h-3 bg-gray-400 rounded-full" />
						{t("schedule.overview-upcoming", { ns: "features" })}
					</h2>

					{/* Desktop. */}
					<div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{upcoming.map((schedule) => (
							<div
								className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getEventColor(schedule.now)}`}
								key={schedule.type}
							>
								<div className="absolute top-0 right-0 w-20 h-20 opacity-5">
									<div className="absolute inset-0 bg-linear-to-br from-current to-transparent rounded-full blur-xl" />
								</div>
								<div className="relative z-10">
									<div className="flex items-center justify-between mb-3">
										<h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
											{t(`schedule.type.${schedule.type}`, { ns: "features" })}
										</h3>
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
											{t("schedule.overview-upcoming", { ns: "features" })}
										</span>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600 dark:text-gray-400">
												{t("schedule.overview-next", { ns: "features" })}
											</span>
											<span className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">
												{schedule.next}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600 dark:text-gray-400">
												{t("schedule.overview-in", { ns: "features" })}
											</span>
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{schedule.relative}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Mobile. */}
					<div className="md:hidden space-y-3">
						{upcoming.map((schedule) => (
							<div
								className={`rounded-lg border p-4 ${getEventColor(schedule.now)}`}
								key={schedule.type}
							>
								<div className="flex items-center justify-between mb-2">
									<h3 className="font-bold text-gray-900 dark:text-gray-100">
										{t(`schedule.type.${schedule.type}`, { ns: "features" })}
									</h3>
									<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										{t("schedule.overview-upcoming", { ns: "features" })}
									</span>
								</div>
								<div className="flex justify-between items-center text-sm">
									<span className="text-gray-600 dark:text-gray-400">
										{t("schedule.overview-next-timestamp", {
											ns: "features",
											timestamp: schedule.next,
										})}
									</span>
									<span className="font-medium text-gray-700 dark:text-gray-300">
										{schedule.relative}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
