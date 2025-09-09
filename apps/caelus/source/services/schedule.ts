import {
	type APIChatInputApplicationCommandInteraction,
	ButtonStyle,
	ComponentType,
	type Locale,
	MessageFlags,
	SeparatorSpacingSize,
} from "@discordjs/core";
import {
	Cosmetic,
	formatEmoji,
	INTERNATIONAL_SPACE_STATION_DATES,
	NotificationType,
	SpiritsHistoryOrderType,
	skyNow,
	TRAVELLING_DATES,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { client } from "../discord.js";
import { SPIRITS_HISTORY_NEXT_CUSTOM_ID } from "../features/spirits.js";
import {
	CAPE_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../utility/emojis.js";

function dailyResetTime(date: DateTime) {
	return date.plus({ day: 1 }).toUnixInteger();
}

function internationalSpaceStationOverview(date: DateTime) {
	const targetDay = INTERNATIONAL_SPACE_STATION_DATES.find(
		(internationalSpaceStationDates) => internationalSpaceStationDates > date.day,
	);

	const targetDate = targetDay
		? date.set({ day: targetDay })
		: date.plus({ month: 1 }).set({ day: INTERNATIONAL_SPACE_STATION_DATES[0] });

	return {
		now: INTERNATIONAL_SPACE_STATION_DATES.includes(
			date.day as (typeof INTERNATIONAL_SPACE_STATION_DATES)[number],
		),
		next: `<t:${targetDate.toUnixInteger()}:R>`,
	};
}

function internationalSpaceStationDates(date: DateTime) {
	const result = [];

	for (const internationalSpaceStationDate of INTERNATIONAL_SPACE_STATION_DATES) {
		if (internationalSpaceStationDate > date.daysInMonth!) {
			continue;
		}

		const issDateUnix = date.set({ day: internationalSpaceStationDate }).toUnixInteger();
		let string = `<t:${issDateUnix}:f> (<t:${issDateUnix}:R>)`;

		if (date.toUnixInteger() > issDateUnix) {
			string = `~~${string}~~`;
		}

		result.push(string);
	}

	return result;
}

function eyeOfEdenResetTime(date: DateTime) {
	return date.set({ weekday: 7 }).toUnixInteger();
}

function travellingSpiritOverview(now: DateTime, locale: Locale) {
	const travellingSpirit = TRAVELLING_DATES.findLast(({ start, end }) => now >= start && now < end);

	return {
		now: travellingSpirit
			? t(`spirits.${travellingSpirit.spiritId}`, { lng: locale, ns: "general" })
			: false as const,
		next: `<t:${TRAVELLING_DATES.last()!.start.plus({ weeks: 2 }).toUnixInteger()}:R>`,
	};
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

function pollutedGeyserOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 5 && minute < 15,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute <= 5 ? 5 - minute : 125 - minute) : 65 - minute }).toUnixInteger()}:R>`,
	};
}

function grandmaOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 35 && minute < 45,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute <= 35 ? 35 - minute : 155 - minute) : 95 - minute }).toUnixInteger()}:R>`,
	};
}

function turtleOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0 && minute >= 50 && minute < 60,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? (minute <= 50 ? 50 - minute : 170 - minute) : 110 - minute }).toUnixInteger()}:R>`,
	};
}

function auroraOverview(date: DateTime) {
	const { hour, minute } = date;

	return {
		now: hour % 2 === 0,
		next: `<t:${date.plus({ minutes: hour % 2 === 0 ? 120 - minute : 60 - minute }).toUnixInteger()}:R>`,
	};
}

function dreamsSkaterOverview(date: DateTime) {
	const { weekday, hour, minute } = date;

	const dreamsSkaterDate =
		weekday !== 5 && weekday !== 6 && weekday !== 7
			? date.plus({ days: 5 - weekday }).set({ hour: 1, minute: 0, second: 0, millisecond: 0 })
			: hour % 2 === 0
				? date.plus({ minutes: 60 - minute })
				: date.plus({ minutes: 120 - minute });

	return {
		now: (weekday === 5 || weekday === 6 || weekday === 7) && hour % 2 === 1 && minute < 15,
		next: `<t:${dreamsSkaterDate.toUnixInteger()}:R>`,
	};
}

function nextPassage(date: DateTime) {
	const { minute } = date;
	return `<t:${date.plus({ minutes: 15 - (minute % 15) }).toUnixInteger()}:R>`;
}

function aviarysFireworkFestivalOverview(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;

	return {
		now: date.day === 1 && hour % 4 === 0 && minute <= 10,
		next: `<t:${(
			date.day === 1
				? date.plus({ minutes: 240 - (minutesSince % 240) })
				: date.plus({ month: 1 }).startOf("month")
		).toUnixInteger()}:R>`,
	};
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

function deerOverview(date: DateTime) {
	const { minute } = date;

	return {
		now: minute < 20 || (minute >= 30 && minute < 50),
		next: `<t:${date.plus({ minutes: 30 - (minute % 30) }).toUnixInteger()}:R>`,
	};
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

function projectorOfMemoriesOverview(date: DateTime) {
	const { hour, minute } = date;
	const minutesSince = hour * 60 + minute;

	return {
		// Assume it lasts 70 minutes.
		now: minutesSince % 80 < 70,
		next: `<t:${date.plus({ minutes: 80 - (minutesSince % 80) }).toUnixInteger()}:R>`,
	};
}

export async function scheduleOverview(interaction: APIChatInputApplicationCommandInteraction) {
	const { locale } = interaction;
	const now = skyNow();
	const startOfDay = now.startOf("day");
	const internationalSpaceStation = internationalSpaceStationOverview(startOfDay);
	const travellingSpirit = travellingSpiritOverview(startOfDay, locale);
	const pollutedGeyser = pollutedGeyserOverview(now);
	const grandma = grandmaOverview(now);
	const turtle = turtleOverview(now);
	const aurora = auroraOverview(now);
	const dreamsSkater = dreamsSkaterOverview(now);
	const aviarysFireworkFestival = aviarysFireworkFestivalOverview(now);
	const deer = deerOverview(now);
	const projectorOfMemories = projectorOfMemoriesOverview(now);

	await client.api.interactions.reply(interaction.id, interaction.token, {
		components: [
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.DailyReset}`, { lng: locale, ns: "general" })}:** <t:${dailyResetTime(startOfDay)}:t> (<t:${dailyResetTime(startOfDay)}:R>)`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.EyeOfEden}`, { lng: locale, ns: "general" })}:** <t:${eyeOfEdenResetTime(startOfDay)}:f> (<t:${eyeOfEdenResetTime(startOfDay)}:R>)`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t("schedule.travelling-spirit", { lng: locale, ns: "commands" })}:** ${travellingSpirit.now ? `${travellingSpirit.now} ` : ""}Next available ${travellingSpirit.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.AviarysFireworkFestival}`, { lng: locale, ns: "general" })}:** ${aviarysFireworkFestival.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${aviarysFireworkFestival.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.InternationalSpaceStation}`, { lng: locale, ns: "general" })}:** ${internationalSpaceStation.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${internationalSpaceStation.next}`,
					},
				],
			},
			{
				type: ComponentType.Container,
				components: [
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.PollutedGeyser}`, { lng: locale, ns: "general" })}:** ${pollutedGeyser.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${pollutedGeyser.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.Grandma}`, { lng: locale, ns: "general" })}:** ${grandma.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${grandma.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.Turtle}`, { lng: locale, ns: "general" })}:** ${turtle.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${turtle.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.AURORA}`, { lng: locale, ns: "general" })}:** ${aurora.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${aurora.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.DreamsSkater}`, { lng: locale, ns: "general" })}:** ${dreamsSkater.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${dreamsSkater.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`notification-types.${NotificationType.Passage}`, { lng: locale, ns: "general" })}:** Next available ${nextPassage(now)}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**Nine-Coloured Deer:** ${deer.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${deer.next}`,
					},
					{
						type: ComponentType.TextDisplay,
						content: `**${t(`cosmetic-names.${Cosmetic.ProjectorOfMemories}`, { lng: locale, ns: "general" })}:** ${projectorOfMemories.now ? `${formatEmoji(MISCELLANEOUS_EMOJIS.Yes)} Available! ` : ""}Next available ${projectorOfMemories.next}`,
					},
				],
			},
		],
		flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2,
	});
}

