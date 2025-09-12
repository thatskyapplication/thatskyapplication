import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2_025, 9, 1), end = skyDate(2_025, 9, 23);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfSunlight2025,
	start: skyDate(2_025, 9, 1),
	end: skyDate(2_025, 9, 23),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_025, 9, 1),
				end: skyDate(2_025, 9, 22),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.SunlightShawl,
			cost: { eventTickets: 22 },
		},
		{
			cosmetic: Cosmetic.SunlightWaveProjector,
			cost: { eventTickets: 45 },
		},
		{
			cosmetic: [Cosmetic.SunlightBonnetDress, Cosmetic.SunlightBonnetJellyfishHat],
			cosmeticDisplay: Cosmetic.SunlightBonnetJellyfishHat,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.SandcastlePiece1,
			cost: { candles: 5 },
		},
		{
			cosmetic: Cosmetic.SandcastlePiece2,
			cost: { candles: 5 },
		},
		{
			cosmetic: Cosmetic.SandcastlePiece3,
			cost: { candles: 6 },
		},
		{
			cosmetic: Cosmetic.SandcastlePiece4,
			cost: { candles: 7 },
		},
		{
			cosmetic: Cosmetic.SandcastlePiece5,
			cost: { candles: 5 },
		},
		{
			cosmetic: Cosmetic.SandcastlePiece6,
			cost: { candles: 8 },
		},
		{
			cosmetic: Cosmetic.SandcastlePiece7,
			cost: { candles: 5 },
		},
	],
	patchNotesURL: patchNotesRoute("0305"),
});
