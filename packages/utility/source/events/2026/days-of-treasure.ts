import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 5, 8), end = skyDate(2026, 5, 22);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfTreasure2026,
	name: "days-of-treasure",
	start: skyDate(2026, 5, 8),
	end: skyDate(2026, 5, 22),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 5, 8),
				end: skyDate(2026, 5, 21),
			},
		],
	},
	offer: [
		{
			translation: CosmeticCommon.Outfit,
			cosmetic: Cosmetic.DaysOfTreasure2026Outfit,
			cost: { eventTickets: 25 },
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfTreasure2026Hair,
			cost: { eventTickets: 14 },
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 1 },
			cosmetic: Cosmetic.DaysOfTreasure2026Prop1,
			cost: { eventTickets: 19 },
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 2 },
			cosmetic: Cosmetic.DaysOfTreasure2026Prop2,
			cost: { candles: 90 },
		},
		{
			cosmetic: Cosmetic.TreasureCoinCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.TreasureSeekersHat,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.TreasureMateCompanion,
			cost: { money: 2.99 },
		},
	],
});
