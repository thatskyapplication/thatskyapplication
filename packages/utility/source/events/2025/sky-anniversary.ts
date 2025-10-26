import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
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
				// 5 bonus event tickets worth 2 each.
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
			{
				// 5 bonus event tickets worth 2 each.
				amount: 10,
				start: skyDate(2_025, 7, 21),
				end: skyDate(2_025, 8, 18),
			},
			{
				amount: 30,
				start: skyDate(2_025, 7, 21),
				end: skyDate(2_025, 8, 18),
			},
			{
				amount: 30,
				start: skyDate(2_025, 7, 28),
				end: skyDate(2_025, 8, 18),
			},
			{
				// 5 bonus event tickets worth 2 each.
				amount: 10,
				start: skyDate(2_025, 8, 4),
				end: skyDate(2_025, 8, 18),
			},
			{
				amount: 30,
				start: skyDate(2_025, 8, 4),
				end: skyDate(2_025, 8, 18),
			},
			{
				amount: 30,
				start: skyDate(2_025, 8, 11),
				end: skyDate(2_025, 8, 18),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.BalloonArch,
			cost: { candles: 20 },
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
			translation: CosmeticCommon.HairAccessory,
			cosmetic: Cosmetic.SkyAnniversaryHairAccessory5,
			cost: { eventTickets: 16 },
		},
		{
			cosmetic: Cosmetic.BlueCarpet,
			cost: { eventTickets: 26 },
		},
		{
			cosmetic: Cosmetic.AnniversarySuit,
			cost: { eventTickets: 66 },
		},
		{
			cosmetic: Cosmetic.SkyBalloonProp,
			cost: { eventTickets: 16 },
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
		{
			cosmetic: [Cosmetic.AnniversaryGown, Cosmetic.AnniversaryShoes],
			cosmeticDisplay: Cosmetic.AnniversaryGown,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.AnniversaryTuxedoCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.SkyCreatorAward,
		},
	],
	patchNotesURL: patchNotesRoute("0295"),
});
