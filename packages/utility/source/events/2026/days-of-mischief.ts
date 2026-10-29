import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 10, 23), end = skyDate(2026, 11, 13);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfMischief2026,
	name: "days-of-mischief",
	family: EventFamilyId.DaysOfMischief,
	start: skyDate(2026, 10, 23),
	end: skyDate(2026, 11, 13),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 10, 23),
				end: skyDate(2026, 11, 12),
			},
		],
	},
	offer: [
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 1 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop1,
			cost: { eventTickets: 32 },
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfMischief2026Hair,
			cost: { eventTickets: 19 },
		},
		{
			translation: CosmeticCommon.Outfit,
			cosmetic: Cosmetic.DaysOfMischief2026Outfit,
			cost: { eventTickets: 27 },
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 2 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop2,
			cost: { candles: 20 },
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 3 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop3,
			cost: { candles: 15 },
		},
		{
			cosmetic: Cosmetic.MischiefImpishWings,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.MischiefMagicalHat,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.MischiefFelineFriend,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.CommemorativeBoboCandle,
		},
	],
});
