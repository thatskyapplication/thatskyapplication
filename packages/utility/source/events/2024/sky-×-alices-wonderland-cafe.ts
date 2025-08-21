import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

const eventTicketAmount: EventTicketsAmountData[] = [];

for (
	let start = skyDate(2024, 12, 23), end = skyDate(2025, 1, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventTicketAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.SkyXAlicesWonderlandCafe2024,
	start: skyDate(2_024, 12, 23),
	end: skyDate(2_025, 1, 13),
	eventTickets: {
		amount: eventTicketAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_024, 12, 23),
				end: skyDate(2025, 1, 12),
			},
		],
	},
	offer: [
		{
			cosmetic: Cosmetic.WonderlandStackedHat,
			cost: { eventTickets: 18 },
		},
		{
			cosmetic: Cosmetic.WonderlandFranticHair,
			cost: { eventTickets: 30 },
		},
		{
			cosmetic: Cosmetic.WonderlandTeacupBath,
			cost: { eventTickets: 36 },
		},
		{
			cosmetic: Cosmetic.WonderlandHareHairstyle,
			cost: { candles: 150 },
		},
		{
			cosmetic: [
				Cosmetic.WonderlandPrimrosePinaforeDress,
				Cosmetic.WonderlandPrimrosePinaforeHairAccessory,
			],
			cosmeticDisplay: Cosmetic.WonderlandPrimrosePinaforeDress,
			cost: { money: 11.99 },
		},
		{
			cosmetic: Cosmetic.WonderlandCafeCorridor,
			cost: { money: 11.99 },
		},
	],
	patchNotesURL: patchNotesRoute("p0275"),
});
