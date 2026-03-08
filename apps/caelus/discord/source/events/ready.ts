import { GatewayDispatchEvents, type Snowflake } from "@discordjs/core";
import { GUILD_IDS_FROM_READY } from "../caches/guilds.js";
import croner from "../croner.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.Ready;
const READY_GUILD_IDS = new Set<Snowflake>();

export default {
	name,
	once: true,
	async fire({ data }) {
		for (const guild of data.guilds) {
			GUILD_IDS_FROM_READY.add(guild.id);
			READY_GUILD_IDS.add(guild.id);
		}

		croner();
	},
} satisfies Event<typeof name>;
