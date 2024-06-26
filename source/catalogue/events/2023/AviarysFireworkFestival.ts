import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { FACE_ACCESSORY_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.AviarysFireworkFestival2023,
	start: skyDate(2_023, 11, 27),
	end: skyDate(2_023, 12, 17),
	eventCurrencyEnd: skyDate(2_023, 12, 11),
	eventCurrencyInfographicURL: true,
	eventCurrencyPerDay: 5,
	offer: [
		{
			name: "Face accessory",
			bit: 1 << 0,
			cost: { eventCurrency: 15 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory33,
		},
		{ name: "Prop", bit: 1 << 1, cost: { eventCurrency: 36 }, emoji: HELD_PROPS_EMOJIS.HeldProp39 },
	],
});
