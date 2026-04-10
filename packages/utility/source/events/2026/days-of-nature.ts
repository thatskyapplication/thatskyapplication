import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 4, 10), end = skyDate(2026, 4, 24);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfNature2026,
	name: "days-of-nature",
	start: skyDate(2026, 4, 10),
	end: skyDate(2026, 4, 24),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 4, 10),
				end: skyDate(2026, 4, 23),
			},
		],
	},
	offer: [
		{
			translation: CosmeticCommon.Hair,
			cosmetic: Cosmetic.DaysOfNature2026Hair,
			cost: { eventTickets: 22 },
		},
		{
			cosmetic: Cosmetic.DaysOfNature2026Prop1,
			cost: { eventTickets: 21 },
		},
		{
			cosmetic: Cosmetic.DaysOfNature2026Prop2,
			cost: { eventTickets: 17 },
		},
		{
			cosmetic: [Cosmetic.CharmingCreatureOutfit, Cosmetic.CharmingCreatureHeadAccessory],
			cosmeticDisplay: Cosmetic.CharmingCreatureOutfit,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.OceanVeilHairAccessory,
			cost: { money: 19.99 },
		},
	],
});
