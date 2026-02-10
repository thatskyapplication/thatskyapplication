import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { messageLogHandleMessageDelete } from "../features/message-log.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.MessageDelete;

export default {
	name,
	async fire({ data }) {
		const guild = data.guild_id && GUILD_CACHE.get(data.guild_id);

		if (guild) {
			if (guild.id === SUPPORT_SERVER_GUILD_ID) {
				await messageLogHandleMessageDelete(data, guild);
			}
		} else {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
		}
	},
} satisfies Event<typeof name>;
