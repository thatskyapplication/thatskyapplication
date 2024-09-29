import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	HELD_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
} from "../../../Utility/emojis.js";

const eventCurrencyAmount = [];

for (
	let start = skyDate(2_024, 7, 29), end = skyDate(2_024, 8, 17);
	start <= end;
	start = start.plus({ days: 1 })
) {
	eventCurrencyAmount.push({ date: start, amount: 2 });
}

eventCurrencyAmount.push({ date: skyDate(2_024, 8, 18), amount: 5 });

export default new Event({
	nameUnique: EventNameUnique.TournamentOfTriumph2024,
	start: skyDate(2_024, 7, 29),
	end: skyDate(2_024, 8, 19),
	eventCurrency: {
		amount: eventCurrencyAmount,
		pool: [
			{
				start: skyDate(2_024, 7, 29),
				end: skyDate(2_024, 8, 7),
				amount: 25,
			},
			{
				start: skyDate(2_024, 8, 8),
				end: skyDate(2_024, 8, 17),
				amount: 25,
			},
		],
	},
	offer: [
		{
			name: "Tournament Curls",
			cosmetic: Cosmetic.TournamentCurls,
			cost: { eventCurrency: 25 },
			emoji: HAIR_EMOJIS.Hair148,
		},
		{
			name: "Tournament Torch",
			cosmetic: Cosmetic.TournamentTorch,
			cost: { eventCurrency: 37 },
			emoji: HELD_PROPS_EMOJIS.HeldProp45,
		},
		{
			name: "Tournament Golden Garland",
			cosmetic: Cosmetic.TournamentGoldenGarland,
			cost: { money: 4.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory44,
		},
		{
			name: "Tournament Tunic",
			cosmetic: Cosmetic.TournamentTunic,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit64,
		},
	],
});
