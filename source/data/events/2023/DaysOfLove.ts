import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	id: EventId.DaysOfLove2023,
	start: skyDate(2_023, 2, 13),
	end: skyDate(2_023, 2, 27),
	offer: [
		{
			name: "Days of Love Flowery Archway",
			cosmetic: Cosmetic.DaysOfLoveFloweryArchway,
			cost: { candles: 100 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp31,
		},
		{
			name: "Days of Love Classy Cravat",
			cosmetic: Cosmetic.DaysOfLoveClassyCravat,
			cost: { money: 4.99 },
			emoji: NECKLACE_EMOJIS.Necklace28,
		},
		{
			name: "Days of Love Serendipitous Sceptre",
			cosmetic: Cosmetic.DaysOfLoveSerendipitousSceptre,
			cost: { money: 14.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp33,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/1096",
});
