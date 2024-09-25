import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 9, 30), end = skyDate(2_024, 10, 13);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfStyle2024,
	start: skyDate(2_024, 9, 30),
	end: skyDate(2_024, 10, 13),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Style Darkness Fascinator",
			cosmetic: Cosmetic.StyleDarknessFascinator,
			cost: { eventCurrency: 15 },
		},
		{
			name: "Style Dazzling Dress",
			cosmetic: Cosmetic.StyleDazzlingDress,
			cost: { eventCurrency: 34 },
		},
		{
			name: "Style Dapper Trio",
			cosmetic: Cosmetic.StyleDapperTrio,
			cost: { money: 14.99 },
		},
	],
});
