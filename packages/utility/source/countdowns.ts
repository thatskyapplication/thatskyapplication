import { daysLeftUntil, daysUntil } from "./dates.js";
import type { MessageFormatting } from "./types/index.js";

type CountdownFormatting = Pick<MessageFormatting, "locale" | "t">;

export type DoublePeriodName =
	| "double-hearts"
	| "double-seasonal-light"
	| "double-treasure-candles";

export function daysLeftText(
	period: DoublePeriodName | "event" | "season",
	end: Temporal.ZonedDateTime,
	from: Temporal.ZonedDateTime,
	{ locale, t }: CountdownFormatting,
	name?: string,
) {
	const daysLeft = daysLeftUntil(end, from);

	return t(daysLeft === 0 ? `days-left.${period}-ends-today` : `days-left.${period}`, {
		lng: locale,
		ns: "general",
		count: daysLeft,
		name,
	});
}

export function doublePeriodCountdown(
	name: DoublePeriodName,
	{ end, start }: { end: Temporal.ZonedDateTime; start: Temporal.ZonedDateTime },
	today: Temporal.ZonedDateTime,
	formatting: CountdownFormatting,
) {
	return Temporal.ZonedDateTime.compare(today, start) >= 0
		? daysLeftText(name, end, today, formatting)
		: formatting.t(`daily-guides.${name}-upcoming`, {
				lng: formatting.locale,
				ns: "features",
				count: Math.floor(daysUntil(start, today)),
			});
}

export function returningSpiritsCountdown(
	{
		active,
		end,
		start,
	}: { active: boolean; end: Temporal.ZonedDateTime; start: Temporal.ZonedDateTime },
	spirits: string,
	today: Temporal.ZonedDateTime,
	{ locale, t }: CountdownFormatting,
) {
	const returningSpirits = t("returning-spirits", { lng: locale, ns: "general" });

	if (!active) {
		return t("daily-guides.returning-spirits-upcoming-list", {
			lng: locale,
			ns: "features",
			count: daysUntil(start, today),
			returningSpirits,
			spirits,
		});
	}

	const daysLeft = daysLeftUntil(end, today);

	return t(
		daysLeft === 0
			? "daily-guides.returning-spirits-leave-today"
			: "daily-guides.returning-spirits-active-list",
		{ lng: locale, ns: "features", count: daysLeft, returningSpirits, spirits },
	);
}

export function upcomingMaintenanceCountdown(
	days: number,
	time: string,
	{ locale, t }: CountdownFormatting,
) {
	return days > 1
		? t("daily-guides.maintenance-upcoming", { lng: locale, ns: "features", count: days })
		: t("daily-guides.maintenance-tomorrow", { lng: locale, ns: "features", time });
}

export function upcomingEventCountdown(
	event: string,
	start: Temporal.ZonedDateTime,
	time: string,
	today: Temporal.ZonedDateTime,
	{ locale, t }: CountdownFormatting,
) {
	const daysUntilStart = daysUntil(start, today);

	return daysUntilStart < 1
		? t("daily-guides.event-upcoming-time", { lng: locale, ns: "features", event, time })
		: t("daily-guides.event-upcoming", {
				lng: locale,
				ns: "features",
				event,
				count: Math.floor(daysUntilStart),
			});
}
