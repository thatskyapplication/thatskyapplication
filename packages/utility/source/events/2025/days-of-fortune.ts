import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 1, 27), end = skyDate(2_025, 2, 10);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfFortune2025,
	start: skyDate(2_025, 1, 27),
	end: skyDate(2_025, 2, 10),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 1, 27),
				end: skyDate(2_025, 2, 9),
			},
		],
	},
	offer: [
		{
			name: "Dragon Dance music sheet",
			cosmetic: Cosmetic.DragonDanceMusicSheet,
			cost: { eventTickets: 8 },
		},
		{
			name: "Red dye",
			cosmetic: Cosmetic.FortuneRedDye,
			cost: { eventTickets: 10 },
		},
		{
			name: "Fortune Snake Mask",
			cosmetic: Cosmetic.FortuneSnakeMask,
			cost: { eventTickets: 14 },
		},
		{
			name: "Fortune Snake Outfit",
			cosmetic: Cosmetic.FortuneSnakeOutfit,
			cost: { eventTickets: 36 },
		},
		{
			name: "Fortune Vertical Poster",
			cosmetic: Cosmetic.FortuneVerticalPoster,
			cost: { candles: 5 },
		},
		{
			name: "Fortune Candle Flags",
			cosmetic: Cosmetic.FortuneCandleFlags,
			cost: { candles: 10 },
		},
		{
			name: "Fortune Plant",
			cosmetic: Cosmetic.FortunePlant,
			cost: { candles: 20 },
		},
		{
			name: "Fortune Hand Fan",
			cosmetic: Cosmetic.FortuneHandFan,
			cost: { money: 4.99 },
		},
		{
			name: "Fortune Snake Coif and Cloak",
			cosmetic: [Cosmetic.FortuneSnakeCoif, Cosmetic.FortuneSnakeCloak],
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0280", LINK_REDIRECTOR_URL)),
});
