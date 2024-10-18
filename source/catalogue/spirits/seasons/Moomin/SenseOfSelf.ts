import { SeasonalSpirit } from "../../../../Structures/Spirits.js";
import { RealmName } from "../../../../Utility/Constants.js";
import { Cosmetic, SeasonId } from "../../../../Utility/catalogue.js";
import {
	HAIR_ACCESSORY_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	NECKLACE_EMOJIS,
	SEASON_EMOJIS,
	SHOE_EMOJIS,
} from "../../../../Utility/emojis.js";
import { SpiritName } from "../../../../Utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const musicSheet = MISCELLANEOUS_EMOJIS.MusicSheet;
const shoeEmoji = SHOE_EMOJIS.Shoe16;
const necklaceEmoji = NECKLACE_EMOJIS.Necklace44;
const hairAccessoryEmoji = HAIR_ACCESSORY_EMOJIS.HairAccessory49;

export default new SeasonalSpirit({
	name: SpiritName.SenseOfSelf,
	seasonId: SeasonId.Moomin,
	realm: RealmName.VaultOfKnowledge,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Music sheet",
				cosmetic: Cosmetic.SenseOfSelfMusicSheet,
				cost: { seasonalCandles: 12 },
				emoji: musicSheet,
			},
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.SenseOfSelfBlessing1,
				emoji: blessing3,
			},
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.SenseOfSelfBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing3,
			},
			{
				name: "Shoes",
				cosmetic: Cosmetic.SenseOfSelfShoes,
				emoji: shoeEmoji,
			},
			{
				name: "Neck accessory",
				cosmetic: Cosmetic.SenseOfSelfNeckAccessory,
				cost: { seasonalCandles: 24 },
				emoji: necklaceEmoji,
			},
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.SenseOfSelfBlessing3,
				emoji: blessing3,
			},
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.SenseOfSelfBlessing4,
				cost: { seasonalCandles: 28 },
				emoji: blessing3,
			},
			{
				name: "Hair accessory",
				cosmetic: Cosmetic.SenseOfSelfHairAccessory,
				emoji: hairAccessoryEmoji,
			},
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.SenseOfSelfSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.MoominHeart,
			},
		],
	},
});
