import { CDN_URL } from "../../cdn.js";
import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

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
			cosmeticDisplay: Cosmetic.MothAppreciationCape,
			cost: { money: 9.99 },
		},
		{
			name: "Sparrow Appreciation Pack",
			cosmetic: [Cosmetic.SparrowAppreciationCape, Cosmetic.SparrowAppreciationMask],
			cosmeticDisplay: Cosmetic.SparrowAppreciationCape,
			cost: { money: 9.99 },
		},
	],
	patchNotesURL: String(new URL("p0234", LINK_REDIRECTOR_URL)),
});
