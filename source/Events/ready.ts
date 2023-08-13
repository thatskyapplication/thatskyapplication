import process from "node:process";
import { Events } from "discord.js";
import type { DailyGuidesPacket } from "../Structures/DailyGuides.js";
import DailyGuides from "../Structures/DailyGuides.js";
import heartbeat from "../Structures/Heartbeat.js";
import type { NotificationPacket } from "../Structures/Notification.js";
import Notification from "../Structures/Notification.js";
import { consoleLog } from "../Utility/Utility.js";
import pg, { Table } from "../pg.js";
import type { Event } from "./index.js";

const name = Events.ClientReady;

async function collectFromDatabase() {
	try {
		await collectNotifications();
		await collectDailyGuides();
	} catch (error) {
		consoleLog(error);
		process.exit(1);
	}
}

async function collectNotifications() {
	for (const notificationPacket of await pg<NotificationPacket>(Table.Notifications)) {
		const notification = new Notification(notificationPacket);
		Notification.cache.set(notification.id, notification);
	}
}

async function collectDailyGuides() {
	const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides);

	if (dailyGuidesPacket) {
		DailyGuides.patch(dailyGuidesPacket);
	} else {
		await DailyGuides.reset(true);
	}
}

export const event: Event<typeof name> = {
	name,
	once: true,
	async fire(client) {
		await collectFromDatabase();
		heartbeat(client);
		await client.applyCommands();
	},
};
