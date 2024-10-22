import { Events } from "discord.js";
import { handleGuildRemove } from "../services/guess.js";
import { checkSendable } from "../services/notification.js";
import { type Event, logGuild } from "./index.js";

const name = Events.GuildDelete;

export default {
	name,
	async fire(guild) {
		logGuild(guild, false);
		await Promise.all([handleGuildRemove(guild), checkSendable(guild.client, guild.id)]);
	},
} satisfies Event<typeof name>;
