import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMusic2023,
	start: skyDate(2_023, 7, 3),
	end: skyDate(2_023, 7, 17),
	offer: [
		{
			name: "Music sheet",
			cosmetic: Cosmetic.DaysOfMusicMusicSheet,
			cost: { candles: 5 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Triumph Saxophone",
			cosmetic: Cosmetic.TriumphSaxophone,
			cost: { eventCurrency: 102 },
			emoji: HELD_PROPS_EMOJIS.HeldProp36,
		},
		{
			name: "Marching Band Hat",
			cosmetic: Cosmetic.MarchingBandHat,
			cost: { eventCurrency: 43 },
			emoji: HAIR_EMOJIS.Hair126,
		},
		{
			name: "Triumph Violin",
			cosmetic: Cosmetic.TriumphViolin,
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp35,
		},
	],
});
