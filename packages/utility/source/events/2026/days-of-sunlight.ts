import { Cosmetic, CosmeticCommon, CosmeticPackName } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventFamily, EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 7, 30), end = skyDate(2026, 8, 21);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfSunlight2026,
	name: "days-of-sunlight",
	family: EventFamily.DaysOfSunlight,
	start: skyDate(2026, 7, 31),
	end: skyDate(2026, 8, 21),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 7, 30),
				end: skyDate(2026, 8, 20),
			},
		],
	},
	offer: [
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 1 },
			cosmetic: Cosmetic.DaysOfSunlight2026Prop1,
			cost: { eventTickets: 38 },
		},
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfSunlight2026Hair,
			cost: { eventTickets: 21 },
		},
		{
			translation: CosmeticCommon.Mask,
			cosmetic: Cosmetic.DaysOfSunlight2026Mask,
			cost: { eventTickets: 23 },
		},
		{
			translation: { key: CosmeticCommon.PropMultiple, number: 2 },
			cosmetic: Cosmetic.DaysOfSunlight2026Prop2,
			cost: { candles: 5 },
		},
		{
			cosmetic: [Cosmetic.SunlightDiverDuoOutfit, Cosmetic.SunlightDiverDuoShoes],
			cosmeticDisplay: Cosmetic.SunlightDiverDuoOutfit,
			packName: CosmeticPackName.SunlightDiverDuo,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.SunlightSportySunglasses,
			cost: { money: 2.99 },
		},
		{
			cosmetic: Cosmetic.SunlightCrabFloat,
			cost: { money: 3.99 },
		},
	],
});
