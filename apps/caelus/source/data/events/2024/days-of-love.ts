import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_024, 2, 12), end = skyDate(2_024, 2, 26);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(new URL(`events/${EventId.DaysOfLove2024}/event_tickets.webp`, CDN_URL)),
	});
}

export default new Event({
	id: EventId.DaysOfLove2024,
	start: skyDate(2_024, 2, 12),
	end: skyDate(2_024, 2, 26),
	eventTickets: {
		amount: eventTicketAmount,
	},
	offer: [
		{
			name: "Love Heart Plushie",
			cosmetic: Cosmetic.LoveHeartPlushie,
			cost: { eventTickets: 14 },
		},
		{
			name: "Love Heart Beret",
			cosmetic: Cosmetic.LoveHeartBeret,
			cost: { eventTickets: 27 },
		},
		{
			name: "Days of Love music sheet",
			cosmetic: Cosmetic.DaysofLoveMusicSheet,
			cost: { eventTickets: 7 },
		},
		{
			name: "Days of Love Meteor Mantle",
			cosmetic: Cosmetic.DaysofLoveMeteorMantle,
			cost: { money: 17.99 },
		},
	],
	patchNotesURL: String(new URL("p0240", LINK_REDIRECTOR_URL)),
});
