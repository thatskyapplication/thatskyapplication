import { Events } from "discord.js";
import { type Event, logGuild } from "./index.js";

const name = Events.GuildDelete;

export const event: Event<typeof name> = {
	name,
	async fire(guild) {
		logGuild(guild, false);
	},
};
