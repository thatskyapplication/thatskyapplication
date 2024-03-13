import {
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	Locale,
	MessageFlags,
	PermissionFlagsBits,
	time,
	TimestampStyles,
} from "discord.js";
import { t } from "i18next";
import type { DateTime } from "luxon";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import { NotificationEvent } from "../../Structures/Notification.js";
import { DEFAULT_EMBED_COLOUR, ISS_DATES_ACCESSIBLE, LOCALES } from "../../Utility/Constants.js";
import { INITIAL_TRAVELLING_SPIRIT_SEEK, todayDate } from "../../Utility/dates.js";
import { cannotUsePermissions } from "../../Utility/permissionChecks.js";
import type { ChatInputCommand } from "../index.js";

const PASSAGE_TRUNCATION_LIMIT = 9 as const;

function dailyResetTime(date: DateTime) {
	return date.plus({ day: 1 }).toUnixInteger();
}

function eyeOfEdenResetTime(date: DateTime) {
	return date.set({ weekday: 7 }).toUnixInteger();
}

function travellingSpiritTime(date: DateTime, locale: Locale) {
	for (let start = INITIAL_TRAVELLING_SPIRIT_SEEK; ; start = start.plus({ week: 2 })) {
		if (start < date && start.plus({ day: 3 }) < date) continue;

		if (start.equals(date) || start < date || start.plus({ day: 3 }) < date) {
			return t("schedule.travelling-spirit-today", { lng: locale, ns: "commands" });
		} else {
			const startUnix = start.toUnixInteger();

			return `${t("schedule.travelling-spirit-none", { lng: locale, ns: "commands" })}\n_${t(
				"schedule.travelling-spirit-next-visit",
				{ lng: locale, ns: "commands" },
			)} ${time(startUnix, TimestampStyles.ShortDate)} (${time(startUnix, TimestampStyles.RelativeTime)})_`;
		}
	}
}

function scheduleTimes(date: DateTime) {
	const tomorrow = date.plus({ days: 1 });
	const pollutedGeyser = [];
	const grandma = [];
	const turtle = [];
	const aurora = [];
	const passage = [];

	// 5 minutes is the least common denominator.
	for (let start = date; start < tomorrow; start = start.plus({ minutes: 5 })) {
		const timeString = time(start.toUnixInteger(), TimestampStyles.ShortTime);
		const { minute, hour } = start;
		if (minute % 15 === 0) passage.push(timeString);

		if (hour % 2 === 0) {
			if (minute === 5) pollutedGeyser.push(timeString);
			if (minute === 35) grandma.push(timeString);
			if (minute === 50) turtle.push(timeString);
		}

		if (minute === 0 && (hour + 2) % 4 === 0) aurora.push(timeString);
	}

	return { pollutedGeyser, grandma, turtle, aurora, passage };
}

function aviarysFireworkFestivalTime(date: DateTime) {
	const startOfMonth = date.plus({ month: 1 }).startOf("month");
	const dayAfterStartOfMonth = startOfMonth.plus({ day: 1 });
	const times = [];

	for (let start = startOfMonth; start < dayAfterStartOfMonth; start = start.plus({ hours: 4 })) {
		times.push(time(start.toUnixInteger(), TimestampStyles.ShortTime));
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
		{ text: t("schedule.deer-0", { lng: locale, ns: "commands" }), time: time(unix, TimestampStyles.ShortTime) },
		{
			text: t("schedule.deer-120", { lng: locale, ns: "commands" }),
			time: time(unix + 120, TimestampStyles.ShortTime),
		},
		{
			text: t("schedule.deer-600", { lng: locale, ns: "commands" }),
			time: time(unix + 600, TimestampStyles.ShortTime),
		},
		{
			text: t("schedule.deer-720", { lng: locale, ns: "commands" }),
			time: time(unix + 720, TimestampStyles.ShortTime),
		},
		{
			text: t("schedule.deer-1200", { lng: locale, ns: "commands" }),
			time: time(unix + 1_200, TimestampStyles.ShortTime),
		},
		{
			text: t("schedule.deer-1800", { lng: locale, ns: "commands" }),
			time: time(unix + 1_800, TimestampStyles.ShortTime),
		},
	];
}

