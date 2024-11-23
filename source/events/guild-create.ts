import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE, GUILD_IDS_FROM_READY } from "../caches/guilds.js";
import { Guild } from "../models/discord/guild.js";
import pino from "../pino.js";
import { handleGuildCreate } from "../services/guess.js";
import { logGuild } from "../services/log.js";
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
			GUILD_IDS_FROM_READY.delete(data.id);
			return;
		}

		logGuild(guild, true);
		await handleGuildCreate(data);
	},
} satisfies Event<typeof name>;
