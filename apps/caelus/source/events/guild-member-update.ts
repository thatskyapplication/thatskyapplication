import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_CACHE } from "../caches/guilds.js";
import { checkSendable } from "../features/notifications.js";
import { GuildMember } from "../models/discord/guild-member.js";
import pino from "../pino.js";
import { APPLICATION_ID } from "../utility/configuration.js";
import { equalSet } from "../utility/functions.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberUpdate;

export default {
	name,
	async fire({ data }) {
		const guild = GUILD_CACHE.get(data.guild_id);

		if (!guild) {
			pino.warn({ data }, `Received a ${name} packet for an uncached guild.`);
			return;
		}

		if (data.user.id !== APPLICATION_ID) {
			return;
		}

		const oldRoles = guild.me?.roles;
		guild.me = new GuildMember(data);

		if (!(oldRoles && equalSet(oldRoles, guild.me.roles))) {
			await checkSendable(guild.id);
		}
	},
} satisfies Event<typeof name>;
