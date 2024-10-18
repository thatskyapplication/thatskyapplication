import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 7, 12, 17), end = skyDate(2_024, 7, 27);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({ date: start, amount: 4 });
}

export default new Event({
	id: EventId.SkyFest2024,
	start: skyDate(2_024, 7, 12, 17),
	end: skyDate(2_024, 7, 27),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "SkyFest Star Jar",
			cosmetic: Cosmetic.SkyFestStarJar,
			cost: { eventCurrency: 15 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp70,
		},
		{
			name: "SkyFest 5th Anniversary T-shirt",
			cosmetic: Cosmetic.SkyFest5thAnniversaryTShirt,
			cost: { eventCurrency: 10 },
			emoji: OUTFIT_EMOJIS.Outfit59,
		},
		{
			name: "SkyFest 5th Anniversary Headband",
			cosmetic: Cosmetic.SkyFest5thAnniversaryHeadband,
			cost: { eventCurrency: 3 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory42,
		},
		{
			name: "SkyFest Jenova Fan",
			cosmetic: Cosmetic.SkyFestJenovaFan,
			cost: { eventCurrency: 7 },
			emoji: HELD_PROPS_EMOJIS.HeldProp43,
		},
		{
			name: "SkyFest Oreo Headband",
			cosmetic: Cosmetic.SkyFestOreoHeadband,
			cost: { money: 4.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory43,
		},
		{
			name: "SkyFest Wireframe Cape",
			cosmetic: Cosmetic.SkyFestWireframeCape,
			cost: { money: 19.99 },
			emoji: CAPE_EMOJIS.Cape132,
		},
	],
});
