import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import pino from "../pino.js";
import { checkSendable } from "../services/notification.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildRoleUpdate;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.error(data, "Failed to find a guild where a role lives.");
			return;
		}

		const oldRole = guild.roles.find((role) => role.id === data.role.id);

		if (oldRole && BigInt(oldRole.permissions) === BigInt(data.role.permissions)) {
			return;
		}

		await checkSendable(guild.id);
	},
} satisfies Event<typeof name>;
