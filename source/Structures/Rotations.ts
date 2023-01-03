import { setInterval } from "node:timers";
import time from "date-fns-tz";
import type { Client } from "discord.js";
import DailyGuides from "./DailyGuides.js";
import DailyGuidesDistribution from "./DailyGuidesDistribution.js";
import Notification, { NotificationEvent } from "./Notification.js";

function sendNotification(client: Client<true>, type: NotificationEvent) {
	for (const notification of Notification.cache.values()) void notification.send(client, type);
}

export default new (class {
	public clock(client: Client<true>): void {
		setInterval(() => {
			const now = Date.now();
			const dateTime = time.utcToZonedTime(now, "America/Los_Angeles");
			const hours = dateTime.getUTCHours();
			const minutes = dateTime.getUTCMinutes();
			const seconds = dateTime.getUTCSeconds();

			if (seconds === 0) {
				if (hours === 0 && minutes === 0) {
					void DailyGuides.reset();
					void DailyGuidesDistribution.reset();
				}

				if (hours % 2 === 0) {
					switch (minutes) {
						case 0:
							sendNotification(client, NotificationEvent.PollutedGeyser);
							break;
						case 30:
							sendNotification(client, NotificationEvent.Grandma);
							break;
						case 45:
							sendNotification(client, NotificationEvent.Turtle);
							break;
					}
				}
			}
		}, 1_000);
	}
})();
