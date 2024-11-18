import { GatewayDispatchEvents } from "@discordjs/core";
import { updateGuildIds } from "../services/guess.js";
import type { Event } from "./index.js";

const name = GatewayDispatchEvents.GuildMemberAdd;

export default {
	name,
	async fire({ data }) {
		await updateGuildIds(data.user.id, data.guild_id);
	},
} satisfies Event<typeof name>;
