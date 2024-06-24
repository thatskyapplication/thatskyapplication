import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	NECKLACE_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfFeast2020,
	start: skyDate(2_020, 12, 21),
	end: skyDate(2_021, 1, 3),
	offer: [
		{ name: "Neck accessory", bit: 1 << 0, cost: { hearts: 15 }, emoji: NECKLACE_EMOJIS.Necklace09 },
		{ name: "Cape", bit: 1 << 1, cost: { candles: 65 }, emoji: CAPE_EMOJIS.Cape41 },
		{ name: "Prop", bit: 1 << 2, cost: { candles: 150 }, emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp03 },
		{ name: "Days of Feast Horns", bit: 1 << 3, cost: { money: 14.99 }, emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory11 },
		{ name: "Snowflake Cape", bit: 1 << 4, cost: { money: 14.99 }, emoji: CAPE_EMOJIS.Cape42 },
	],
});
