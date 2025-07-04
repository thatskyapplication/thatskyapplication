import { Cosmetic } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event, type EventTicketsAmountData } from "../../models/event.js";
import { LINK_REDIRECTOR_URL } from "../../utility/constants.js";
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
			name: "Wonderland Stacked Hat",
			cosmetic: Cosmetic.WonderlandStackedHat,
			cost: { eventTickets: 18 },
		},
		{
			name: "Wonderland Frantic Hair",
			cosmetic: Cosmetic.WonderlandFranticHair,
			cost: { eventTickets: 30 },
		},
		{
			name: "Wonderland Teacup Bath",
			cosmetic: Cosmetic.WonderlandTeacupBath,
			cost: { eventTickets: 36 },
		},
		{
			name: "Wonderland Hare Hairstyle",
			cosmetic: Cosmetic.WonderlandHareHairstyle,
			cost: { candles: 150 },
		},
		{
			name: "Wonderland Primrose Pinafore Set",
			cosmetic: [
				Cosmetic.WonderlandPrimrosePinaforeDress,
				Cosmetic.WonderlandPrimrosePinaforeHairAccessory,
			],
			cosmeticDisplay: Cosmetic.WonderlandPrimrosePinaforeDress,
			cost: { money: 11.99 },
		},
		{
			name: "Wonderland Cafe Corridor",
			cosmetic: Cosmetic.WonderlandCafeCorridor,
			cost: { money: 11.99 },
		},
	],
	patchNotesURL: String(new URL("p0275", LINK_REDIRECTOR_URL)),
});
