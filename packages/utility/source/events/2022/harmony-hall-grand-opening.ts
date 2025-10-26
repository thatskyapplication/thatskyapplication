import { Cosmetic, CosmeticCommon } from "../../cosmetics.js";
import { skyDate } from "../../dates.js";
import { Event } from "../../models/event.js";
import { patchNotesRoute } from "../../routes.js";
import { EventId } from "../../utility/event.js";

export default new Event({
	id: EventId.HarmonyHallGrandOpening2022,
	start: skyDate(2_022, 5, 23),
	end: skyDate(2_022, 6, 6),
	offer: [
		{
			translation: CosmeticCommon.HairAccessory,
			cosmetic: Cosmetic.HarmonyHallGrandOpeningHairAccessory,
			cost: { candles: 50 },
		},
		{
			translation: { key: CosmeticCommon.MusicSheetMultiple, number: 1 },
			cosmetic: Cosmetic.HarmonyHallMusicSheet1,
			cost: { candles: 10 },
		},
		{
			translation: { key: CosmeticCommon.MusicSheetMultiple, number: 2 },
			cosmetic: Cosmetic.HarmonyHallMusicSheet2,
			cost: { candles: 10 },
		},
		{
			translation: { key: CosmeticCommon.MusicSheetMultiple, number: 3 },
			cosmetic: Cosmetic.HarmonyHallMusicSheet3,
			cost: { candles: 10 },
		},
		{
			translation: { key: CosmeticCommon.MusicSheetMultiple, number: 4 },
			cosmetic: Cosmetic.HarmonyHallMusicSheet4,
			cost: { candles: 10 },
		},
		{
			cosmetic: Cosmetic.FledglingHarp,
			cost: { money: 4.99 },
		},
		{
			cosmetic: Cosmetic.RhythmGuitar,
			cost: { money: 14.99 },
		},
		{
			cosmetic: Cosmetic.TriumphHandpan,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: patchNotesRoute("0175"),
});
