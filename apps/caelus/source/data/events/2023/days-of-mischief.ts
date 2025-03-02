import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_023, 10, 23), end = skyDate(2_023, 11, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 6,
		infographicURL: String(
			new URL(`events/${EventId.DaysOfMischief2023}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.DaysOfMischief2023,
	start: skyDate(2_023, 10, 23),
	end: skyDate(2_023, 11, 13),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Mischief Crabkin Accessory",
			cosmetic: Cosmetic.MischiefCrabkinAccessory,
			cost: { eventTickets: 24 },
		},
		{
			name: "Mischief Goth Boots",
			cosmetic: Cosmetic.MischiefGothBoots,
			cost: { eventTickets: 16 },
		},
		{
			name: "Mischief Goth Garment",
			cosmetic: Cosmetic.MischiefGothGarment,
			cost: { eventTickets: 41 },
		},
		{
			name: "Mischief Gossamer Cape",
			cosmetic: Cosmetic.MischiefGossamerCape,
			cost: { money: 14.99 },
		},
		{
			name: "Mischief Crabula Cloak",
			cosmetic: Cosmetic.MischiefCrabulaCloak,
			cost: { money: 14.99 },
		},
		{
			name: "Mischief Crabula Mask",
			cosmetic: Cosmetic.MischiefCrabulaMask,
			cost: { money: 2.99 },
		},
	],
	patchNotesURL: String(new URL("p0230", LINK_REDIRECTOR_URL)),
});
