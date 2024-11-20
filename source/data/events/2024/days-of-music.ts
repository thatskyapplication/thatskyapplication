import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 11, 25), end = skyDate(2_024, 12, 9);
	start < end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 4,
	});
}

export default new Event({
	id: EventId.DaysOfMusic2024,
	start: skyDate(2_024, 11, 25),
	end: skyDate(2_024, 12, 9),
	eventCurrency: {
		amount: eventCurrencyAmount,
		pool: [
			{
				amount: 15,
				start: skyDate(2_024, 11, 25),
				end: skyDate(2_024, 12, 8),
			},
		],
	},
	offer: [
		{
			name: "Marching Band Cape",
			cosmetic: Cosmetic.MarchingBandCape,
			cost: { eventCurrency: 50 },
		},
		{
			name: "Music Marching Uniform",
			cosmetic: Cosmetic.MusicMarchingUniform,
			cost: { money: 9.99 },
		},
		{
			name: "Jam Station",
			cosmetic: Cosmetic.JamStation,
			cost: { candles: 250 },
		},
		{
			name: "Fledgling Upright Piano",
			cosmetic: Cosmetic.FledglingUprightPiano,
			cost: { money: 4.99 },
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1362",
});
