import { URL } from "node:url";
import { Cosmetic } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

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
	patchNotesURL: String(new URL("p0185", LINK_REDIRECTOR_URL)),
});
