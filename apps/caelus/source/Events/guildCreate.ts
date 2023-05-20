import { Events } from "discord.js";
import { logGuild, type Event } from "./index.js";

const name = Events.GuildCreate;

export const event: Event<typeof name> = {
	name,
	async fire(guild) {
		logGuild(guild);
	},
};
