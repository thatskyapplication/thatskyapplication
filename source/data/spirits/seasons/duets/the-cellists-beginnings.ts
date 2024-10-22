import { SeasonalSpirit } from "../../../../models/Spirits.js";
import { Cosmetic, SeasonId } from "../../../../utility/catalogue.js";
import {
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";
import { SpiritName } from "../../../../utility/spirits.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit60;
const hairEmoji = HAIR_EMOJIS.Hair146;
const smallPlaceablePropEmoji = SMALL_PLACEABLE_PROPS_EMOJIS.SmallPlaceableProp73;

export default new SeasonalSpirit({
	name: SpiritName.TheCellistsBeginnings,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Hair",
				cosmetic: Cosmetic.TheCellistsBeginningsHair,
				cost: { seasonalCandles: 20 },
				emoji: hairEmoji,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.TheCellistsBeginningsBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TheCellistsBeginningsBlessing2,
				cost: { seasonalCandles: 26 },
				emoji: blessing3,
			},
			{
				name: "Prop",
				cosmetic: Cosmetic.TheCellistsBeginningsProp,
				emoji: smallPlaceablePropEmoji,
			},
			{
				name: "Outfit",
				cosmetic: Cosmetic.TheCellistsBeginningsOutfit,
				cost: { seasonalCandles: 32 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 4", cosmetic: Cosmetic.TheCellistsBeginningsBlessing4, emoji: blessing3 },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TheCellistsBeginningsSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
