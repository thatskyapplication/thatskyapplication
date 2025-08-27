import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
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
			cosmetic: Cosmetic.DragonDanceMusicSheet,
			cost: { eventTickets: 8 },
		},
		{
			cosmetic: Cosmetic.FortuneRedDye,
			cost: { eventTickets: 10 },
		},
		{
			cosmetic: Cosmetic.FortuneSnakeMask,
			cost: { eventTickets: 14 },
		},
		{
			cosmetic: Cosmetic.FortuneSnakeOutfit,
			cost: { eventTickets: 36 },
		},
		{
			cosmetic: Cosmetic.FortuneVerticalPoster,
			cost: { candles: 5 },
		},
		{
			cosmetic: Cosmetic.FortuneCandleFlags,
			cost: { candles: 10 },
		},
		{
			cosmetic: Cosmetic.FortunePlant,
			cost: { candles: 20 },
		},
		{
			cosmetic: Cosmetic.FortuneHandFan,
			cost: { money: 4.99 },
		},
		{
			cosmetic: [Cosmetic.FortuneSnakeCoif, Cosmetic.FortuneSnakeCloak],
			cosmeticDisplay: Cosmetic.FortuneSnakeCloak,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0280"),
});
