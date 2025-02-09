import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_025, 2, 10), end = skyDate(2_025, 2, 24);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 4,
	});
}

export default new Event({
	id: EventId.DaysOfLove2025,
	start: skyDate(2_025, 2, 10),
	end: skyDate(2_025, 2, 24),
	eventCurrency: {
		amount: eventCurrencyAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 2, 10),
				end: skyDate(2_025, 2, 23),
			},
		],
	},
	offer: [
		{
			name: "Violet Crystal",
			cosmetic: Cosmetic.DaysOfLoveVioletCrystal,
			cost: { eventCurrency: 14 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp87,
		},
		{
			name: "Braids",
			cosmetic: Cosmetic.DaysOfLoveBraids,
			cost: { eventCurrency: 35 },
			emoji: HAIR_EMOJIS.Hair158,
		},
		{
			name: "Amethyst Accessory",
			cosmetic: Cosmetic.DaysOfLoveAmethystAccessory,
			cost: { money: 2.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory55,
		},
		{
			name: "Amethyst-Tipped Tails",
			cosmetic: Cosmetic.DaysOfLoveAmethystTippedTails,
			cost: { money: 6.99 },
			emoji: HAIR_EMOJIS.Hair159,
		},
	],
	patchNotesURL: String(new URL("p0280", LINK_REDIRECTOR_URL)),
});
