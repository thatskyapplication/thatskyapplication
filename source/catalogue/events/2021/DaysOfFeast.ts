import { Event } from "../../../Structures/Event.js";
import { Cosmetic, EventId } from "../../../Utility/catalogue.js";
import { skyDate } from "../../../Utility/dates.js";
import {
	CAPE_EMOJIS,
	HAIR_ACCESSORY_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../Utility/emojis.js";

export default new Event({
	id: EventId.DaysOfFeast2021,
	start: skyDate(2_021, 12, 20),
	end: skyDate(2_022, 1, 10),
	offer: [
		{
			name: "Ode to Joy music sheet",
			cosmetic: Cosmetic.OdeToJoyMusicSheet,
			cost: { candles: 10 },
			emoji: MISCELLANEOUS_EMOJIS.MusicSheet,
		},
		{
			name: "Winter Feast Pillow",
			cosmetic: Cosmetic.WinterFeastPillow,
			cost: { candles: 10 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp10,
		},
		{
			name: "Winter Feast Scarf",
			cosmetic: Cosmetic.WinterFeastScarf,
			cost: { candles: 50 },
			emoji: NECKLACE_EMOJIS.Necklace17,
		},
		{
			name: "Winter Feast Hat",
			cosmetic: Cosmetic.WinterFeastHat,
			cost: { hearts: 20 },
			emoji: HAIR_EMOJIS.Hair97,
		},
		{
			name: "Snowflake Hair Accessory",
			cosmetic: Cosmetic.SnowflakeHairAccessory,
			cost: { money: 1.99 },
			emoji: HAIR_ACCESSORY_EMOJIS.HairAccessory14,
		},
		{
			name: "Winter Ancestor Cape",
			cosmetic: Cosmetic.WinterAncestorCape,
			cost: { money: 9.99 },
			emoji: CAPE_EMOJIS.Cape68,
		},
		{
			name: "Winter Feast Snowglobe",
			cosmetic: Cosmetic.WinterFeastSnowGlobe,
			cost: { money: 9.99 },
			emoji: SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp11,
		},
	],
});
