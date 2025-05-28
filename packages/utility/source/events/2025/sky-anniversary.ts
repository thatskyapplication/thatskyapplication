import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

export default new Event({
	id: EventId.SkyAnniversary2025,
	start: skyDate(2_025, 7, 7),
	end: skyDate(2_025, 8, 19),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				// 10 event tickets alongside a guess of 20 for the first week's event.
				amount: 30,
				start: skyDate(2_025, 7, 7),
				// This is a guess as 0.30.0 is not announced.
				end: skyDate(2_025, 7, 13),
			},
			{
				amount: 20,
				// This is a guess as 0.30.0 is not announced.
				start: skyDate(2_025, 7, 14),
				end: skyDate(2_025, 8, 18),
			},
		],
	},
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory5,
			cost: { eventTickets: 16 },
		},
		{
			name: "Anniversary Clapperboard",
			cosmetic: Cosmetic.AnniversaryClapboard,
			cost: { eventTickets: 32 },
		},
		{
			name: "Anniversary Film Seats",
			cosmetic: Cosmetic.AnniversaryMovieSeats,
			cost: { eventTickets: 36 },
		},
		{
			name: "Anniversary Cinema Set",
			cosmetic: [Cosmetic.AnniversaryCinemaGlasses, Cosmetic.AnniversaryCinemaPopcorn],
			cosmeticDisplay: Cosmetic.AnniversaryCinemaGlasses,
			cost: { money: 4.99 },
		},
		{
			name: "TGC Wireframe Cape",
			cosmetic: Cosmetic.TGCWireframeCape,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0295", LINK_REDIRECTOR_URL)),
});
