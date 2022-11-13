import { setInterval } from "node:timers";
import time from "date-fns-tz";
import type { Client } from "discord.js";
import Notification, { NotificationEvent } from "./Notification.js";

function sendNotification(client: Client<true>, type: NotificationEvent) {
	for (const notification of Notification.cache.values()) void notification.send(client, type);
}

export default new (class {
	public clock(client: Client<true>): void {
		setInterval(() => {
			const date = time.utcToZonedTime(Date.now(), "America/Los_Angeles");
			const hours = date.getUTCHours();
			const minutes = date.getUTCMinutes();
			const seconds = date.getUTCSeconds();

			if (seconds === 0 && hours % 2 === 0) {
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
		}, 1_000);
	}
})();
