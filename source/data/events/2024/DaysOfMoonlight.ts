import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility2/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 9, 16), end = skyDate(2_024, 9, 30);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfMoonlight2024,
	start: skyDate(2_024, 9, 16),
	end: skyDate(2_024, 9, 30),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Moonlight Blossom Accessory",
			cosmetic: Cosmetic.MoonlightBlossomAccessory,
			cost: { eventCurrency: 17 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory45,
		},
		{
			name: "Moonlight Lantern Decoration",
			cosmetic: Cosmetic.MoonlightLanternDecoration,
			cost: { eventCurrency: 32 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp72,
		},
		{
			name: "Moonlight Earrings",
			cosmetic: Cosmetic.MoonlightEarrings,
			cost: { money: 2.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory38,
		},
		{
			name: "Moonlight Frock and Updo",
			cosmetic: [Cosmetic.MoonlightFrock, Cosmetic.MoonlightUpdo],
			cost: { money: 14.99 },
			emoji: OUTFIT_EMOJIS.Outfit66,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1343",
});
