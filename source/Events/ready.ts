import process from "node:process";
import type { Client } from "discord.js";
import { Events } from "discord.js";
import Notification from "../Structures/Notification.js";
import Profile from "../Structures/Profile.js";
import Rotations from "../Structures/Rotations.js";
import { consoleLog } from "../Utility/Utility.js";
import type { Event } from "./index.js";

const name = Events.ClientReady;

async function collectFromDatabase(client: Client<true>) {
	try {
		await client.Maria.getConnection();
		await collectNotifications(client);
		await collectProfiles(client);
	} catch (error) {
		consoleLog(error);
		process.exit(1);
	}
}

async function collectNotifications(client: Client<true>) {
	for (const notificationPacket of await client.Maria.query("SELECT * FROM `Notifications`;")) {
		const notification = new Notification(client, notificationPacket);
		Notification.cache.set(notification.No, notification);
	}

	Rotations.clock();
}

async function collectProfiles(client: Client<true>) {
	for (const profilePacket of await client.Maria.query("SELECT * FROM `Profiles`;")) {
		const profile = new Profile(client, profilePacket);
		Profile.cache.set(profile.No, profile);
	}
}

export const event: Event<typeof name> = {
	name,
	once: true,
	async fire(client) {
		await collectFromDatabase(client);
		await client.applyCommands();
	},
};
