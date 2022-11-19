import { Events } from "discord.js";
import DailyGuides from "../Structures/DailyGuides.js";
import type { Event } from "./index.js";

const name = Events.MessageUpdate;

export const event: Event<typeof name> = {
	name,
	async fire({ client }, newMessage) {
		const fetchedMessage = newMessage.partial ? await newMessage.fetch() : newMessage;
		if (DailyGuides.validToParse(fetchedMessage)) void DailyGuides.reCheck(client);
	},
};
