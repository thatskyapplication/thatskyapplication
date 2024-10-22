import process from "node:process";
import { type Client, Events, type Snowflake } from "discord.js";
import AI from "../models/AI.js";
import Configuration, { type ConfigurationPacket } from "../models/Configuration.js";
import DailyGuides, { type DailyGuidesPacket } from "../models/DailyGuides.js";
import type { DailyGuidesDistributionPacket } from "../models/DailyGuidesDistribution.js";
import heartbeat from "../models/Heartbeat.js";
import {
	type NotificationPacket,
	checkSendable,
	deleteNotifications,
} from "../models/Notification.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { deleteDailyGuidesDistribution } from "../services/daily-guides.js";
import type { Event } from "./index.js";

const name = Events.ClientReady;
const guildIds = new Set<Snowflake>();

async function collectFromDatabase(client: Client<true>) {
	try {
		await collectConfigurations();
		await AI.populateCache(client);
		await collectDailyGuides();
	} catch (error) {
		pino.fatal(error, "Error collecting configurations from the database.");
		process.exit(1);
	}
}

async function collectConfigurations() {
	const [configurationPacket] = await pg<ConfigurationPacket>(Table.Configuration);
	Configuration.patch(configurationPacket!);
}

async function collectDailyGuides() {
	const [dailyGuidesPacket] = await pg<DailyGuidesPacket>(Table.DailyGuides);

	if (dailyGuidesPacket) {
		DailyGuides.patch(dailyGuidesPacket);
	} else {
		await DailyGuides.reset(true);
	}
}

export default {
	name,
	once: true,
	async fire(client) {
		await collectFromDatabase(client);

		// Collect guild ids from daily guides distribution table for the set.
		for (const { guild_id } of await pg<DailyGuidesDistributionPacket>(
			Table.DailyGuidesDistribution,
		).select("guild_id")) {
			if (!client.guilds.cache.has(guild_id)) {
				guildIds.add(guild_id);
			}
		}

		// Remove guild configurations we no longer have access to.
		const settled = await Promise.allSettled(
			[...guildIds].map(async (guildId) => [
				AI.delete(guildId),
				deleteDailyGuidesDistribution(guildId),
				deleteNotifications(guildId),
			]),
		);

		const errors = settled
			.filter((result): result is PromiseRejectedResult => result.status === "rejected")
			.map((result) => result.reason);

		if (errors.length > 0) {
			pino.error(errors, "Error whilst removing guild configurations.");
		}

		// Perform a health check for our notification subscribers.
		const notificationsSettled = await Promise.allSettled(
			(await pg<NotificationPacket>(Table.Notifications).distinct("guild_id")).map(
				(notificationPacket) => checkSendable(client, notificationPacket.guild_id),
			),
		);

		const notificationsErrors = notificationsSettled
			.filter((result): result is PromiseRejectedResult => result.status === "rejected")
			.map((result) => result.reason);

		if (notificationsErrors.length > 0) {
			pino.error(notificationsErrors, "Error whilst performing the notification health check.");
		}

		heartbeat(client);
	},
} satisfies Event<typeof name>;
