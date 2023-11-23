import {
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import type { DateTime } from "luxon";
import DailyGuidesDistribution, { SHARD_ERUPTION_NONE } from "../../Structures/DailyGuidesDistribution.js";
import { NotificationEvent } from "../../Structures/Notification.js";
import { DEFAULT_EMBED_COLOUR, ISS_DATES_ACCESSIBLE } from "../../Utility/Constants.js";
import {
	AVIARY_FIREWORK_FESTIVAL_FIRST_SHOW_START_DATE,
	AVIARY_FIREWORK_FESTIVAL_LAST_SHOW_END_DATE,
	INITIAL_TRAVELLING_SPIRIT_SEEK,
	isDuring,
	todayDate,
} from "../../Utility/dates.js";
import { cannotUseCustomEmojis } from "../../Utility/emojis.js";
import type { ChatInputCommand } from "../index.js";

const PASSAGE_TRUNCATION_LIMIT = 9 as const;

function dailyResetTime(date: DateTime) {
	return date.plus({ day: 1 }).toUnixInteger();
}

function eyeOfEdenResetTime(date: DateTime) {
	return date.set({ weekday: 7 }).toUnixInteger();
}

function travellingSpiritTime(date: DateTime) {
	for (let start = INITIAL_TRAVELLING_SPIRIT_SEEK; ; start = start.plus({ week: 2 })) {
		if (start < date && start.plus({ day: 3 }) < date) continue;

		if (start.equals(date) || start < date || start.plus({ day: 3 }) < date) {
			return "Today!";
		} else {
			const startUnix = start.toUnixInteger();

			return `None\n_Next visit at ${time(startUnix, TimestampStyles.ShortDate)} (${time(
				startUnix,
				TimestampStyles.RelativeTime,
			)})_`;
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
	const aviarysFireworkFestival = [];

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

		if (minute === 0) {
			if (hour % 4 === 0) aviarysFireworkFestival.push(timeString);
			if ((hour + 2) % 4 === 0) aurora.push(timeString);
		}
	}

	return { pollutedGeyser, grandma, turtle, aurora, passage, aviarysFireworkFestival };
}

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "schedule",
		description: "Returns a schedule of events in Sky!",
		type: ApplicationCommandType.ChatInput,
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const today = todayDate();
		const { pollutedGeyser, grandma, turtle, passage, aurora, aviarysFireworkFestival } = scheduleTimes(today);
		const passageTimesStart = passage.slice(0, PASSAGE_TRUNCATION_LIMIT);
		const passageTimesEnd = passage.slice(-PASSAGE_TRUNCATION_LIMIT);
		const passageTimesString = `${passageTimesStart.join(" ")}... every 15 minutes... ${passageTimesEnd.join(" ")}`;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setFields(
				{
					name: NotificationEvent.DailyReset,
					value: `${time(dailyResetTime(today), TimestampStyles.ShortTime)} (${time(
						dailyResetTime(today),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{
					name: NotificationEvent.ISS,
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
					name: NotificationEvent.EyeOfEden,
					value: `${time(eyeOfEdenResetTime(today), TimestampStyles.ShortTime)} (${time(
						eyeOfEdenResetTime(today),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{ name: "Travelling Spirit", value: travellingSpiritTime(today) },
				{ name: NotificationEvent.PollutedGeyser, value: pollutedGeyser.join(" ") },
				{ name: NotificationEvent.Grandma, value: grandma.join(" ") },
				{ name: NotificationEvent.Turtle, value: turtle.join(" ") },
				{ name: NotificationEvent.AURORA, value: aurora.join(" ") },
				{ name: NotificationEvent.Passage, value: passageTimesString },
			)
			.setFooter({ text: "Times are relative to your time zone." })
			.setTitle("Schedule Today");

		const eventCurrencyFieldData = DailyGuidesDistribution.eventCurrencyFieldData(today);
		if (eventCurrencyFieldData) embed.addFields(eventCurrencyFieldData);
		const shardEruptionFieldData = DailyGuidesDistribution.shardEruptionFieldData();

		if (isDuring(AVIARY_FIREWORK_FESTIVAL_FIRST_SHOW_START_DATE, AVIARY_FIREWORK_FESTIVAL_LAST_SHOW_END_DATE, today)) {
			embed.addFields({ name: NotificationEvent.AviarysFireworkFestival, value: aviarysFireworkFestival.join(" ") });
		}

		if (
			shardEruptionFieldData[0] &&
			shardEruptionFieldData[0].value !== SHARD_ERUPTION_NONE &&
			(await cannotUseCustomEmojis(interaction))
		) {
			return;
		}

		embed.addFields(shardEruptionFieldData);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	}
})();
