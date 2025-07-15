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
				// 5 event tickets worth 2 each.
				amount: 10,
				start: skyDate(2_025, 7, 7),
				end: skyDate(2_025, 8, 18),
			},
			{
				amount: 30,
				start: skyDate(2_025, 7, 7),
				end: skyDate(2_025, 8, 18),
			},
			{
				amount: 30,
				start: skyDate(2_025, 7, 14),
				end: skyDate(2_025, 8, 18),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory5,
			cost: { eventTickets: 16 },
		},
		{
			cosmetic: Cosmetic.AnniversaryClapboard,
			cost: { eventTickets: 32 },
		},
		{
			cosmetic: Cosmetic.AnniversaryMovieSeats,
			cost: { eventTickets: 36 },
		},
		{
			cosmetic: [Cosmetic.AnniversaryCinemaGlasses, Cosmetic.AnniversaryCinemaPopcorn],
			cosmeticDisplay: Cosmetic.AnniversaryCinemaGlasses,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.TGCWireframeCape,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0295", LINK_REDIRECTOR_URL)),
});
