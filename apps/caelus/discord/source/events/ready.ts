import { GatewayDispatchEvents } from "@discordjs/core";
import { GUILD_IDS_FROM_READY, readyCountIncrement, totalShardsSet } from "../caches/guilds.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.Ready;

export default {
	name,
	async fire({ data }) {
		totalShardsSet(data.shard?.[1] ?? 1);
		readyCountIncrement();

		for (const guild of data.guilds) {
			GUILD_IDS_FROM_READY.add(guild.id);
		}
	},
} satisfies Event<typeof name>;
