import type { ManipulateType } from "dayjs";
import {
	type ApplicationCommandData,
	type ChatInputCommandInteraction,
	ApplicationCommandType,
	EmbedBuilder,
	time,
	TimestampStyles,
} from "discord.js";
import DailyGuidesDistribution from "../../Structures/DailyGuidesDistribution.js";
import { NotificationEvent } from "../../Structures/Notification.js";
import { todayDate } from "../../Utility/Utility.js";
import type { ChatInputCommand } from "../index.js";

function dailyResetTime() {
	return todayDate().add(1, "day").unix();
}

function eyeOfEdenResetTime() {
	return todayDate().day(7).unix();
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

export default class implements ChatInputCommand {
	public readonly name = "schedule";

	public readonly type = ApplicationCommandType.ChatInput;

	public async chatInput(interaction: ChatInputCommandInteraction) {
		const passageTimes = scheduleTimes(0, 15, "minutes");
		const passageTimesStart = passageTimes.slice(0, 18);
		const passageTimesEnd = passageTimes.slice(-18);
		const passageTimesString = `${passageTimesStart.join(" ")}... every 15 minutes... ${passageTimesEnd.join(" ")}`;

		const embed = new EmbedBuilder()
			.setColor((await interaction.guild?.members.fetchMe())?.displayColor ?? 0)
			.setFields(
				{
					name: NotificationEvent.DailyReset,
					value: `${time(dailyResetTime(), TimestampStyles.ShortTime)} (${time(
						dailyResetTime(),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{
					name: NotificationEvent.EyeOfEden,
					value: `${time(eyeOfEdenResetTime(), TimestampStyles.ShortTime)} (${time(
						eyeOfEdenResetTime(),
						TimestampStyles.RelativeTime,
					)})`,
				},
				{ name: NotificationEvent.PollutedGeyser, value: scheduleTimes(5, 2, "hours").join(" ") },
				{ name: NotificationEvent.Grandma, value: scheduleTimes(35, 2, "hours").join(" ") },
				{ name: NotificationEvent.Turtle, value: scheduleTimes(50, 2, "hours").join(" ") },
				{ name: NotificationEvent.AURORA, value: scheduleTimes(0, 4, "hours").join(" ") },
				{ name: NotificationEvent.Passage, value: passageTimesString },
			)
			.setFooter({ text: "Times are relative to your time zone." })
			.setTitle("Schedule Today");

		const shardEruptionFieldData = DailyGuidesDistribution.shardEruptionFieldData(interaction);
		embed.addFields(...shardEruptionFieldData);
		await interaction.reply({ embeds: [embed], ephemeral: true });
	}

	public get commandData(): ApplicationCommandData {
		return {
			name: this.name,
			description: "Returns a schedule of events in Sky!",
			type: this.type,
			dmPermission: false,
		};
	}
}
