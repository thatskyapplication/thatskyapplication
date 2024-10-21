import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
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
	id: EventId.DaysOfMischief2021,
	start: skyDate(2_021, 10, 18),
	end: skyDate(2_021, 11, 8),
	offer: [
		{
			name: "Mischief Witch Hair",
			cosmetic: Cosmetic.MischiefWitchHair,
			cost: { candles: 66 },
			emoji: HAIR_EMOJIS.Hair95,
		},
		{
			name: "Mischief Withered Cape",
			cosmetic: Cosmetic.MischiefWitheredCape,
			cost: { candles: 99 },
			emoji: CAPE_EMOJIS.Cape67,
		},
		{
			name: "Mischief Spooky Dining Set",
			cosmetic: Cosmetic.MischiefSpookyDiningSet,
			cost: { hearts: 33 },
			emoji: LARGE_PLACEABLE_PROPS_EMOJIS.LargePlaceableProp19,
		},
		{
			name: "Mischief Witch Jumper",
			cosmetic: Cosmetic.MischiefWitchJumper,
			cost: { money: 9.99 },
			emoji: OUTFIT_EMOJIS.Outfit28,
		},
		{
			name: "Mischief Withered Antlers",
			cosmetic: Cosmetic.MischiefWitheredAntlers,
			cost: { money: 9.99 },
			emoji: FACE_ACCESSORY_EMOJIS.FaceAccessory14,
		},
		{
			name: "Mischief Spider Quiff",
			cosmetic: Cosmetic.MischiefSpiderQuiff,
			cost: { money: 4.99 },
			emoji: HAIR_EMOJIS.Hair96,
		},
		{
			name: "Mischief Pumpkin Prop",
			cosmetic: Cosmetic.MischiefPumpkinProp,
			cost: { money: 1.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp08,
		},
	],
	patchNotesURL: "https://thatgamecompany.helpshift.com/hc/en/17/faq/841",
});
