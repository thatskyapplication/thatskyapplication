import { setInterval } from "node:timers";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import type { Client } from "discord.js";
import { ISS_DATES_ACCESSIBLE } from "../Utility/Constants.js";
import DailyGuides from "./DailyGuides.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import Notification, { NotificationEvent, type NotificationSendExtra } from "./Notification.js";

let shardEruptionToday = DailyGuides.shardEruption();

dayjs.extend(timezone);
dayjs.extend(utc);

function sendNotification(client: Client<true>, type: NotificationEvent, extra?: NotificationSendExtra) {
	for (const notification of Notification.cache.values()) void notification.send(client, type, extra);
}

async function dailyReset(client: Client<true>) {
	sendNotification(client, NotificationEvent.DailyReset);
	await DailyGuides.reset();
	await DailyGuidesDistribution.reset();
	await DailyGuidesDistribution.distribute(client);
	shardEruptionToday = DailyGuides.shardEruption();
}

export default function heartbeat(client: Client<true>): void {
	setInterval(() => {
		const dayjsDate = dayjs().tz("America/Los_Angeles");
		const unix = dayjsDate.unix();
		const date = dayjsDate.date();
		const day = dayjsDate.day();
		const hour = dayjsDate.hour();
		const minute = dayjsDate.minute();
		const second = dayjsDate.second();

		if (second === 0) {
			if (hour === 0 && minute === 0) {
				void dailyReset(client);
				if (day === 0) sendNotification(client, NotificationEvent.EyeOfEden);
				// @ts-expect-error Too narrow.
				if (ISS_DATES_ACCESSIBLE.includes(date)) sendNotification(client, NotificationEvent.ISS);
			}

			if (shardEruptionToday) {
				const { dangerous, timestamps } = shardEruptionToday;

				if (timestamps.some(({ start }) => start.diff(dayjsDate, "minutes") === 5)) {
					sendNotification(client, NotificationEvent.ShardEruption, {
						startTime: unix + 300,
						dangerousShardEruption: dangerous,
					});
				}
			}

			if ((minute + 5) % 15 === 0) sendNotification(client, NotificationEvent.Passage, { startTime: unix + 300 });

			if ((hour + 1) % 4 === 0 && minute === 45) {
				sendNotification(client, NotificationEvent.AURORA, { startTime: unix + 900 });
			}

			if (hour % 2 === 0) {
				switch (minute) {
					case 0:
						sendNotification(client, NotificationEvent.PollutedGeyser, { startTime: unix + 300 });
						break;
					case 30:
						sendNotification(client, NotificationEvent.Grandma, { startTime: unix + 300 });
						break;
					case 45:
						sendNotification(client, NotificationEvent.Turtle, { startTime: unix + 300 });
						break;
				}
			}
		}
	}, 1_000);
}
