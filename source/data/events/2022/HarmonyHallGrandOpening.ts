import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility2/catalogue.js";
import { skyDate } from "../../../Utility2/dates.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	MISCELLANEOUS_EMOJIS,
} from "../../../Utility2/emojis.js";

export default new Event({
	id: EventId.HarmonyHallGrandOpening2022,
	start: skyDate(2_022, 5, 23),
	end: skyDate(2_022, 6, 6),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.HarmonyHallGrandOpeningHairAccessory,
			cost: { candles: 50 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory20,
		},
		{
			name: "Music sheet 1",
			cosmetic: Cosmetic.HarmonyHallMusicSheet1,
			cost: { candles: 10 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Music sheet 2",
			cosmetic: Cosmetic.HarmonyHallMusicSheet2,
			cost: { candles: 10 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Music sheet 3",
			cosmetic: Cosmetic.HarmonyHallMusicSheet3,
			cost: { candles: 10 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Music sheet 4",
			cosmetic: Cosmetic.HarmonyHallMusicSheet4,
			cost: { candles: 10 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Fledgling Harp",
			cosmetic: Cosmetic.FledglingHarp,
			cost: { money: 4.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp26,
		},
		{
			name: "Rhythm Guitar",
			cosmetic: Cosmetic.RhythmGuitar,
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp27,
		},
		{
			name: "Triumph Handpan",
			cosmetic: Cosmetic.TriumphHandpan,
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp28,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/904",
});
