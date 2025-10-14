import { GatewayDispatchEvents } from "@discordjs/core";
import { isDuring, skyNow } from "@thatskyapplication/utility";
import { GUILD_CACHE } from "../caches/guilds.js";
import { ineligible } from "../features/giveaway.js";
import pino from "../pino.js";
import { SUPPORT_SERVER_GUILD_ID } from "../utility/configuration.js";
import { GIVEAWAY_END_DATE, GIVEAWAY_START_DATE } from "../utility/constants.js";
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

		if (
			data.guild_id === SUPPORT_SERVER_GUILD_ID &&
			isDuring(GIVEAWAY_START_DATE, GIVEAWAY_END_DATE, skyNow())
		) {
			await ineligible({ userId: data.user.id });
		}
	},
} satisfies Event<typeof name>;
