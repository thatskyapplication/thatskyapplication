import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfSummerLights2021,
	start: skyDate(2_021, 9, 20),
	end: skyDate(2_021, 10, 3),
	offer: new Collection<number, ItemRaw>().set(1 << 0, {
		name: "Days of Summer Lights Accessory",
		cost: { money: 2.99 },
		emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory09,
	}),
});
