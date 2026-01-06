import { context, reddit, redis } from "@devvit/web/server";
import {
	communityUpcomingEvents,
	shardEruption,
	skyCurrentSeason,
	skyNotEndedEvents,
	skyNow,
	skyToday,
	skyUpcomingSeason,
	TIME_ZONE,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import { REDIS_WIDGET_DAILY_GUIDES_KEY } from "../utility/constants.js";

function formatRelativeTime(date: ReturnType<typeof skyToday>, now: ReturnType<typeof skyToday>) {
	const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "always" });
	const diffMinutes = Math.round(date.diff(now, "minutes").minutes);
	const diffHours = Math.round(date.diff(now, "hours").hours);

	if (Math.abs(diffMinutes) < 60) {
		return rtf.format(diffMinutes, "minute");
	}

	return rtf.format(diffHours, "hour");
}

export async function dailyGuidesWidgetUpdate() {
	const today = skyToday();
	const now = skyNow();
	const shard = shardEruption();
	const season = skyCurrentSeason(today);

	const text = [
		`Time (PT): ${new Intl.DateTimeFormat("en-GB", {
			dateStyle: "short",
			timeStyle: "short",
			timeZone: TIME_ZONE,
		}).format(now.toJSDate())}\n`,
	];

	if (shard) {
		const { realm, skyMap, strong, reward, timestamps, url } = shard;

		const timestampsString = timestamps
			.map(({ start, end }) => {
				let string = t("time-range", {
					ns: "general",
					start: new Intl.DateTimeFormat("en-GB", {
						timeStyle: "short",
						timeZone: TIME_ZONE,
					}).format(start.toJSDate()),
					end: new Intl.DateTimeFormat("en-GB", {
						timeStyle: "short",
						timeZone: TIME_ZONE,
					}).format(end.toJSDate()),
				});

				if (start > now) {
					string += ` (${formatRelativeTime(start, now)})`;
				} else if (now >= start && now < end) {
					string = `**${string} (Now!)**`;
				} else {
					string = `~~${string}~~`;
				}

				return string;
			})
			.join("\n        - ");

		text.push(
			`- ${strong ? "Strong" : "Regular"} shard eruption\n    - Location: [${t("shard-eruption.realm-map", { ns: "features", realm, map: skyMap })}](${url})\n    - Reward: ${reward === 200 ? "200 pieces of light" : `${reward} ascended candles`}\n    - Timestamps (PT):\n        - ${timestampsString}`,
		);
	} else {
		text.push(`- ${t("shard-eruption.no-shard-eruptions-today", { ns: "features" })}`);
	}

	if (season) {
		text.push(
			`- ${t("days-left.season", {
				ns: "general",
				count: Math.ceil(season.end.diff(now, "days").days) - 1,
			})}`,
		);
	}

	const next = skyUpcomingSeason(today);

	if (next) {
		const daysUntilStart = next.start.diff(today, "days").days;
		text.push(`- ${t("daily-guides.season-upcoming", { ns: "features", count: daysUntilStart })}`);
	}

	for (const { id, start, end } of skyNotEndedEvents(today).values()) {
		const daysUntilStart = start.diff(today, "days").days;
		const name = t(`events.${id}`, { ns: "general" });

		if (daysUntilStart > 0) {
			text.push(
				`- ${t("daily-guides.event-upcoming", { ns: "features", event: name, count: daysUntilStart })}`,
			);
		} else {
			text.push(
				`- ${t("days-left.event", {
					ns: "general",
					count: Math.ceil(end.diff(today, "days").days) - 1,
					name,
				})}`,
			);
		}
	}

	const communityEvents = communityUpcomingEvents(today);

	if (communityEvents.length > 0) {
		for (const { start, name, marketingURL } of communityEvents) {
			const untilStart = start.diff(today, "days").days;
			const formattedName = marketingURL ? `[${name}](${marketingURL})` : name;

			text.push(
				`- ${
					untilStart >= 1
						? t("daily-guides.event-upcoming", {
								ns: "features",
								event: formattedName,
								count: Math.floor(untilStart),
							})
						: t("daily-guides.event-upcoming-time", {
								ns: "features",
								event: formattedName,
								time: new Intl.DateTimeFormat("en-GB", {
									timeZone: TIME_ZONE,
									timeStyle: "short",
								}).format(start.toMillis()),
							})
				}`,
			);
		}
	}

	let widgetId = await redis.get(REDIS_WIDGET_DAILY_GUIDES_KEY);

	if (!widgetId) {
		console.info("Daily guides widget not found. Creating one.");

		const widget = await reddit.addWidget({
			subreddit: context.subredditName,
			type: "textarea",
			shortName: "Countdown",
			text: text.join("\n"),
		});

		await redis.set(REDIS_WIDGET_DAILY_GUIDES_KEY, widget.id);
		widgetId = widget.id;
	}

	try {
		await reddit.updateWidget({
			subreddit: context.subredditName,
			type: "textarea",
			id: widgetId,
			shortName: "Countdown",
			text: text.join("\n"),
		});
	} catch (error) {
		if (error instanceof Error && error.message.includes("Invalid value for widget_id")) {
			console.info("Daily guides widget id found but widget does not exist. Removing Redis key.");
			await redis.del(REDIS_WIDGET_DAILY_GUIDES_KEY);
			return;
		}

		throw error;
	}
}
