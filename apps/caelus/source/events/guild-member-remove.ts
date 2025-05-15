import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { ineligible } from "../features/giveaway.js";
import pino from "../pino.js";
import { DEVELOPER_GUILD_ID } from "../utility/constants.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberRemove;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (guild) {
			guild.memberCount--;
		} else {
			pino.warn({ data }, `Received a ${name} packet on an uncached guild.`);
		}

		if (data.guild_id === DEVELOPER_GUILD_ID) {
			await ineligible({ userId: data.user.id });
		}
	},
} satisfies Event<typeof name>;
