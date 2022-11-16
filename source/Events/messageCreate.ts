import { Events } from "discord.js";
import DailyGuides from "../Structures/DailyGuides.js";
import type { Event } from "./index.js";

const name = Events.MessageCreate;

export const event: Event<typeof name> = {
	name,
	async fire(message) {
		if (!message.inGuild()) return;
		void DailyGuides.parse(message);
	},
};
