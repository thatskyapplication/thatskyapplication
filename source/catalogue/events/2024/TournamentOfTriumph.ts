import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS } from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 7, 28), end = skyDate(2_024, 8, 16);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({ date: start, amount: 2 });
}

eventCurrencyAmount.push({ date: skyDate(2_024, 8, 17), amount: 5 });

export default new Event({
	nameUnique: EventNameUnique.TournamentOfTriumph2024,
	start: skyDate(2_024, 7, 28),
	end: skyDate(2_024, 8, 17),
	eventCurrency: {
		amount: eventCurrencyAmount,
		pool: [
			{
				start: skyDate(2_024, 7, 28),
				end: skyDate(2_024, 8, 6),
				amount: 25,
			},
			{
				start: skyDate(2_024, 8, 7),
				end: skyDate(2_024, 8, 17),
				amount: 25,
			},
		],
	},
	offer: [
		{
			name: "Tournament Curls",
			bit: 1 << 0,
			cost: { eventCurrency: 25 },
			emoji: HAIR_EMOJIS.Hair148,
		},
		{
			name: "Tournament Torch",
			bit: 1 << 1,
			cost: { eventCurrency: 37 },
			emoji: HELD_PROPS_EMOJIS.HeldProp45,
		},
		{
			name: "Tournament Golden Garland",
			bit: 1 << 2,
			cost: { money: 4.99 },
		},
		{
			name: "Tournament Tunic",
			bit: 1 << 3,
			cost: { money: 9.99 },
		},
	],
});
