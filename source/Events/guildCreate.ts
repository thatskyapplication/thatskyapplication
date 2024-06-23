import { Events } from "discord.js";
import { handleGuildCreate } from "../Structures/Guess.js";
import { type Event, logGuild } from "./index.js";

const name = Events.GuildCreate;

export default {
	name,
	async fire(guild) {
		logGuild(guild);
		await handleGuildCreate(guild);
	},
} satisfies Event<typeof name>;
