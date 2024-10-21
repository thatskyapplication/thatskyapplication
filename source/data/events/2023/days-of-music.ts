import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { HAIR_EMOJIS, HELD_PROPS_EMOJIS, MISCELLANEOUS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfMusic2023,
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
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1117",
});
