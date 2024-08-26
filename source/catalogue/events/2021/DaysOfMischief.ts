import { Event } from "../../../Structures/Event.js";
import { EventNameUnique } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	FACE_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	LARGE_PLACEABLE_PROPS_EMOJIS,
	OUTFIT_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	nameUnique: EventNameUnique.DaysOfMischief2021,
	start: skyDate(2_021, 10, 18),
	end: skyDate(2_021, 11, 7),
	offer: [
		{ name: "Hair", bit: 1 << 0, cost: { candles: 66 }, emoji: HAIR_EMOJIS.Hair95 },
		{ name: "Cape", bit: 1 << 1, cost: { candles: 99 }, emoji: CAPE_EMOJIS.Cape67 },
		{
			name: "Prop",
			bit: 1 << 2,
			cost: { hearts: 33 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp19,
		},
		{
			name: "Mischief Witch Jumper",
			bit: 1 << 3,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit28,
		},
		{
			name: "Mischief Withered Antlers",
			bit: 1 << 6,
			cost: { money: 9.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory14,
		},
		{ name: "Mischief Spider Hair", bit: 1 << 4, cost: { money: 4.99 }, emoji: HAIR_EMOJIS.Hair96 },
		{
			name: "Mischief Pumpkin Prop",
			bit: 1 << 5,
			cost: { money: 1.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp08,
		},
	],
});
