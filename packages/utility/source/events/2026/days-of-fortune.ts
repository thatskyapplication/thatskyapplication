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
		},
		{
			translation: CosmeticCommon.Cape,
			cosmetic: Cosmetic.DaysOfFortune2026Cape,
		},
		{
			cosmetic: Cosmetic.DaysOfFortune2026CarosuelMusicBox,
		},
		{
			cosmetic: Cosmetic.FortunePlushMount,
		},
		{
			cosmetic: Cosmetic.FortunePleatedDress,
		},
		{
			cosmetic: Cosmetic.FortuneRibbonedPonytail,
		},
	],
});
