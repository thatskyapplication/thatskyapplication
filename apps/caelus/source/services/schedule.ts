import {
	type APIChatInputApplicationCommandInteraction,
	ComponentType,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import {
	Cosmetic,
	INTERNATIONAL_SPACE_STATION_DATES,
	NotificationType,
	skyNow,
	TRAVELLING_DATES,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { client } from "../discord.js";
import { PASSAGE_TRUNCATION_LIMIT } from "../utility/constants.js";

function dailyResetTime(date: DateTime) {
	return date.plus({ day: 1 }).toUnixInteger();
}

function eyeOfEdenResetTime(date: DateTime) {
	return date.set({ weekday: 7 }).toUnixInteger();
}

function travellingSpiritTime(now: DateTime, locale: Locale) {
	const travellingSpirit = TRAVELLING_DATES.find(({ start, end }) => now >= start && now < end);

	if (travellingSpirit) {
		return t("schedule.travelling-spirit-today", { lng: locale, ns: "commands" });
	}

	const nextArrival = TRAVELLING_DATES.last()?.start.plus({ weeks: 2 }).toUnixInteger();

	return `${t("schedule.travelling-spirit-none", { lng: locale, ns: "commands" })}\n_${
		nextArrival
			? `${t("schedule.travelling-spirit-next-visit", {
					lng: locale,
					ns: "commands",
				})} <t:${nextArrival}:d> (<t:${nextArrival}:R>)_`
			: ""
	}`;
}

function scheduleTimes(date: DateTime) {
	const tomorrow = date.plus({ days: 1 });
	const pollutedGeyser = [];
	const grandma = [];
	const turtle = [];
	const aurora = [];
	const dreamsSkater = [];
	const passage = [];
	const projectorOfMemories = [];

	// 5 minutes is the least common denominator.
	for (let start = date; start < tomorrow; start = start.plus({ minutes: 5 })) {
		const timeString = `<t:${start.toUnixInteger()}:t>`;
		const { minute, hour, weekday } = start;
		const minutesSince = hour * 60 + minute;

		if (minute % 15 === 0) {
			passage.push(timeString);
		}

		if (hour % 2 === 0) {
			if (minute === 5) {
				pollutedGeyser.push(timeString);
			}

			if (minute === 35) {
				grandma.push(timeString);
			}

			if (minute === 50) {
				turtle.push(timeString);
			}
		} else {
			let dreamsSkaterDate = start;

			if (weekday !== 5 && weekday !== 6 && weekday !== 7) {
				dreamsSkaterDate = start.plus({ days: 5 - start.weekday });
			}

			if (dreamsSkaterDate.minute === 0) {
				dreamsSkater.push(`<t:${dreamsSkaterDate.toUnixInteger()}:t>`);
			}
		}

		if (minute === 0 && hour % 2 === 0) {
			aurora.push(timeString);
		}

		if (minutesSince % 80 === 0) {
			projectorOfMemories.push(timeString);
		}
	}

	return { pollutedGeyser, grandma, turtle, aurora, dreamsSkater, passage, projectorOfMemories };
}

function aviarysFireworkFestivalTime(date: DateTime) {
	const startOfMonth = date.plus({ month: 1 }).startOf("month");
	const dayAfterStartOfMonth = startOfMonth.plus({ day: 1 });
	const times = [];

	for (let start = startOfMonth; start < dayAfterStartOfMonth; start = start.plus({ hours: 4 })) {
		times.push(`<t:${start.toUnixInteger()}:t>`);
	}

	return times;
}

function deer(locale: Locale) {
	const date = new Date();
	date.setUTCMinutes(date.getUTCMinutes() >= 30 ? 30 : 0);
	date.setUTCSeconds(0);
	date.setUTCMilliseconds(0);
	const unix = date.getTime() / 1_000;

	return [
		{
			text: t("schedule.deer-0", { lng: locale, ns: "commands" }),
			time: `<t:${unix}:t>`,
		},
		{
			text: t("schedule.deer-120", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 120}:t>`,
		},
		{
			text: t("schedule.deer-600", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 600}:t>`,
		},
		{
			text: t("schedule.deer-720", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 720}:t>`,
		},
		{
			text: t("schedule.deer-1200", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 1_200}:t>`,
		},
		{
			text: t("schedule.deer-1800", { lng: locale, ns: "commands" }),
			time: `<t:${unix + 1_800}:t>`,
		},
	];
}

export async function schedule(interaction: APIChatInputApplicationCommandInteraction) {
	const { locale } = interaction;
	const now = skyNow();
	const startOfDay = now.startOf("day");

	const { pollutedGeyser, grandma, turtle, passage, aurora, dreamsSkater, projectorOfMemories } =
		scheduleTimes(startOfDay);

	const passageTimesStart = passage.slice(0, PASSAGE_TRUNCATION_LIMIT);
	const passageTimesEnd = passage.slice(-PASSAGE_TRUNCATION_LIMIT);

	const passageTimesString = `${passageTimesStart.join(" ")}${t("schedule.every-15-minutes", {
		lng: locale,
		ns: "commands",
	})} ${passageTimesEnd.join(" ")}`;

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `## ${t("schedule.schedule-today", { lng: locale, ns: "commands" })}`,
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: [
							`### ${t(`notification-types.${NotificationType.DailyReset}`, { lng: locale, ns: "general" })}\n<t:${dailyResetTime(startOfDay)}:t> (<t:${dailyResetTime(startOfDay)}:R>)`,
							`### ${t(`notification-types.${NotificationType.InternationalSpaceStation}`, { lng: locale, ns: "general" })}\n${INTERNATIONAL_SPACE_STATION_DATES.filter(
								(issDateAccessible) => issDateAccessible <= now.daysInMonth!,
							)
								.map((issDateAccessible) => {
									const issDateUnix = startOfDay.set({ day: issDateAccessible }).toUnixInteger();
									return `<t:${issDateUnix}:d> (<t:${issDateUnix}:R>)`;
								})
								.join("\n")}`,
							`### ${t(`notification-types.${NotificationType.EyeOfEden}`, { lng: locale, ns: "general" })}\n<t:${eyeOfEdenResetTime(startOfDay)}:t> (<t:${eyeOfEdenResetTime(startOfDay)}:R>)`,
							`### ${t("schedule.travelling-spirit", { lng: locale, ns: "commands" })}\n${travellingSpiritTime(now, locale)}`,
							`### ${t(`notification-types.${NotificationType.PollutedGeyser}`, { lng: locale, ns: "general" })}\n${pollutedGeyser.join(" ")}`,
							`### ${t(`notification-types.${NotificationType.Grandma}`, { lng: locale, ns: "general" })}\n${grandma.join(" ")}`,
							`### ${t(`notification-types.${NotificationType.Turtle}`, { lng: locale, ns: "general" })}\n${turtle.join(" ")}`,
							`### ${t(`notification-types.${NotificationType.AURORA}`, { lng: locale, ns: "general" })}\n${aurora.join(" ")}`,
							`### ${t(`notification-types.${NotificationType.DreamsSkater}`, { lng: locale, ns: "general" })}\n_${t("schedule.dreams-skater-days", { lng: locale, ns: "commands" })}_\n${dreamsSkater.join(" ")}`,
							`### ${t(`notification-types.${NotificationType.Passage}`, { lng: locale, ns: "general" })}\n${passageTimesString}`,
							`### ${t(`notification-types.${NotificationType.AviarysFireworkFestival}`, { lng: locale, ns: "general" })}\n_${t("schedule.first-of-month", { lng: locale, ns: "commands" })}_\n${aviarysFireworkFestivalTime(startOfDay).join(" ")}`,
							`### Deer\n${deer(locale)
								.map(({ text, time }, index) => `${index + 1}. ${time} _(${text})_`)
								.join("\n")}`,
							`### ${t(`cosmetic-names.${Cosmetic.ProjectorOfMemories}`, { lng: locale, ns: "general" })}\n\n${projectorOfMemories.join(" ")}`,
						].join("\n"),
					},
					{
						type: ComponentType.Separator,
						divider: true,
						spacing: SeparatorSpacingSize.Small,
					},
					{
						type: ComponentType.TextDisplay,
						content: `-# ${t("schedule.times-are-relative", { lng: locale, ns: "commands" })}`,
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	});
}
