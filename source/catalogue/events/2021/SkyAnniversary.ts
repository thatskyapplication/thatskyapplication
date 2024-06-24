import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_ACCESSORY_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyAnniversary2021,
	start: skyDate(2_021, 7, 12),
	end: skyDate(2_021, 7, 25),
	offer: [
		{ name: "Hair accessory", bit: 1 << 0, cost: { hearts: 3 }, emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory06 },
		{ name: "Prop", bit: 1 << 1, cost: { candles: 20 }, emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp07 },
	],
});
