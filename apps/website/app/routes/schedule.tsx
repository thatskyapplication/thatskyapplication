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
	const diffMs = date.toMillis() - now.toMillis();
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });
	const diffMinutes = Math.floor(diffMs / 60_000);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (Math.abs(diffMinutes) < 60) {
		return rtf.format(diffMinutes, "minute");
	}

	if (Math.abs(diffHours) < 24) {
		return rtf.format(diffHours, "hour");
	}

	return rtf.format(diffDays, "day");
}

interface ScheduleData {
	now?: boolean | SpiritIds;
	next: string;
	nextUnix: number;
	relative: string;
}

function dailyResetNext(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = nextDailyReset(now);

	return {
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.toMillis(),
		),
		nextUnix: schedule.toMillis(),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function eyeOfEdenNext(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = nextEyeOfEden(now);

	return {
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.toMillis()),
		nextUnix: schedule.toMillis(),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function internationalSpaceStationOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleData {
	const schedule = internationalSpaceStationSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.next.toMillis()),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function travellingSpiritOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = travellingSpiritSchedule(now);

	return {
		now: schedule.visit?.spiritId ?? false,
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.next.toMillis()),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function pollutedGeyserOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = pollutedGeyserSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function grandmaOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = grandmaSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function turtleOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = turtleSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function shardEruptionOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = shardEruptionSchedule(now);

	return {
		now: schedule.now ?? false,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "medium", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function dreamsSkaterOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = dreamsSkaterSchedule(now);
	const options: Intl.DateTimeFormatOptions = { timeStyle: "short", timeZone };

	if (now.weekday < 5) {
		options.dateStyle = "medium";
	}

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.next.toMillis()),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function auroraOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = auroraSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function passageNext(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = nextPassage(now);

	return {
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
): ScheduleData {
	const schedule = aviarysFireworkFestivalSchedule(now);
	const options: Intl.DateTimeFormatOptions = { timeStyle: "short", timeZone };

	if (now.day !== 1) {
		options.dateStyle = "medium";
	}

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.next.toMillis()),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function nineColouredDeerOverview(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = nineColouredDeerSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function nestingWorkshopNext(now: DateTime, timeZone: string, locale: string): ScheduleData {
	const schedule = nextNestingWorkshop(now);

	return {
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.toMillis()),
		nextUnix: schedule.toMillis(),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function vaultEldersBlessingOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleData {
	const schedule = vaultEldersBlessingSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function projectorOfMemoriesOverview(
	now: DateTime,
	timeZone: string,
	locale: string,
): ScheduleData {
	const schedule = projectorOfMemoriesSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		nextUnix: schedule.next.toMillis(),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	return { locale: getLocale(context), timeZone: request.headers.get("cf-timezone") ?? TIME_ZONE };
};

function getEventColor(available: boolean | SpiritIds | undefined) {
	return available === undefined || available === false
		? "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-700"
		: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-700";
}

export default function Schedule() {
	const { locale, timeZone } = useLoaderData<typeof loader>();
	const { t } = useTranslation();
	const [_, setCurrentTime] = useState(() => Date.now());

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
	const dailyReset = dailyResetNext(now, timeZone, locale);
	const eyeOfEden = eyeOfEdenNext(now, timeZone, locale);
	const internationalSpaceStation = internationalSpaceStationOverview(now, timeZone, locale);
	const travellingSpirit = travellingSpiritOverview(now, timeZone, locale);
	const pollutedGeyser = pollutedGeyserOverview(now, timeZone, locale);
	const grandma = grandmaOverview(now, timeZone, locale);
	const turtle = turtleOverview(now, timeZone, locale);
	const shardEruption = shardEruptionOverview(now, timeZone, locale);
	const dreamsSkater = dreamsSkaterOverview(now, timeZone, locale);
	const aurora = auroraOverview(now, timeZone, locale);
	const passage = passageNext(now, timeZone, locale);
	const aviarysFireworkFestival = aviarysFireworkFestivalOverview(now, timeZone, locale);
	const nineColouredDeer = nineColouredDeerOverview(now, timeZone, locale);
	const nestingWorkshop = nestingWorkshopNext(now, timeZone, locale);
	const vaultEldersBlessing = vaultEldersBlessingOverview(now, timeZone, locale);
	const projectorOfMemories = projectorOfMemoriesOverview(now, timeZone, locale);

	const schedule = [
		{ type: ScheduleType.DailyReset, schedule: dailyReset },
		{ type: ScheduleType.EyeOfEden, schedule: eyeOfEden },
		{ type: ScheduleType.ShardEruption, schedule: shardEruption },
		{ type: ScheduleType.TravellingSpirit, schedule: travellingSpirit },
		{ type: ScheduleType.NestingWorkshop, schedule: nestingWorkshop },
		{ type: ScheduleType.AviarysFireworkFestival, schedule: aviarysFireworkFestival },
		{ type: ScheduleType.InternationalSpaceStation, schedule: internationalSpaceStation },
		{ type: ScheduleType.PollutedGeyser, schedule: pollutedGeyser },
		{ type: ScheduleType.Grandma, schedule: grandma },
		{ type: ScheduleType.Turtle, schedule: turtle },
		{ type: ScheduleType.AURORA, schedule: aurora },
		{ type: ScheduleType.DreamsSkater, schedule: dreamsSkater },
		{ type: ScheduleType.VaultEldersBlessing, schedule: vaultEldersBlessing },
		{ type: ScheduleType.Passage, schedule: passage },
		{ type: ScheduleType.NineColouredDeer, schedule: nineColouredDeer },
		{ type: ScheduleType.ProjectorOfMemories, schedule: projectorOfMemories },
	] satisfies Readonly<{ type: ScheduleTypes; schedule: ScheduleData }[]>;

	const active = [];
	const upcoming = [];

	for (const item of schedule) {
		if (item.schedule.now === undefined || item.schedule.now === false) {
			upcoming.push(item);
			continue;
		}

		active.push(item);
	}

	upcoming.sort((a, b) => a.schedule.nextUnix - b.schedule.nextUnix);

	return (
		<div className="min-h-screen px-4 pt-10">
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
							{active.map((item) => {
								const { schedule } = item;

								return (
									<div
										className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${getEventColor(schedule.now)}`}
										key={item.type}
									>
										<div className="absolute top-0 right-0 w-20 h-20 opacity-10">
											<div className="absolute inset-0 bg-gradient-to-br from-current to-transparent rounded-full blur-xl" />
										</div>
										<div className="relative z-10">
											<div className="flex items-center justify-between mb-3">
												<h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
													{t(`schedule.type.${item.type}`, { ns: "features" })}
												</h3>
												<div className="flex items-center gap-2">
													<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
													<span className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wider">
														{t("schedule.overview-active", { ns: "features" })}
													</span>
												</div>
											</div>
											{schedule.now !== true && (
												<div className="mb-3">
													<span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
														{item.type === ScheduleType.TravellingSpirit
															? t(`spirits.${schedule.now}`, { ns: "general" })
															: "Available"}
													</span>
												</div>
											)}
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
								);
							})}
						</div>

						{/* Mobile. */}
						<div className="md:hidden space-y-3">
							{active.map((item) => {
								const { schedule } = item;

								return (
									<div
										className={`rounded-lg border p-4 bg-gradient-to-r ${getEventColor(schedule.now)}`}
										key={item.type}
									>
										<div className="flex items-center justify-between mb-2">
											<h3 className="font-bold text-gray-900 dark:text-gray-100">
												{t(`schedule.type.${item.type}`, { ns: "features" })}
											</h3>
											<div className="flex items-center gap-2">
												<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
												<span className="text-xs font-medium text-green-700 dark:text-green-300 uppercase tracking-wider">
													{t("schedule.overview-active", { ns: "features" })}
												</span>
											</div>
										</div>
										{schedule.now !== true && (
											<div className="mb-2">
												<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
													{item.type === ScheduleType.TravellingSpirit
														? t(`spirits.${schedule.now}`, { ns: "general" })
														: "Available"}
												</span>
											</div>
										)}
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
								);
							})}
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
						{upcoming.map((item) => {
							const { schedule } = item;
							return (
								<div
									className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${getEventColor(schedule.now)}`}
									key={item.type}
								>
									<div className="absolute top-0 right-0 w-20 h-20 opacity-5">
										<div className="absolute inset-0 bg-gradient-to-br from-current to-transparent rounded-full blur-xl" />
									</div>
									<div className="relative z-10">
										<div className="flex items-center justify-between mb-3">
											<h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
												{t(`schedule.type.${item.type}`, { ns: "features" })}
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
							);
						})}
					</div>

					{/* Mobile. */}
					<div className="md:hidden space-y-3">
						{upcoming.map((item) => {
							const { schedule } = item;
							return (
								<div
									className={`rounded-lg border p-4 bg-gradient-to-r ${getEventColor(schedule.now)}`}
									key={item.type}
								>
									<div className="flex items-center justify-between mb-2">
										<h3 className="font-bold text-gray-900 dark:text-gray-100">
											{t(`schedule.type.${item.type}`, { ns: "features" })}
										</h3>
										<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
											{t("schedule.overview-upcoming", { ns: "features" })}
										</span>
									</div>
									<div className="flex justify-between items-center text-sm">
										<span className="text-gray-600 dark:text-gray-400">
											{t("schedule.overview-next-timestamp", {
												ns: "features",
												timestamp: schedule.now,
											})}
										</span>
										<span className="font-medium text-gray-700 dark:text-gray-300">
											{schedule.relative}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
