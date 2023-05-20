import { Events } from "discord.js";
import { logGuild, type Event } from "./index.js";

const name = Events.GuildDelete;

export const event: Event<typeof name> = {
	name,
	async fire(guild) {
		logGuild(guild, false);
	},
};
