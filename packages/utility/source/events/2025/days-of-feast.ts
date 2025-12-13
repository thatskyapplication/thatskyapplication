import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2025, 12, 12), end = skyDate(2026, 1, 2);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({ date: start, amount: 5 });
}

export default new Event({
	id: EventId.DaysOfFeast2025,
	start: skyDate(2025, 12, 12),
	end: skyDate(2026, 1, 2),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2025, 12, 12),
				end: skyDate(2026, 1, 1),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.WinterScarfCape,
			cost: { money: 14.99 },
		},
		{
			cosmetic: [Cosmetic.FluffyWinterWearHairAccessory, Cosmetic.FluffyWinterWearShoes],
			cosmeticDisplay: Cosmetic.FluffyWinterWearHairAccessory,
			cost: { money: 6.99 },
		},
		{
			cosmetic: Cosmetic.SnowkidAccessory,
			cost: { money: 1.99 },
		},
		{
			translation: CosmeticCommon.Cape,
			cosmetic: Cosmetic.DaysOfFeast2025Cape,
			cost: { eventTickets: 45 },
		},
		{
			translation: CosmeticCommon.Outfit,
			cosmetic: Cosmetic.DaysOfFeast2025Outfit,
			cost: { eventTickets: 39 },
		},
	],
});
