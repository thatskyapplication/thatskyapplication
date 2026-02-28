import { GatewayDispatchEvents, type Snowflake } from "@discordjs/core";
import {
	type DailyGuidesDistributionPacket,
	type NotificationPacket,
	Table,
} from "@thatskyapplication/utility";
import { GUILD_IDS_FROM_READY } from "../caches/guilds.js";
import croner from "../croner.js";
// import { deleteDailyGuidesDistribution } from "../features/daily-guides.js";
// import { deleteNotifications } from "../features/notifications.js";
import pg from "../pg.js";
// import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.Ready;
const READY_GUILD_IDS = new Set<Snowflake>();
const LOST_GUILD_IDS = new Set<Snowflake>();

export default {
	name,
	once: true,
	async fire({ data }) {
		for (const guild of data.guilds) {
			GUILD_IDS_FROM_READY.add(guild.id);
			READY_GUILD_IDS.add(guild.id);
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

		// if (LOST_GUILD_IDS.size > 0) {
		// 	// Remove guild configurations we no longer have access to.
		// 	const lostGuildIds = [...LOST_GUILD_IDS];
		// 	pino.info({ lostGuildIds }, "Removing lost guild ids.");

		// 	const settled = await Promise.allSettled(
		// 		lostGuildIds.map(async (guildId) => [
		// 			deleteDailyGuidesDistribution(guildId),
		// 			deleteNotifications(guildId),
		// 		]),
		// 	);

		// 	const errors = [];

		// 	for (const result of settled) {
		// 		if (result.status === "fulfilled") {
		// 			continue;
		// 		}

		// 		errors.push(result.reason);
		// 	}

		// 	if (errors.length > 0) {
		// 		pino.error(new AggregateError(errors, "Error whilst removing guild configurations."));
		// 	}
		// }

		croner();
	},
} satisfies Event<typeof name>;
