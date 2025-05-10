import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { checkSendable } from "../features/notifications.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildRoleUpdate;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		const oldRole = guild.roles.get(data.role.id);

		if (!oldRole) {
			pino.warn({ data }, `Received a ${name} packet for an uncached role.`);
			return;
		}

		oldRole.patch(data.role);

		if (
			oldRole.mentionable === data.role.mentionable &&
			oldRole.permissions === BigInt(data.role.permissions)
		) {
			return;
		}

		await checkSendable(guild.id);
	},
} satisfies Event<typeof name>;
