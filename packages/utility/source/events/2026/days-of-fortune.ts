import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2026, 2, 13), end = skyDate(2026, 2, 27);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.DaysOfFortune2026,
	start: skyDate(2026, 2, 13),
	end: skyDate(2026, 2, 27),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2026, 2, 13),
				end: skyDate(2026, 2, 26),
			},
		],
	},
	offer: [
		{
			translation: CosmeticCommon.Mask,
			cosmetic: Cosmetic.DaysOfFortune2026Mask,
			cost: { eventTickets: 12 },
		},
		{
			translation: CosmeticCommon.Cape,
			cosmetic: Cosmetic.DaysOfFortune2026Cape,
			cost: { eventTickets: 48 },
		},
		{
			cosmetic: Cosmetic.DaysOfFortune2026CarouselMusicBox,
			cost: { hearts: 22 },
		},
		{
			cosmetic: Cosmetic.FortunePlushMount,
			cost: { money: 19.99 },
		},
		{
			cosmetic: Cosmetic.FortunePleatedDress,
			cost: { money: 9.99 },
		},
		{
			cosmetic: Cosmetic.FortuneRibbonedPonytail,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.FortuneTokenGlasses,
			cost: { money: 2.99 },
		},
	],
});
