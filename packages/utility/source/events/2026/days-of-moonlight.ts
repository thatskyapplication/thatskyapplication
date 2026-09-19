import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventFamilyId, EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 9, 19), end = skyDate(2026, 10, 10);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfMoonlight2026,
	name: "days-of-moonlight",
	family: EventFamilyId.DaysOfMoonlight,
	start: skyDate(2026, 9, 19),
	end: skyDate(2026, 10, 10),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 9, 19),
				end: skyDate(2026, 10, 9),
			},
		],
	},
	offer: [
		{
			translation: CosmeticCommon.HeadAccessory,
			cosmetic: Cosmetic.DaysOfMoonlight2026HeadAccessory,
			cost: { eventTickets: 16 },
		},
		{
			translation: CosmeticCommon.Prop,
			cosmetic: Cosmetic.DaysOfMoonlight2026Prop,
			cost: { eventTickets: 18 },
		},
		{
			translation: CosmeticCommon.Outfit,
			cosmetic: Cosmetic.DaysOfMoonlight2026Outfit,
			cost: { eventTickets: 46 },
		},
		{
			cosmetic: Cosmetic.MoonlightLute,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.MoonlightNimbus,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.MoonlightVeil,
			cost: { money: 2.99 },
		},
	],
});
