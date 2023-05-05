import { setInterval } from "node:timers";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import type { Client } from "discord.js";
import DailyGuides from "./DailyGuides.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import Notification, { NotificationEvent } from "./Notification.js";

dayjs.extend(timezone);
dayjs.extend(utc);

function sendNotification(client: Client<true>, type: NotificationEvent, startTime?: number) {
	for (const notification of Notification.cache.values()) void notification.send(client, type, startTime);
}

async function dailyReset(client: Client<true>) {
	sendNotification(client, NotificationEvent.DailyReset);
	await DailyGuides.reset();
	await DailyGuidesDistribution.reset();
	await DailyGuidesDistribution.distribute(client);
}

export default function heartbeat(client: Client<true>): void {
	setInterval(() => {
		const date = dayjs.tz(Date.now(), "America/Los_Angeles");
		const unix = date.unix();
		const day = date.day();
		const hour = date.hour();
		const minute = date.minute();
		const second = date.second();

		if (second === 0) {
			if (hour === 0 && minute === 0) {
				void dailyReset(client);
				if (day === 0) sendNotification(client, NotificationEvent.EyeOfEden);
			}

			if ((minute + 5) % 15 === 0) sendNotification(client, NotificationEvent.Passage, unix + 300);
			if ((hour + 1) % 4 === 0 && minute === 45) sendNotification(client, NotificationEvent.AURORA, unix + 900);

			if (hour % 2 === 0) {
				switch (minute) {
					case 0:
						sendNotification(client, NotificationEvent.PollutedGeyser, unix + 300);
						break;
					case 30:
						sendNotification(client, NotificationEvent.Grandma, unix + 300);
						break;
					case 45:
						sendNotification(client, NotificationEvent.Turtle, unix + 300);
						break;
				}
			}
		}
	}, 1_000);
}
