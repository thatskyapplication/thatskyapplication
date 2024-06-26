import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { CAPE_EMOJIS, HAIR_ACCESSORY_EMOJIS, NECKLACE_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfNature2022,
	start: skyDate(2_022, 4, 18),
	end: skyDate(2_022, 5, 1),
	offer: [
		{
			name: "Nature Coral Crown Accessory",
			bit: 1 << 0,
			cost: { hearts: 20 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory19,
		},
		{ name: "Nature Turtle Cape", bit: 1 << 1, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape81 },
		{
			name: "Nature Turtle Pack",
			bit: 1 << 2,
			cost: { money: 19.99 },
			emoji: NECKLACE_EMOJIS.Necklace20,
		},
	],
});
