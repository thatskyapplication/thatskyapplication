import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { GuildMember } from "../models/discord/guild-member.js";
import pino from "../pino.js";
import { APPLICATION_ID } from "../utility/constants.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberUpdate;

export default {
	name,
	fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		if (data.user.id !== APPLICATION_ID) {
			return;
		}

		guild.me = new GuildMember(data);
	},
} satisfies Event<typeof name>;
