import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 3, 13), end = skyDate(2026, 4, 3);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfBloom2026,
	name: "days-of-bloom",
	start: skyDate(2026, 3, 13),
	end: skyDate(2026, 4, 3),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 3, 13),
				end: skyDate(2026, 4, 2),
			},
		],
	},
	offer: [
		{
			translation: CosmeticCommon.Outfit,
			cosmetic: Cosmetic.DaysOfBloom2026Outfit,
			cost: { eventTickets: 26 },
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfBloom2026Hair,
			cost: { eventTickets: 18 },
		},
		{
			translation: CosmeticCommon.Cape,
			cosmetic: Cosmetic.DaysOfBloom2026Cape,
			cost: { eventTickets: 30 },
		},
		{
			cosmetic: Cosmetic.DaysOfBloom2026SunflowerRoundTable,
			cost: { candles: 26 },
		},
		{
			cosmetic: Cosmetic.DaysOfBloom2026SunflowerLadder,
			cost: { candles: 28 },
		},
		{
			cosmetic: Cosmetic.DaysOfBloom2026SunflowerSmallPillow,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.DaysOfBloom2026SunflowerRug,
			cost: { hearts: 8 },
		},
		{
			cosmetic: Cosmetic.DaysOfBloom2026SunflowerWallShelf,
			cost: { candles: 18 },
		},
		{
			cosmetic: Cosmetic.BloomSunflowerSundress,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.BloomSunflowerUmbrella,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.BloomSunflowerStuds,
			cost: { money: 2.99 },
		},
	],
});
