import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
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
});
