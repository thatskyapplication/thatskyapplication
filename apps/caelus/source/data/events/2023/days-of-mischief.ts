import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
	SHOE_EMOJIS,
} from "../../../utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_023, 10, 23), end = skyDate(2_023, 11, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 6,
		infographicURL: String(new URL("events/2023/days_of_mischief/event_currency.webp", CDN_URL)),
	});
}

export default new Event({
	id: EventId.DaysOfMischief2023,
	start: skyDate(2_023, 10, 23),
	end: skyDate(2_023, 11, 13),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Mischief Crabkin Accessory",
			cosmetic: Cosmetic.MischiefCrabkinAccessory,
			cost: { eventCurrency: 24 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory32,
		},
		{
			name: "Mischief Goth Boots",
			cosmetic: Cosmetic.MischiefGothBoots,
			cost: { eventCurrency: 16 },
			emoji: SHOE_EMOJIS.Shoe12,
		},
		{
			name: "Mischief Goth Garment",
			cosmetic: Cosmetic.MischiefGothGarment,
			cost: { eventCurrency: 41 },
			emoji: OUTFIT_EMOJIS.Outfit52,
		},
		{
			name: "Mischief Gossamer Cape",
			cosmetic: Cosmetic.MischiefGossamerCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape116,
		},
		{
			name: "Mischief Crabula Cloak",
			cosmetic: Cosmetic.MischiefCrabulaCloak,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape117,
		},
		{
			name: "Mischief Crabula Mask",
			cosmetic: Cosmetic.MischiefCrabulaMask,
			cost: { money: 2.99 },
			emoji: MASK_EMOJIS.Mask84,
		},
	],
	patchNotesURL: String(new URL("p0230", LINK_REDIRECTOR_URL)),
});
