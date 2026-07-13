import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 7, 3), end = skyDate(2026, 7, 24);
	Temporal.ZonedDateTime.compare(start, end) < 0;
	start = start.add({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.SkyAnniversary2026,
	name: "sky-anniversary",
	start: skyDate(2026, 7, 3),
	end: skyDate(2026, 7, 24),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 7, 3),
				end: skyDate(2026, 7, 23),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.MomentsCameraUpgrade,
			cost: { eventTickets: 25 },
		},
		{
			translation: CosmeticCommon.HairAccessory,
			cosmetic: Cosmetic.SkyAnniversary2026HairAccessory,
			cost: { eventTickets: 18 },
		},
		{
			translation: CosmeticCommon.Prop,
			cosmetic: Cosmetic.SkyAnniversary2026HeldProp,
			cost: { eventTickets: 29 },
		},
		{
			cosmetic: Cosmetic.AnniversaryBlackAndBlueSwagHoodie,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.AnniversaryOreoSlippers,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.AnniversaryMothPlush,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.SkyCreatorAwardsCap,
		},
	],
});
