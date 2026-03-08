import { GatewayDispatchEvents } from "@discordjs/core";
import {
	GUILD_CACHE,
	GUILD_IDS_FROM_READY,
	READY_COUNT,
	readyCountReset,
	TOTAL_SHARDS,
} from "../caches/guilds.js";
import { Guild } from "../models/discord/guild.js";
import pino from "../pino.js";
import { startup } from "../utility/startup.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildCreate;
const guildsPerShard = new Map<number, number>();

export default {
	name,
	async fire({ data, shardId }) {
		const cachedGuild = GUILD_CACHE.get(data.id);

		if (cachedGuild) {
			if (cachedGuild.unavailable && !data.unavailable) {
				// This is when a guild becomes available from being unavailable.
				pino.info({ guild_id: data.id }, "Guild is available.");
				cachedGuild.unavailable = false;
			}

			return;
		}

		const guild = new Guild(data);
		GUILD_CACHE.set(guild.id, guild);

		if (GUILD_IDS_FROM_READY.has(data.id)) {
			// This is from the ready event where packets are sent for us to cache. Not new joins.
			GUILD_IDS_FROM_READY.delete(data.id);
			guildsPerShard.set(shardId, (guildsPerShard.get(shardId) ?? 0) + 1);

			if (GUILD_IDS_FROM_READY.size === 0 && READY_COUNT === TOTAL_SHARDS) {
				// All guilds across all shards are cached.
				pino.info(Object.fromEntries(guildsPerShard), `Guilds cached: ${GUILD_CACHE.size}`);

				// Reset to handle reconnects.
				readyCountReset();
				guildsPerShard.clear();

				// Perform startup checks.
				await startup();
			}

			return;
		}
	},
} satisfies Event<typeof name>;
