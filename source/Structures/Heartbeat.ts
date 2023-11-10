import { setInterval } from "node:timers";
import type { Client } from "discord.js";
import { DateTime } from "luxon";
import { ISS_DATES_ACCESSIBLE } from "../Utility/Constants.js";
import { shardEruption } from "../Utility/Utility.js";
import { TIME_ZONE } from "../Utility/dates.js";
import pQueue from "../pQueue.js";
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

	if (errors.length > 0) void client.log({ content: "Error whilst sending notifications.", error: errors });
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

		if (second === 0) {
			if (hour === 0 && minute === 0) {
				void dailyReset(client);
				if (weekday === 7) void sendNotification(client, NotificationEvent.EyeOfEden);
				// @ts-expect-error Too narrow.
				if (ISS_DATES_ACCESSIBLE.includes(day)) void sendNotification(client, NotificationEvent.ISS);
			}

			if (shardEruptionToday) {
				const { strong, timestamps } = shardEruptionToday;

				if (timestamps.some(({ start }) => Math.trunc(start.diff(date, "minutes").minutes) === 5)) {
					void sendNotification(
						client,
						strong ? NotificationEvent.StrongShardEruption : NotificationEvent.RegularShardEruption,
						{ startTime: unix + 300, shardEruption: shardEruptionToday },
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
		}
	}, 1_000);
}
