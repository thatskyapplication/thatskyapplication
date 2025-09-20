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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData, useRevalidator } from "react-router";
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

function dailyResetNext(now: DateTime, timeZone: string, locale: string) {
	const schedule = nextDailyReset(now);

	return {
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.toMillis(),
		),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function eyeOfEdenNext(now: DateTime, timeZone: string, locale: string) {
	const schedule = nextEyeOfEden(now);

	return {
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.toMillis()),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function internationalSpaceStationOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = internationalSpaceStationSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.next.toMillis()),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function travellingSpiritOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = travellingSpiritSchedule(now);

	return {
		now: schedule.visit?.spiritId,
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.next.toMillis()),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function pollutedGeyserOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = pollutedGeyserSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function grandmaOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = grandmaSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function turtleOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = turtleSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function shardEruptionOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = shardEruptionSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "medium", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function dreamsSkaterOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = dreamsSkaterSchedule(now);
	const options: Intl.DateTimeFormatOptions = { timeStyle: "short", timeZone };

	if (now.weekday < 5) {
		options.dateStyle = "medium";
	}

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.next.toMillis()),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function auroraOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = auroraSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function passageNext(now: DateTime, timeZone: string, locale: string) {
	const schedule = nextPassage(now);

	return {
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.toMillis(),
		),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function aviarysFireworkFestivalOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = aviarysFireworkFestivalSchedule(now);
	const options: Intl.DateTimeFormatOptions = { timeStyle: "short", timeZone };

	if (now.day !== 1) {
		options.dateStyle = "medium";
	}

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, options).format(schedule.next.toMillis()),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function nineColouredDeerOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = nineColouredDeerSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function nestingWorkshopNext(now: DateTime, timeZone: string, locale: string) {
	const schedule = nextNestingWorkshop(now);

	return {
		next: new Intl.DateTimeFormat(locale, {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone,
		}).format(schedule.toMillis()),
		relative: formatRelativeTime(schedule, now, locale),
	};
}

function vaultEldersBlessingOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = vaultEldersBlessingSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

function projectorOfMemoriesOverview(now: DateTime, timeZone: string, locale: string) {
	const schedule = projectorOfMemoriesSchedule(now);

	return {
		now: schedule.now,
		next: new Intl.DateTimeFormat(locale, { timeStyle: "short", timeZone }).format(
			schedule.next.toMillis(),
		),
		relative: formatRelativeTime(schedule.next, now, locale),
	};
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const locale = getLocale(context);
	const timeZone = request.headers.get("cf-timezone") ?? TIME_ZONE;
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

	return [
		{
			type: ScheduleType.DailyReset,
			nextTime: dailyReset.next,
			nextRelative: dailyReset.relative,
		},
		{
			type: ScheduleType.EyeOfEden,
			nextTime: eyeOfEden.next,
			nextRelative: eyeOfEden.relative,
		},
		{
			type: ScheduleType.ShardEruption,
			available: shardEruption.now,
			nextTime: shardEruption.next,
			nextRelative: shardEruption.relative,
		},
		{
			type: ScheduleType.TravellingSpirit,
			available: travellingSpirit.now,
			nextTime: travellingSpirit.next,
			nextRelative: travellingSpirit.relative,
		},
		{
			type: ScheduleType.NestingWorkshop,
			nextTime: nestingWorkshop.next,
			nextRelative: nestingWorkshop.relative,
		},
		{
			type: ScheduleType.AviarysFireworkFestival,
			available: aviarysFireworkFestival.now,
			nextTime: aviarysFireworkFestival.next,
			nextRelative: aviarysFireworkFestival.relative,
		},
		{
			type: ScheduleType.InternationalSpaceStation,
			available: internationalSpaceStation.now,
			nextTime: internationalSpaceStation.next,
			nextRelative: internationalSpaceStation.relative,
		},
		{
			type: ScheduleType.PollutedGeyser,
			available: pollutedGeyser.now,
			nextTime: pollutedGeyser.next,
			nextRelative: pollutedGeyser.relative,
		},
		{
			type: ScheduleType.Grandma,
			available: grandma.now,
			nextTime: grandma.next,
			nextRelative: grandma.relative,
		},
		{
			type: ScheduleType.Turtle,
			available: turtle.now,
			nextTime: turtle.next,
			nextRelative: turtle.relative,
		},
		{
			type: ScheduleType.AURORA,
			available: aurora.now,
			nextTime: aurora.next,
			nextRelative: aurora.relative,
		},
		{
			type: ScheduleType.DreamsSkater,
			available: dreamsSkater.now,
			nextTime: dreamsSkater.next,
			nextRelative: dreamsSkater.relative,
		},
		{
			type: ScheduleType.VaultEldersBlessing,
			available: vaultEldersBlessing.now,
			nextTime: vaultEldersBlessing.next,
			nextRelative: vaultEldersBlessing.relative,
		},
		{
			type: ScheduleType.Passage,
			nextTime: passage.next,
			nextRelative: passage.relative,
		},
		{
			type: ScheduleType.NineColouredDeer,
			available: nineColouredDeer.now,
			nextTime: nineColouredDeer.next,
			nextRelative: nineColouredDeer.relative,
		},
		{
			type: ScheduleType.ProjectorOfMemories,
			available: projectorOfMemories.now,
			nextTime: projectorOfMemories.next,
			nextRelative: projectorOfMemories.relative,
		},
	];
};

