import { setInterval } from "node:timers";
import type { Client } from "discord.js";
import { DateTime } from "luxon";
import { ISS_DATES_ACCESSIBLE } from "../Utility/Constants.js";
import { TIME_ZONE } from "../Utility/dates.js";
import { EventName } from "../Utility/events.js";
import { shardEruption } from "../Utility/shardEruption.js";
import { resolveEvents } from "../catalogue/events/index.js";
import pQueue from "../pQueue.js";
import pino from "../pino.js";
import DailyGuides from "./DailyGuides.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import Notification, { NotificationEvent, type NotificationSendExtra } from "./Notification.js";

let shardEruptionToday = shardEruption();

async function sendNotification(client: Client<true>, type: NotificationEvent, extra?: NotificationSendExtra) {
	const settled = await Promise.allSettled(
		Notification.cache.map(async (notification) => pQueue.add(async () => notification.send(client, type, extra))),
	);

	const errors = settled
		.filter((result): result is PromiseRejectedResult => result.status === "rejected")
		.map((result) => result.reason);

	if (errors.length > 0) pino.error(errors, "Error whilst sending notifications.");
}

async function dailyReset(client: Client<true>) {
	void sendNotification(client, NotificationEvent.DailyReset);
	await DailyGuides.reset();
	await DailyGuidesDistribution.reset();
	await DailyGuidesDistribution.distribute(client);
	shardEruptionToday = shardEruption();
}

export default function heartbeat(client: Client<true>): void {
	setInterval(() => {
		const date = DateTime.now().setZone(TIME_ZONE);
		const { day, weekday, hour, minute, second } = date;
		const unix = date.toUnixInteger();
		const events = resolveEvents(date);

		if (second === 0) {
			if (hour === 0 && minute === 0) {
				void dailyReset(client);
				if (weekday === 7) void sendNotification(client, NotificationEvent.EyeOfEden);
				// @ts-expect-error Too narrow.
				if (ISS_DATES_ACCESSIBLE.includes(day)) void sendNotification(client, NotificationEvent.ISS);
			}

			if (shardEruptionToday) {
				const { strong, timestamps } = shardEruptionToday;
				const timestamp = timestamps.find(({ start }) => Math.trunc(start.diff(date, "minutes").minutes) === 5);

				if (timestamp) {
					void sendNotification(
						client,
						strong ? NotificationEvent.StrongShardEruption : NotificationEvent.RegularShardEruption,
						{
							startTime: timestamp.start.toUnixInteger(),
							endTime: timestamp.end.toUnixInteger(),
							shardEruption: shardEruptionToday,
						},
					);
				}
			}

			if ((minute + 5) % 15 === 0) void sendNotification(client, NotificationEvent.Passage, { startTime: unix + 300 });

			if ((hour + 3) % 4 === 0 && minute === 45) {
				void sendNotification(client, NotificationEvent.AURORA, { startTime: unix + 900 });
			}

			if (hour % 2 === 0) {
				switch (minute) {
					case 0:
						void sendNotification(client, NotificationEvent.PollutedGeyser, { startTime: unix + 300 });
						break;
					case 30:
						void sendNotification(client, NotificationEvent.Grandma, { startTime: unix + 300 });
						break;
					case 45:
						void sendNotification(client, NotificationEvent.Turtle, { startTime: unix + 300 });
						break;
				}
			}

			if (day === 1 && hour % 4 === 0 && minute === 0) {
				void sendNotification(client, NotificationEvent.AviarysFireworkFestival, { startTime: unix + 600 });
			}

			if (minute === 55 && events.some(({ name }) => name === EventName.DaysOfFortune)) {
				void sendNotification(client, NotificationEvent.Dragon, { startTime: unix + 300 });
			}
		}
	}, 1_000);
}
