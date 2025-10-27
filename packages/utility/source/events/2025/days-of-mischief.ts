import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 10, 27), end = skyDate(2_025, 11, 17);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfMischief2025,
	start: skyDate(2_025, 10, 27),
	end: skyDate(2_025, 11, 17),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 10, 27),
				end: skyDate(2_025, 11, 16),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.MischiefPuzzlewrightsBrimmedHat,
			cost: { money: 4.99 },
		},
		{
			cosmetic: [Cosmetic.MischiefFelineEars, Cosmetic.MischiefFelineTail],
			cosmeticDisplay: Cosmetic.MischiefFelineEars,
			cost: { money: 11.99 },
		},
		{
			cosmetic: Cosmetic.MischiefBeakMask,
			cost: { eventTickets: 22 },
		},
		{
			cosmetic: Cosmetic.MischiefGothCape,
			cost: { eventTickets: 50 },
		},
		{
			cosmetic: Cosmetic.MischiefLeafHat,
			cost: { eventTickets: 12 },
		},
		{
			cosmetic: Cosmetic.MischiefCrabkinLamp,
			cost: { ascendedCandles: 10 },
		},
		{
			cosmetic: Cosmetic.MischiefCobwebDecor,
			cost: { candles: 5 },
		},
		{
			cosmetic: Cosmetic.MischiefDarkDragonRug,
			cost: { hearts: 5 },
		},
		{
			cosmetic: Cosmetic.MischiefWitheredSapling,
			cost: { candles: 20 },
		},
		{
			cosmetic: Cosmetic.MischiefSymbol1,
			cost: { candles: 4 },
		},
		{
			cosmetic: Cosmetic.MischiefSymbol2,
			cost: { candles: 4 },
		},
		{
			cosmetic: Cosmetic.MischiefSymbol3,
			cost: { candles: 4 },
		},
		{
			cosmetic: Cosmetic.MischiefSymbol4,
			cost: { candles: 4 },
		},
		{
			cosmetic: Cosmetic.PuzzleBox,
			cost: { candles: 10 },
		},
		{
			cosmetic: Cosmetic.PuzzleChest,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.PuzzleCage,
			cost: { candles: 20 },
		},
	],
	patchNotesURL: patchNotesRoute("31"),
});
