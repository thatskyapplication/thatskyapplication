import { URL } from "node:url";
import { Event } from "../../../models/Event.js";
import { Cosmetic, EventId } from "../../../utility/catalogue.js";
import { LINK_REDIRECTOR_URL } from "../../../utility/constants.js";
import { skyDate } from "../../../utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../utility/emojis.js";

export default new Event({
	id: EventId.DaysOfFeast2020,
	start: skyDate(2_020, 12, 21),
	end: skyDate(2_021, 1, 4),
	offer: [
		{
			name: "Feast Neck Tie",
			cosmetic: Cosmetic.FeastNeckTie,
			cost: { hearts: 15 },
			emoji: NECKLACE_EMOJIS.Necklace09,
		},
		{
			name: "Days of Feast Cape",
			cosmetic: Cosmetic.DaysOfFeastCape,
			cost: { candles: 65 },
			emoji: CAPE_EMOJIS.Cape41,
		},
		{
			name: "Days of Feast Table",
			cosmetic: Cosmetic.DaysOfFeastTable,
			cost: { candles: 150 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp03,
		},
		{
			name: "Days of Feast Horns",
			cosmetic: Cosmetic.DaysOfFeastHorns,
			cost: { money: 14.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory11,
		},
		{
			name: "Snowflake Cape",
			cosmetic: Cosmetic.SnowflakeCape,
			cost: { money: 14.99 },
			emoji: CAPE_EMOJIS.Cape42,
		},
	],
	patchNotesURL: String(new URL("p0120", LINK_REDIRECTOR_URL)),
});
