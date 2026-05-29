import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 5, 29), end = skyDate(2026, 6, 19);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfColour2026,
	name: "days-of-colour",
	start: skyDate(2026, 5, 29),
	end: skyDate(2026, 6, 19),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 5, 29),
				end: skyDate(2026, 6, 18),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.DaysOfColour2026ButterflyKite,
			cost: { eventTickets: 19 },
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfColour2026Hair,
			cost: { eventTickets: 21 },
		},
		{
			translation: CosmeticCommon.Cape,
			cosmetic: Cosmetic.DaysOfColour2026Cape,
			cost: { eventTickets: 30 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026CrabKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026BirdKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026MantaKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026JellyfishKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026TurtleKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026ManateeKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026WhaleKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfColour2026LighthornKite,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.RainbowBeret,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.RainbowTiedJumpsuit,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.RainbowMask,
			cost: { money: 4.99 },
		},
	],
});
