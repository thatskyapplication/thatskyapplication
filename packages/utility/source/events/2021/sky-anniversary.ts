import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.SkyAnniversary2021,
	start: skyDate(2_021, 7, 12),
	end: skyDate(2_021, 7, 26),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory2,
			cost: { hearts: 3 },
		},
		{
			name: "Prop",
			cosmetic: Cosmetic.SkyAnniversaryProp,
			cost: { candles: 20 },
		},
	],
});
