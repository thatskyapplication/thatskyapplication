import { EmbedBuilder, Events } from "discord.js";
import { LogType } from "../index.js";
import type { Event } from "./index.js";

const name = Events.GuildCreate;

export const event: Event<typeof name> = {
	name,
	async fire(guild) {
		void guild.client.log({ embeds: [new EmbedBuilder().setTitle("Guild Join")], type: LogType.Guild });
	},
};
