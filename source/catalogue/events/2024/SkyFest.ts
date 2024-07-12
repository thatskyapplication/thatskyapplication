import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.SkyFest2024,
	start: skyDate(2_024, 7, 12, 17),
	end: skyDate(2_024, 7, 26),
	eventCurrencyPerDay: 4,
	offer: [
		{
			name: "SkyFest Star Jar",
			bit: 1 << 0,
			cost: { eventCurrency: 16 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp70,
		},
		{
			name: "SkyFest 5th Anniversary T-shirt",
			bit: 1 << 1,
			cost: { eventCurrency: 12 },
			emoji: OUTFIT_EMOJIS.Outfit59,
		},
		{
			name: "SkyFest 5th Anniversary Headband",
			bit: 1 << 2,
			cost: { eventCurrency: 4 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory42,
		},
		{
			name: "SkyFest Jenova Fan",
			bit: 1 << 3,
			cost: { eventCurrency: 8 },
			emoji: HELD_PROPS_EMOJIS.HeldProp43,
		},
		{
			name: "SkyFest Oreo Headband",
			bit: 1 << 4,
			cost: { money: 4.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory43,
		},
		{
			name: "SkyFest Wireframe Cape",
			bit: 1 << 5,
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape132,
		},
	],
});
