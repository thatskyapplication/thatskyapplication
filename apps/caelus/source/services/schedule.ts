import {
	type APIChatInputApplicationCommandInteraction,
	type APIEmbed,
	type APIEmbedField,
	type Locale,
	MessageFlags,
} from "@discordjs/core";
import {
	INTERNATIONAL_SPACE_STATION_DATES,
	NotificationType,
	TRAVELLING_DATES,
	skyNow,
} from "@thatskyapplication/utility";
import { t } from "i18next";
import type { DateTime } from "luxon";
import { client } from "../discord.js";
import { DEFAULT_EMBED_COLOUR, PASSAGE_TRUNCATION_LIMIT } from "../utility/constants.js";
import { dailyGuidesEventData, dailyGuidesShardEruptionData } from "./daily-guides.js";

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

	// 5 minutes is the least common denominator.
	for (let start = date; start < tomorrow; start = start.plus({ minutes: 5 })) {
		const timeString = `<t:${start.toUnixInteger()}:t>`;
		const { minute, hour } = start;

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
		} else if (minute === 0) {
			dreamsSkater.push(timeString);
		}

		if (minute === 0 && hour % 2 === 0) {
			aurora.push(timeString);
		}
	}

	return { pollutedGeyser, grandma, turtle, aurora, dreamsSkater, passage };
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
	const { pollutedGeyser, grandma, turtle, passage, aurora, dreamsSkater } =
		scheduleTimes(startOfDay);
	const passageTimesStart = passage.slice(0, PASSAGE_TRUNCATION_LIMIT);
	const passageTimesEnd = passage.slice(-PASSAGE_TRUNCATION_LIMIT);

	const passageTimesString = `${passageTimesStart.join(" ")}${t("schedule.every-15-minutes", {
		lng: locale,
		ns: "commands",
	})} ${passageTimesEnd.join(" ")}`;

	const embed: APIEmbed = {
		color: DEFAULT_EMBED_COLOUR,
		footer: { text: t("schedule.times-are-relative", { lng: locale, ns: "commands" }) },
		title: t("schedule.schedule-today", { lng: locale, ns: "commands" }),
	};

	const fields: APIEmbedField[] = [
		{
			name: t(`notification-types.${NotificationType.DailyReset}`, {
				lng: locale,
				ns: "general",
			}),
			value: `<t:${dailyResetTime(startOfDay)}:t> (<t:${dailyResetTime(startOfDay)}:R>)`,
		},
		{
			name: t(`notification-types.${NotificationType.InternationalSpaceStation}`, {
				lng: locale,
				ns: "general",
			}),
			value: INTERNATIONAL_SPACE_STATION_DATES.filter(
				(issDateAccessible) => issDateAccessible <= now.daysInMonth!,
			)
				.map((issDateAccessible) => {
					const issDateUnix = startOfDay.set({ day: issDateAccessible }).toUnixInteger();
					return `<t:${issDateUnix}:d> (<t:${issDateUnix}:R>)`;
				})
				.join("\n"),
		},
		{
			name: t(`notification-types.${NotificationType.EyeOfEden}`, {
				lng: locale,
				ns: "general",
			}),
			value: `<t:${eyeOfEdenResetTime(startOfDay)}:t> (<t:${eyeOfEdenResetTime(startOfDay)}:R>)`,
		},
		{
			name: t("schedule.travelling-spirit", { lng: locale, ns: "commands" }),
			value: travellingSpiritTime(now, locale),
		},
		{
			name: t(`notification-types.${NotificationType.PollutedGeyser}`, {
				lng: locale,
				ns: "general",
			}),
			value: pollutedGeyser.join(" "),
		},
		{
			name: t(`notification-types.${NotificationType.Grandma}`, { lng: locale, ns: "general" }),
			value: grandma.join(" "),
		},
		{
			name: t(`notification-types.${NotificationType.Turtle}`, { lng: locale, ns: "general" }),
			value: turtle.join(" "),
		},
		{
			name: t(`notification-types.${NotificationType.AURORA}`, { lng: locale, ns: "general" }),
			value: aurora.join(" "),
		},
		{
			name: t(`notification-types.${NotificationType.DreamsSkater}`, {
				lng: locale,
				ns: "general",
			}),
			value: dreamsSkater.join(" "),
		},
		{
			name: t(`notification-types.${NotificationType.Passage}`, { lng: locale, ns: "general" }),
			value: passageTimesString,
		},
		{
			name: t(`notification-types.${NotificationType.AviarysFireworkFestival}`, {
				lng: locale,
				ns: "general",
			}),
			value: `${t("schedule.first-of-month", { lng: locale, ns: "commands" })}\n${aviarysFireworkFestivalTime(
				startOfDay,
			).join(" ")}`,
		},
		{
			name: "Deer",
			value: `${deer(locale)
				.map(({ text, time }, index) => `${index + 1}. ${time} _(${text})_`)
				.join("\n")}`,
		},
	];

	const eventData = dailyGuidesEventData(now, locale);

	if (eventData.eventTickets) {
		fields.push(eventData.eventTickets);
	}

	const shardEruptionData = dailyGuidesShardEruptionData(locale);
	fields.push(...shardEruptionData);
	embed.fields = fields;

	await client.api.interactions.reply(interaction.id, interaction.token, {
		embeds: [embed],
		flags: MessageFlags.Ephemeral,
	});
}
