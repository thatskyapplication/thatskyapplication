import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { sendJoinLeave } from "../features/member-log.js";
import pino from "../pino.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberAdd;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (guild) {
			guild.memberCount++;
			await sendJoinLeave(data);
		} else {
			pino.warn({ data }, `Received a ${name} packet on an uncached guild.`);
		}
	},
} satisfies Event<typeof name>;
