import {
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import { DateTime } from "luxon";
import DailyGuidesDistribution, { SHARD_ERUPTION_NONE } from "../../Structures/DailyGuidesDistribution.js";
import { NotificationEvent } from "../../Structures/Notification.js";
import { ISS_DATES_ACCESSIBLE, INITIAL_TRAVELLING_SPIRIT_SEEK, DEFAULT_EMBED_COLOUR } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis, todayDate } from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

const PASSAGE_TRUNCATION_LIMIT = 9 as const;

function dailyResetTime() {
	return todayDate().add(1, "day").unix();
}

function eyeOfEdenResetTime() {
	return todayDate().day(7).unix();
}

function travellingSpiritTime() {
	const today = todayDate();

	for (let start = INITIAL_TRAVELLING_SPIRIT_SEEK; ; start = start.add(2, "weeks")) {
		if (start.isBefore(today) && start.add(3, "days").isBefore(today)) continue;

		if (start.isSame(today) || start.isBefore(today) || start.add(3, "days").isBefore(today)) {
			return "Today!";
		} else {
			const startUnix = start.unix();

			return `None\n_Next visit at ${time(startUnix, TimestampStyles.ShortDate)} (${time(
				startUnix,
				TimestampStyles.RelativeTime,
			)})_`;
		}
	}
}

function scheduleTimes() {
	const today = DateTime.now().setZone("America/Los_Angeles").startOf("day");
	const tomorrow = today.plus({ days: 1 });
	const pollutedGeyser = [];
	const grandma = [];
	const turtle = [];
	const aurora = [];
	const passage = [];

	// 5 minutes is the least common denominator.
	for (let start = today; start < tomorrow; start = start.plus({ minutes: 5 })) {
		const timeString = time(start.toUnixInteger(), TimestampStyles.ShortTime);
		passage.push(timeString);

		if (start.hour % 2 === 0) {
			if (start.minute === 5) pollutedGeyser.push(timeString);
			if (start.minute === 35) grandma.push(timeString);
			if (start.minute === 50) turtle.push(timeString);
		}

		if (start.minute === 0 && (start.hour + 2) % 4 === 0) aurora.push(timeString);
	}

	return { pollutedGeyser, grandma, turtle, aurora, passage };
}

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "schedule",
		description: "Returns a schedule of events in Sky!",
		type: ApplicationCommandType.ChatInput,
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const { pollutedGeyser, grandma, turtle, passage, aurora } = scheduleTimes();
		const passageTimesStart = passage.slice(0, PASSAGE_TRUNCATION_LIMIT);
		const passageTimesEnd = passage.slice(-PASSAGE_TRUNCATION_LIMIT);
		const passageTimesString = `${passageTimesStart.join(" ")}... every 15 minutes... ${passageTimesEnd.join(" ")}`;

		const embed = new EmbedBuilder()
			.setColor(DEFAULT_EMBED_COLOUR)
			.setFields(
				{
					name: NotificationEvent.DailyReset,
					value: `${time(dailyResetTime(), TimestampStyles.ShortTime)} (${time(
						dailyResetTime(),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{
					name: NotificationEvent.ISS,
					value: ISS_DATES_ACCESSIBLE.filter((issDateAccessible) => issDateAccessible <= todayDate().daysInMonth())
						.map((issDateAccessible) => {
							const issDateUnix = todayDate().date(issDateAccessible).unix();

							return `${time(issDateUnix, TimestampStyles.ShortDate)} (${time(
								issDateUnix,
								TimestampStyles.RelativeTime,
							)})`;
						})
						.join("\n"),
				},
				{
					name: NotificationEvent.EyeOfEden,
					value: `${time(eyeOfEdenResetTime(), TimestampStyles.ShortTime)} (${time(
						eyeOfEdenResetTime(),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{ name: "Travelling Spirit", value: travellingSpiritTime() },
				{ name: NotificationEvent.PollutedGeyser, value: pollutedGeyser.join(" ") },
				{ name: NotificationEvent.Grandma, value: grandma.join(" ") },
				{ name: NotificationEvent.Turtle, value: turtle.join(" ") },
				{
					name: NotificationEvent.AURORA,
					value: aurora.join(" "),
				},
				{ name: NotificationEvent.Passage, value: passageTimesString },
			)
			.setFooter({ text: "Times are relative to your time zone." })
			.setTitle("Schedule Today");

		const eventCurrencyFieldData = DailyGuidesDistribution.eventCurrencyFieldData();
		if (eventCurrencyFieldData) embed.addFields(eventCurrencyFieldData);
		const shardEruptionFieldData = DailyGuidesDistribution.shardEruptionFieldData();

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
