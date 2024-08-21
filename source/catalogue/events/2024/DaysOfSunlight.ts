import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 8, 26), end = skyDate(2_024, 9, 8);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({
		date: start,
		amount: 6,
	});
}

export default new Event({
	nameUnique: EventNameUnique.DaysOfSunlight2024,
	start: skyDate(2_024, 8, 26),
	end: skyDate(2_024, 9, 8),
	eventCurrency: {
		amount: eventCurrencyAmount,
	},
	offer: [
		{
			name: "Sunlight Manta Float",
			bit: 1 << 0,
			cost: { eventCurrency: 20 },
		},
		{
			name: "Sunlight Beach Shorts outfit",
			bit: 1 << 1,
			cost: { eventCurrency: 30 },
		},
		{
			name: "Sunlight Helios Hoops earrings",
			bit: 1 << 2,
			cost: { money: 2.99 },
		},
		{
			name: "Sunlight Woven Wrap cape",
			bit: 1 << 3,
			cost: { money: 14.99 },
		},
	],
});
