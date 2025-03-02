import { URL } from "node:url";
import { Cosmetic, EventId, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { CDN_URL } from "../../../utility/constants.js";

const eventTicketAmount = [];

for (
	let start = skyDate(2_023, 11, 27), end = skyDate(2_023, 12, 12);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
		infographicURL: String(
			new URL(`events/${EventId.AviarysFireworkFestival2023}/event_tickets.webp`, CDN_URL),
		),
	});
}

export default new Event({
	id: EventId.AviarysFireworkFestival2023,
	start: skyDate(2_023, 11, 27),
	end: skyDate(2_023, 12, 18),
	eventTickets: {
		amount: eventTicketAmount,
		end: skyDate(2_023, 12, 12),
	},
	offer: [
		{
			name: "Festival Earrings",
			cosmetic: Cosmetic.FestivalEarrings,
			cost: { eventTickets: 15 },
		},
		{
			name: "Festival Sceptre",
			cosmetic: Cosmetic.FestivalSceptre,
			cost: { eventTickets: 36 },
		},
		{
			name: "Moth Appreciation Pack",
			cosmetic: [Cosmetic.MothAppreciationCape, Cosmetic.MothAppreciationAntennae],
			cost: { money: 9.99 },
		},
		{
			name: "Sparrow Appreciation Pack",
			cosmetic: [Cosmetic.SparrowAppreciationCape, Cosmetic.SparrowAppreciationMask],
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0234", LINK_REDIRECTOR_URL)),
});
