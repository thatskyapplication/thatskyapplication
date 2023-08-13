import type { ManipulateType } from "dayjs";
import {
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import DailyGuidesDistribution, { SHARD_ERUPTION_NONE } from "../../Structures/DailyGuidesDistribution.js";
import { NotificationEvent } from "../../Structures/Notification.js";
import { ISS_DATES_ACCESSIBLE, initialTravellingSpiritSeek } from "../../Utility/Constants.js";
import { cannotUseCustomEmojis, resolveEmbedColor, todayDate } from "../../Utility/Utility.js";
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

	for (let start = initialTravellingSpiritSeek; ; start = start.add(2, "weeks")) {
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

function scheduleTimes(startingMinute: number, interval: number, intervalType: ManipulateType) {
	const today = todayDate();
	const tomorrow = today.add(1, "day");
	const output = [];

	for (let start = today.minute(startingMinute); start < tomorrow; start = start.add(interval, intervalType)) {
		output.push(time(start.unix(), TimestampStyles.ShortTime));
	}

	return output;
}

export default new (class implements ChatInputCommand {
	public readonly data = {
		name: "schedule",
		description: "Returns a schedule of events in Sky!",
		type: ApplicationCommandType.ChatInput,
	} as const;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const passageTimes = scheduleTimes(0, 15, "minutes");
		const passageTimesStart = passageTimes.slice(0, PASSAGE_TRUNCATION_LIMIT);
		const passageTimesEnd = passageTimes.slice(-PASSAGE_TRUNCATION_LIMIT);
		const passageTimesString = `${passageTimesStart.join(" ")}... every 15 minutes... ${passageTimesEnd.join(" ")}`;

		const embed = new EmbedBuilder()
			.setColor(await resolveEmbedColor(interaction.guild))
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
				{ name: NotificationEvent.PollutedGeyser, value: scheduleTimes(5, 2, "hours").join(" ") },
				{ name: NotificationEvent.Grandma, value: scheduleTimes(35, 2, "hours").join(" ") },
				{ name: NotificationEvent.Turtle, value: scheduleTimes(50, 2, "hours").join(" ") },
				{ name: NotificationEvent.AURORA, value: scheduleTimes(0, 4, "hours").join(" ") },
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
