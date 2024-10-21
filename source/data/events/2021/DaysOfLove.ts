import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { skyDate } from "../../../utility/dates.js";
import { MASK_EMOJIS, SMALL_PLACEABLE_PROPS_EMOJIS } from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfLove2021,
	start: skyDate(2_021, 2, 12, 12),
	end: skyDate(2_021, 2, 21, 12),
	offer: [
		{
			name: "Mask",
			cosmetic: Cosmetic.DaysOfLoveMask,
			cost: { hearts: 15 },
			emoji: MASK_EMOJIS.Mask43,
		},
		{
			name: "Days of Love Seesaw Pack",
			cosmetic: Cosmetic.DaysOfLoveSeesaw,
			cost: { candles: 66 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp02,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/761",
});
