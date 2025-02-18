import { URL } from "node:url";
import { Cosmetic, skyDate } from "@thatskyapplication/utility";
import { Event } from "../../../models/Event.js";
import { EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfFeast2022,
	start: skyDate(2_022, 12, 19),
	end: skyDate(2_023, 1, 9),
	offer: [
		{
			name: "Feast Goggles",
			cosmetic: Cosmetic.FeastGoggles,
			cost: { candles: 50 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory22,
		},
		{
			name: "Snowkid Prop",
			cosmetic: Cosmetic.SnowkidProp,
			cost: { candles: 120 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp27,
		},
		{
			name: "Tournament Skyball Set",
			cosmetic: Cosmetic.TournamentSkyballSet,
			cost: { money: 14.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp21,
		},
		{
			name: "Cosy Hermit Cape",
			cosmetic: Cosmetic.CosyHermitCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape97,
		},
	],
	patchNotesURL: String(new URL("p0195", LINK_REDIRECTOR_URL)),
});
