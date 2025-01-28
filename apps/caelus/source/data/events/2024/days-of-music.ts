import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 11, 25), end = skyDate(2_024, 12, 12);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 4,
	});
}

export default new Event({
	id: EventId.DaysOfMusic2024,
	start: skyDate(2_024, 11, 25),
	end: skyDate(2_024, 12, 12),
	eventCurrency: {
		amount: eventCurrencyAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_024, 11, 25),
				end: skyDate(2_024, 12, 11),
			},
		],
	},
	offer: [
		{
			name: "Marching Band Cape",
			cosmetic: Cosmetic.MarchingBandCape,
			cost: { eventCurrency: 50 },
			emoji: CAPE_EMOJIS.Cape139,
		},
		{
			name: "Music Marching Uniform",
			cosmetic: Cosmetic.MusicMarchingUniform,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit72,
		},
		{
			name: "Jam Station",
			cosmetic: Cosmetic.JamStation,
			cost: { candles: 250 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp77,
		},
		{
			name: "Fledgling Upright Piano",
			cosmetic: Cosmetic.FledglingUprightPiano,
			cost: { money: 4.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp84,
		},
	],
	patchNotesURL: String(new URL("p0275", LINK_REDIRECTOR_URL)),
});
