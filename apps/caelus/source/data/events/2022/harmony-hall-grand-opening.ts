import { URL } from "node:url";
import { Cosmetic, EventId, LINK_REDIRECTOR_URL, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";

export default new Event({
	id: EventId.HarmonyHallGrandOpening2022,
	start: skyDate(2_022, 5, 23),
	end: skyDate(2_022, 6, 6),
	offer: [
		{
			name: "Hair accessory",
			cosmetic: Cosmetic.HarmonyHallGrandOpeningHairAccessory,
			cost: { candles: 50 },
		},
		{
			name: "Music sheet 1",
			cosmetic: Cosmetic.HarmonyHallMusicSheet1,
			cost: { candles: 10 },
		},
		{
			name: "Music sheet 2",
			cosmetic: Cosmetic.HarmonyHallMusicSheet2,
			cost: { candles: 10 },
		},
		{
			name: "Music sheet 3",
			cosmetic: Cosmetic.HarmonyHallMusicSheet3,
			cost: { candles: 10 },
		},
		{
			name: "Music sheet 4",
			cosmetic: Cosmetic.HarmonyHallMusicSheet4,
			cost: { candles: 10 },
		},
		{
			name: "Fledgling Harp",
			cosmetic: Cosmetic.FledglingHarp,
			cost: { money: 4.99 },
		},
		{
			name: "Rhythm Guitar",
			cosmetic: Cosmetic.RhythmGuitar,
			cost: { money: 14.99 },
		},
		{
			name: "Triumph Handpan",
			cosmetic: Cosmetic.TriumphHandpan,
			cost: { money: 19.99 },
		},
	],
	patchNotesURL: String(new URL("p0175", LINK_REDIRECTOR_URL)),
});
