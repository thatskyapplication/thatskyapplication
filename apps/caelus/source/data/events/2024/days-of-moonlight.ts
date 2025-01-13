import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	FACE_ACCESSORY_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../utility/emojis.js";

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
	patchNotesURL: String(new URL("p0265", LINK_REDIRECTOR_URL)),
});
