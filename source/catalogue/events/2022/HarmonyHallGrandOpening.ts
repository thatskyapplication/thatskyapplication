import { Collection } from "discord.js";
import { Event } from "../../../Structures/Event.js";
import { type ItemRaw, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.HarmonyHallGrandOpening2022,
	start: skyDate(2_022, 5, 23),
	end: skyDate(2_022, 6, 5),
	offer: new Collection<number, ItemRaw>().set(1 << 0, {
		name: "Hair accessory",
		cost: { candles: 50 },
		emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory20,
	}),
});
