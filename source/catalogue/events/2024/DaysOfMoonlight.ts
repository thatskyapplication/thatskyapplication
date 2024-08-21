import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 9, 16), end = skyDate(2_024, 9, 29);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 5,
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfMoonlight2024,
	start: skyDate(2_024, 9, 16),
	end: skyDate(2_024, 9, 29),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Moonlight Blossom Accessory",
			bit: 1 << 0,
			cost: { eventCurrency: 17 },
		},
		{
			name: "Moonlight Lantern Decoration",
			bit: 1 << 1,
			cost: { eventCurrency: 32 },
		},
		{
			name: "Moonlight Earrings",
			bit: 1 << 2,
			cost: { money: 2.99 },
		},
		{
			name: "Moonlight Frock and Updo",
			bit: 1 << 3,
			cost: { money: 14.99 },
		},
	],
});
