import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	id: EventId.DaysOfSunlight2022,
	start: skyDate(2_022, 8, 22),
	end: skyDate(2_022, 9, 12),
	offer: [
		{
			name: "Campfire Tent",
			cosmetic: Cosmetic.CampfireTent,
			cost: { candles: 90 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp25,
		},
		{
			name: "Jelly Shoulder Buddy",
			cosmetic: Cosmetic.JellyShoulderBuddy,
			cost: { money: 2.99 },
			emoji: NECKLACE_EMOJIS.Necklace23,
		},
		{
			name: "Campfire Snack Kit",
			cosmetic: Cosmetic.CampfireSnackKit,
			cost: { money: 19.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp18,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/938",
});
