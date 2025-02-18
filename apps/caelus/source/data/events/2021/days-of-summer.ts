import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	HELD_PROPS_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfSummer2021,
	start: skyDate(2_021, 8, 12),
	end: skyDate(2_021, 8, 26),
	offer: [
		{
			name: "Double Deck Chairs",
			cosmetic: Cosmetic.DoubleDeckChairs,
			cost: { hearts: 16 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp13,
		},
		{
			name: "Summer Hat",
			cosmetic: Cosmetic.SummerHat,
			cost: { candles: 44 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory07,
		},
		{
			name: "Summer Umbrella",
			cosmetic: Cosmetic.SummerUmbrella,
			cost: { money: 19.99 },
			emoji: HELD_PROPS_EMOJIS.HeldProp23,
		},
		{
			name: "Summer Shell Hair Pin",
			cosmetic: Cosmetic.SummerShellHairPin,
			cost: { money: 0.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory08,
		},
	],
	patchNotesURL: String(new URL("p0145", LINK_REDIRECTOR_URL)),
});
