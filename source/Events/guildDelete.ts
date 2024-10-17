import { Events } from "discord.js";
import { handleGuildRemove } from "../Structures/Guess.js";
import { checkSendable } from "../Structures/Notification.js";
import { type Event, logGuild } from "./index.js";

const name = Events.GuildDelete;

export default {
	name,
	async fire(guild) {
		logGuild(guild, false);
		await Promise.all([handleGuildRemove(guild), checkSendable(guild.client, guild.id)]);
	},
} satisfies Event<typeof name>;