// content: `### ${t(`notification-types.${NotificationType.InternationalSpaceStation}`, { lng: locale, ns: "general" })}\n\n-# Requires ${formatEmoji(CAPE_EMOJIS.Cape02)} or ${formatEmoji(CAPE_EMOJIS.Cape15)}\n${internationalSpaceStationDates(startOfDay).join("\n")}`,
// content: `### ${t(`notification-types.${NotificationType.PollutedGeyser}`, { lng: locale, ns: "general" })}\n\nEvery 2 hours from <t:${startOfDay.plus({ minutes: 5 }).toUnixInteger()}:t>.\nNext available ${nextPollutedGeyser(now)}`,
// content: `### ${t(`notification-types.${NotificationType.Grandma}`, { lng: locale, ns: "general" })}\n\nEvery 2 hours from <t:${startOfDay.plus({ minutes: 35 }).toUnixInteger()}:t>.\nNext available ${nextGrandma(now)}`,
// content: `### ${t(`notification-types.${NotificationType.Turtle}`, { lng: locale, ns: "general" })}\n\nEvery 2 hours from <t:${startOfDay.plus({ minutes: 50 }).toUnixInteger()}:t>.\nNext available ${nextTurtle(now)}`,
// content: `### ${t(`notification-types.${NotificationType.AURORA}`, { lng: locale, ns: "general" })}\n\nEvery 2 hours from <t:${startOfDay.toUnixInteger()}:t>.\nNext available ${nextAURORA(now)}`,
// content: `### ${t(`notification-types.${NotificationType.DreamsSkater}`, { lng: locale, ns: "general" })}\n\nOn Fridays, Saturdays, and Sundays every 2 hours from <t:${(weekday !== 5 && weekday !== 6 && weekday !== 7 ? startOfDay.plus({ days: 5 - weekday, hours: 1 }) : startOfDay.plus({ hours: 1 })).toUnixInteger()}:t>.\nNext available ${nextDreamsSkater(now)}`,
// content: `### ${t(`notification-types.${NotificationType.Passage}`, { lng: locale, ns: "general" })}\n\nEvery 15 minutes from <t:${startOfDay.toUnixInteger()}:t>.\nNext available ${nextPassage(now)}`,
// content: `### ${t(`notification-types.${NotificationType.AviarysFireworkFestival}`, { lng: locale, ns: "general" })}\n\nOn the 1st of every month every 4 hours from <t:${(startOfDay.day === 1 ? startOfDay : startOfDay.plus({ month: 1 }).startOf("month")).toUnixInteger()}:t>.\nNext available ${nextAviarysFireworkFestival(now)}`,
// content: `### Nine-Coloured Deer\n\n-# Requires ${formatEmoji(CAPE_EMOJIS.Cape125)}\nEvery 30 minutes from <t:${startOfDay.toUnixInteger()}:t>.\nNext available: ${nextDeer(now)}`,
// content: `### ${t(`cosmetic-names.${Cosmetic.ProjectorOfMemories}`, { lng: locale, ns: "general" })}\n\n-# Requires ${formatEmoji(SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp105)}\nEvery 80 minutes from <t:${startOfDay.toUnixInteger()}:t>.\nNext available:${nextProjectorOfMemories(now)}`,
