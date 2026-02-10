import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { memberLogSendJoinLeave } from "../features/member-log.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberRemove;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (guild) {
			guild.memberCount--;

			if (guild.id === SUPPORT_SERVER_GUILD_ID) {
				await memberLogSendJoinLeave({ guild, member: data, leftTimestamp: Date.now() });
			}
		} else {
			pino.warn({ data }, `Received a ${name} packet on an uncached guild.`);
		}
	},
} satisfies Event<typeof name>;
