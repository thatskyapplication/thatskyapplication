import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2024, 12, 23), end = skyDate(2025, 1, 13);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	id: EventId.SkyXAlicesWonderlandCafe2024,
	start: skyDate(2_024, 12, 23),
	end: skyDate(2_025, 1, 13),
	eventCurrency: {
		amount: eventCurrencyAmount,
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
			cost: { eventCurrency: 18 },
		},
		{
			name: "Wonderland Frantic Hair",
			cosmetic: Cosmetic.WonderlandFranticHair,
			cost: { eventCurrency: 30 },
		},
		{
			name: "Wonderland Teacup Bath",
			cosmetic: Cosmetic.WonderlandTeacupBath,
			cost: { eventCurrency: 36 },
		},
		{
			name: "Wonderland Hare Hairstyle",
			cosmetic: Cosmetic.WonderlandHareHairstyle,
			cost: { candles: 150 },
		},
		{
			name: "Wonderland Primrose Pinafore Set",
			cosmetic: [
				Cosmetic.WonderlandPrimrosePinaforeHairAccessory,
				Cosmetic.WonderlandPrimrosePinaforeDress,
			],
			cost: { money: 11.99 },
		},
		{
			name: "Wonderland Cafe Corridor",
			cosmetic: Cosmetic.WonderlandCafeCorridor,
			cost: { money: 11.99 },
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1308",
});
