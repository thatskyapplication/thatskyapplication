import { GatewayDispatchEvents } from "@discordjs/core";
import { removeGuildId } from "../services/guess.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberRemove;

export default {
	name,
	async fire({ data }) {
		await removeGuildId(data.user.id, data.guild_id);
	},
} satisfies Event<typeof name>;
