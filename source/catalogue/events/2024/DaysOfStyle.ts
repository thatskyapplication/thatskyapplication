import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
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
			bit: 1 << 0,
			cost: { eventCurrency: 15 },
		},
		{
			name: "Style Dazzling Dress",
			bit: 1 << 1,
			cost: { eventCurrency: 34 },
		},
		{
			name: "Style Dapper Trio",
			bit: 1 << 2,
			cost: { money: 14.99 },
		},
	],
});
