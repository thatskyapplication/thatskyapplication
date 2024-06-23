import { Events } from "discord.js";
import { handleGuildRemove } from "../Structures/Guess.js";
import { type Event, logGuild } from "./index.js";

const name = Events.GuildDelete;

export default {
	name,
	async fire(guild) {
		logGuild(guild, false);
		await handleGuildRemove(guild);
	},
} satisfies Event<typeof name>;
