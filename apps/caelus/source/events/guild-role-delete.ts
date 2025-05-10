import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { checkSendable } from "../features/notifications.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildRoleDelete;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		guild.roles.delete(data.role_id);
		await checkSendable(guild.id);
	},
} satisfies Event<typeof name>;
