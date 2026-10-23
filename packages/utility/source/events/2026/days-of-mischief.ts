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
		},
		{
			translation: CosmeticCommon.Outfit,
			cosmetic: Cosmetic.DaysOfMischief2026Outfit,
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfMischief2026Hair,
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 2 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop2,
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 3 },
			cosmetic: Cosmetic.DaysOfMischief2026Prop3,
		},
		{
			cosmetic: Cosmetic.MischiefMagicalHat,
		},
		{
			cosmetic: Cosmetic.MischiefImpishWings,
		},
		{
			cosmetic: Cosmetic.MischiefFelineFriend,
		},
	],
});
