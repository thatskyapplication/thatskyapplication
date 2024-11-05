import { GatewayDispatchEvents } from "@discordjs/core";
import { handleGuildRemove } from "../services/guess.js";
import { logGuildDelete } from "../services/log.js";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";
import { GUILD_CACHE } from "../caches/guilds.js";

const name = GatewayDispatchEvents.GuildDelete;

export default {
	name,
	async fire({ data }) {
		GUILD_CACHE.delete(data.id);
		logGuildDelete(data);
		await Promise.all([handleGuildRemove(guild), checkSendable(guild.client, guild.id)]);
	},
} satisfies Event<typeof name>;
