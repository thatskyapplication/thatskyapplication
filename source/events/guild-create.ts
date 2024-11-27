import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE, GUILD_IDS_FROM_READY } from "../caches/guilds.js";
import { Guild } from "../models/discord/guild.js";
import pino from "../pino.js";
import { handleGuildCreate } from "../services/guess.js";
import { logGuild } from "../services/log.js";
import { startup } from "../services/startup.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildCreate;

export default {
	name,
	async fire({ data }) {
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

			if (GUILD_IDS_FROM_READY.size === 0) {
				// All guilds are cached. Perform our startup checks that need to occur when all guilds are cached.
				await startup();
			}

			return;
		}

		logGuild(guild, true);
		await handleGuildCreate(data);
	},
} satisfies Event<typeof name>;