export default new (class implements ChatInputCommand {
	public get data() {
		return {
			name: t("schedule.command-name", { lng: Locale.EnglishGB, ns: "commands" }),
			nameLocalizations: Object.fromEntries(
				LOCALES.map((locale) => [locale, t("schedule.command-name", { lng: locale, ns: "commands" })]),
			),
			description: t("schedule.command-description", { lng: Locale.EnglishGB, ns: "commands" }),
			descriptionLocalizations: Object.fromEntries(
				LOCALES.map((locale) => [locale, t("schedule.command-description", { lng: locale, ns: "commands" })]),
			),
			type: ApplicationCommandType.ChatInput,
		};
	}

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { locale } = interaction;
		const today = todayDate();
		const { pollutedGeyser, grandma, turtle, passage, aurora } = scheduleTimes(today);
		const passageTimesStart = passage.slice(0, PASSAGE_TRUNCATION_LIMIT);
		const passageTimesEnd = passage.slice(-PASSAGE_TRUNCATION_LIMIT);

		const passageTimesString = `${passageTimesStart.join(" ")}${t("schedule.every-15-minutes", {
			lng: locale,
			ns: "commands",
		})} ${passageTimesEnd.join(" ")}`;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setFields(
				{
					name: t(`notificationEvent.${NotificationEvent.DailyReset}`, { lng: locale, ns: "general" }),
					value: `${time(dailyResetTime(today), TimestampStyles.ShortTime)} (${time(
						dailyResetTime(today),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{
					name: t(`notificationEvent.${NotificationEvent.ISS}`, { lng: locale, ns: "general" }),
					value: ISS_DATES_ACCESSIBLE.filter((issDateAccessible) => issDateAccessible <= today.daysInMonth!)
						.map((issDateAccessible) => {
							const issDateUnix = today.set({ day: issDateAccessible }).toUnixInteger();

							return `${time(issDateUnix, TimestampStyles.ShortDate)} (${time(
								issDateUnix,
								TimestampStyles.RelativeTime,
							)})`;
						})
						.join("\n"),
				},
				{
					name: t(`notificationEvent.${NotificationEvent.EyeOfEden}`, { lng: locale, ns: "general" }),
					value: `${time(eyeOfEdenResetTime(today), TimestampStyles.ShortTime)} (${time(
						eyeOfEdenResetTime(today),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{
					name: t("schedule.travelling-spirit", { lng: locale, ns: "commands" }),
					value: travellingSpiritTime(today, locale),
				},
				{
					name: t(`notificationEvent.${NotificationEvent.PollutedGeyser}`, { lng: locale, ns: "general" }),
					value: pollutedGeyser.join(" "),
				},
				{
					name: t(`notificationEvent.${NotificationEvent.Grandma}`, { lng: locale, ns: "general" }),
					value: grandma.join(" "),
				},
				{
					name: t(`notificationEvent.${NotificationEvent.Turtle}`, { lng: locale, ns: "general" }),
					value: turtle.join(" "),
				},
				{
					name: t(`notificationEvent.${NotificationEvent.AURORA}`, { lng: locale, ns: "general" }),
					value: aurora.join(" "),
				},
				{
					name: t(`notificationEvent.${NotificationEvent.Passage}`, { lng: locale, ns: "general" }),
					value: passageTimesString,
				},
				{
					name: t(`notificationEvent.${NotificationEvent.AviarysFireworkFestival}`, { lng: locale, ns: "general" }),
					value: `${t("schedule.first-of-month", { lng: locale, ns: "commands" })}\n${aviarysFireworkFestivalTime(
						today,
					).join(" ")}`,
				},
				{
					name: "Deer",
					value: `${deer(locale)
						.map(({ text, time }, index) => `${index + 1}. ${time} _(${text})_`)
						.join("\n")}`,
				},
			)
			.setFooter({ text: t("schedule.times-are-relative", { lng: locale, ns: "commands" }) })
			.setTitle(t("schedule.schedule-today", { lng: locale, ns: "commands" }));

		const eventData = DailyGuidesDistribution.eventData(today, locale);
		if (eventData.eventCurrency) embed.addFields(eventData.eventCurrency);
		const shardEruptionFieldData = DailyGuidesDistribution.shardEruptionFieldData(locale);

		if (
			shardEruptionFieldData.length === 2 &&
			(await cannotUsePermissions(interaction, PermissionFlagsBits.UseExternalEmojis))
		) {
			return;
		}

		embed.addFields(shardEruptionFieldData);
		await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	}
})();
