import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MASK_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../utility/emojis.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2024, 1, 29), end = skyDate(2024, 2, 15);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL("events/2024/days_of_fortune/event_currency.webp", CDN_URL)),
	});
}

export default new Event({
	id: EventId.DaysOfFortune2024,
	start: skyDate(2_024, 1, 29),
	end: skyDate(2_024, 2, 15),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Fortune Dragon Mask",
			cosmetic: Cosmetic.FortuneDragonMask,
			cost: { eventTickets: 14 },
			emoji: MASK_EMOJIS.Mask90,
		},
		{
			name: "Fortune Drum",
			cosmetic: Cosmetic.FortuneDrum,
			cost: { eventTickets: 34 },
			emoji: HELD_PROPS_EMOJIS.HeldProp41,
		},
		{
			name: "Days of Fortune Dragon Vestment",
			cosmetic: Cosmetic.DaysOfFortuneDragonVestment,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit57,
		},
		{
			name: "Days of Fortune Dragon Stole",
			cosmetic: Cosmetic.DaysOfFortuneDragonStole,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape126,
		},
		{
			name: "Days of Fortune Dragon Bangles",
			cosmetic: Cosmetic.DaysOfFortuneDragonBangles,
			cost: { money: 1.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory35,
		},
	],
	patchNotesURL: String(new URL("p0240", LINK_REDIRECTOR_URL)),
});