function getEventColor(available: boolean | SpiritIds | undefined) {
	return available === undefined || available === false
		? "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-700"
		: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-700";
}

export default function Schedule() {
	const data = useLoaderData<typeof loader>();
	const { t } = useTranslation();
	const revalidator = useRevalidator();

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null;

		const scheduleNextUpdate = () => {
			timeout = setTimeout(
				() => {
					void revalidator.revalidate();
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
	}, [revalidator]);

	const active = [];
	const upcoming = [];

	for (const item of data) {
		if (item.available === undefined || item.available === false) {
			upcoming.push(item);
			continue;
		}

		active.push(item);
	}

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
							{active.map((item) => (
								<div
									className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${getEventColor(item.available)}`}
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
										{item.available !== true && (
											<div className="mb-3">
												<span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
													{item.type === ScheduleType.TravellingSpirit
														? t(`spirits.${item.available}`, { ns: "general" })
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
													{item.nextTime}
												</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-sm text-gray-600 dark:text-gray-400">
													{t("schedule.overview-in", { ns: "features" })}
												</span>
												<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
													{item.nextRelative}
												</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Mobile. */}
						<div className="md:hidden space-y-3">
							{active.map((item) => (
								<div
									className={`rounded-lg border p-4 bg-gradient-to-r ${getEventColor(item.available)}`}
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
									{item.available !== true && (
										<div className="mb-2">
											<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
												{item.type === ScheduleType.TravellingSpirit
													? t(`spirits.${item.available}`, { ns: "general" })
													: "Available"}
											</span>
										</div>
									)}
									<div className="flex justify-between items-center text-sm">
										<span className="text-gray-600 dark:text-gray-400">
											{t("schedule.overview-next-timestamp", {
												ns: "features",
												timestamp: item.nextTime,
											})}
										</span>
										<span className="font-medium text-gray-700 dark:text-gray-300">
											{item.nextRelative}
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
						{upcoming.map((item) => (
							<div
								className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${getEventColor(item.available)}`}
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
												{item.nextTime}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-sm text-gray-600 dark:text-gray-400">
												{t("schedule.overview-in", { ns: "features" })}
											</span>
											<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
												{item.nextRelative}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Mobile. */}
					<div className="md:hidden space-y-3">
						{upcoming.map((item) => (
							<div
								className={`rounded-lg border p-4 bg-gradient-to-r ${getEventColor(item.available)}`}
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
											timestamp: item.nextTime,
										})}
									</span>
									<span className="font-medium text-gray-700 dark:text-gray-300">
										{item.nextRelative}
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
