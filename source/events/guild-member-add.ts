import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import pino from "../pino.js";
import { updateGuildIds } from "../services/guess.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberAdd;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (guild) {
			guild.memberCount++;
		} else {
			pino.warn({ data }, `Received a ${name} packet on an uncached guild.`);
		}

		await updateGuildIds(data.user.id, data.guild_id);
	},
} satisfies Event<typeof name>;
