import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.HarmonyHallGrandOpening2022,
	start: skyDate(2_022, 5, 23),
	end: skyDate(2_022, 6, 5),
	offer: [{ name: "Hair accessory", bit: 1 << 0, cost: { candles: 50 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory20 }],
});
