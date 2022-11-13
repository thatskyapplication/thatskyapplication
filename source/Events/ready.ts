import process from "node:process";
import type { Client } from "discord.js";
import { Events } from "discord.js";
import type { RawNotificationData } from "../Structures/Notification.js";
import Notification from "../Structures/Notification.js";
import Rotations from "../Structures/Rotations.js";
import { consoleLog } from "../Utility/Utility.js";
import pg from "../pg.js";
import type { Event } from "./index.js";

const name = Events.ClientReady;

async function collectFromDatabase(client: Client<true>) {
	try {
		await collectNotifications(client);
	} catch (error) {
		consoleLog(error);
		process.exit(1);
	}
}

async function collectNotifications(client: Client<true>) {
	for (const notificationPacket of await pg<RawNotificationData>("notifications")) {
		const notification = new Notification(notificationPacket);
		Notification.cache.set(notification.id, notification);
	}

	Rotations.clock(client);
}

export const event: Event<typeof name> = {
	name,
	once: true,
	async fire(client) {
		await collectFromDatabase(client);
		await client.applyCommands();
	},
};
