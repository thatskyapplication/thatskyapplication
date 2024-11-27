import process from "node:process";
import { GatewayDispatchEvents, type Snowflake } from "@discordjs/core";
import { GUILD_IDS_FROM_READY } from "../caches/guilds.js";
import croner from "../croner.js";
import AI, { type AIPacket } from "../models/AI.js";
import Configuration, { type ConfigurationPacket } from "../models/Configuration.js";
import DailyGuides, { type DailyGuidesPacket } from "../models/DailyGuides.js";
import type { DailyGuidesDistributionPacket } from "../models/DailyGuidesDistribution.js";
import type { NotificationPacket } from "../models/Notification.js";
import pg, { Table } from "../pg.js";
import pino from "../pino.js";
import { deleteDailyGuidesDistribution } from "../services/daily-guides.js";
import { checkSendable, deleteNotifications } from "../services/notification.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.Ready;
const READY_GUILD_IDS = new Set<Snowflake>();
const LOST_GUILD_IDS = new Set<Snowflake>();

async function collectFromDatabase() {
	try {
		await collectConfigurations();
		await AI.populateCache();
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
	async fire({ data }) {
		for (const guild of data.guilds) {
			GUILD_IDS_FROM_READY.add(guild.id);
			READY_GUILD_IDS.add(guild.id);
		}

		await collectFromDatabase();

		// Find guild ids we are no longer in.
		for (const { guild_id } of await pg<AIPacket>(Table.AI).select("guild_id")) {
			if (!READY_GUILD_IDS.has(guild_id)) {
				LOST_GUILD_IDS.add(guild_id);
			}
		}

		for (const { guild_id } of await pg<DailyGuidesDistributionPacket>(
			Table.DailyGuidesDistribution,
		).select("guild_id")) {
			if (!READY_GUILD_IDS.has(guild_id)) {
				LOST_GUILD_IDS.add(guild_id);
			}
		}

		for (const { guild_id } of await pg<NotificationPacket>(Table.Notifications).select(
			"guild_id",
		)) {
			if (!READY_GUILD_IDS.has(guild_id)) {
				LOST_GUILD_IDS.add(guild_id);
			}
		}

		if (LOST_GUILD_IDS.size > 0) {
			// Remove guild configurations we no longer have access to.
			pino.info({ LOST_GUILD_IDS }, "Removing lost guild ids.");

			const settled = await Promise.allSettled(
				[...LOST_GUILD_IDS].map(async (guildId) => [
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
		}

		// Perform a health check for our notification subscribers.
		const notificationsSettled = await Promise.allSettled(
			(await pg<NotificationPacket>(Table.Notifications).distinct("guild_id")).map(
				(notificationPacket) => checkSendable(notificationPacket.guild_id),
			),
		);

		const notificationsErrors = notificationsSettled
			.filter((result): result is PromiseRejectedResult => result.status === "rejected")
			.map((result) => result.reason);

		if (notificationsErrors.length > 0) {
			pino.error(notificationsErrors, "Error whilst performing the notification health check.");
		}

		croner();
	},
} satisfies Event<typeof name>;
