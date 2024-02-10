import process from "node:process";
import { type Collection, type Guild, type Snowflake, Events } from "discord.js";
import AI, { type AIPacket } from "../Structures/AI.js";
import Configuration, { type ConfigurationPacket } from "../Structures/Configuration.js";
import DailyGuides, { type DailyGuidesPacket } from "../Structures/DailyGuides.js";
import DailyGuidesDistribution, { type DailyGuidesDistributionPacket } from "../Structures/DailyGuidesDistribution.js";
import heartbeat from "../Structures/Heartbeat.js";
import Notification, { type NotificationPacket } from "../Structures/Notification.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = Events.ClientReady;
const guildIds = new Set<Snowflake>();

async function collectFromDatabase(cache: Collection<Snowflake, Guild>) {
	try {
		await collectConfigurations();
		await collectAI(cache);
		await collectNotifications(cache);
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

async function collectAI(cache: Collection<Snowflake, Guild>) {
	for (const aIPacket of await pg<AIPacket>(Table.AI)) {
		const ai = new AI(aIPacket);

		if (cache.has(ai.guildId)) {
			AI.cache.set(ai.guildId, ai);
		} else {
			guildIds.add(ai.guildId);
		}
	}
}

async function collectNotifications(cache: Collection<Snowflake, Guild>) {
	for (const notificationPacket of await pg<NotificationPacket>(Table.Notifications)) {
		const notification = new Notification(notificationPacket);

		if (cache.has(notification.guildId)) {
			Notification.cache.set(notification.guildId, notification);
		} else {
			guildIds.add(notification.guildId);
		}
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
		const guildCache = client.guilds.cache;
		await collectFromDatabase(guildCache);

		// Collect guild ids from daily guides distribution table for the set.
		for (const { guild_id } of await pg<DailyGuidesDistributionPacket>(Table.DailyGuidesDistribution).select(
			"guild_id",
		)) {
			if (!guildCache.has(guild_id)) guildIds.add(guild_id);
		}

		// Remove guild configurations we no longer have access to.
		const settled = await Promise.allSettled(
			[...guildIds].map(async (guildId) => [
				AI.delete(guildId),
				DailyGuidesDistribution.delete(guildId),
				Notification.delete(guildId),
			]),
		);

		const errors = settled
			.filter((result): result is PromiseRejectedResult => result.status === "rejected")
			.map((result) => result.reason);

		if (errors.length > 0) {
			pino.error(errors, "Error whilst removing guild configurations.");
		}

		heartbeat(client);
		await client.applyCommands();
	},
};
