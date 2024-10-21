import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import { HAIR_ACCESSORY_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../Utility2/emojis.js";

export default new Event({
	id: EventId.SkyAnniversary2021,
	start: skyDate(2_021, 7, 12),
	end: skyDate(2_021, 7, 26),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory2,
			cost: { hearts: 3 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory06,
		},
		{
			name: "Prop",
			cosmetic: Cosmetic.SkyAnniversaryProp,
			cost: { candles: 20 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp07,
		},
	],
});
