import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
	SMALL_PLACEABLE_PROPS_EMOJIS,
} from "../../../../utility/emojis.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit62;
const capeEmoji = CAPE_EMOJIS.Cape134;
const { SmallPlaceableProp77, SmallPlaceableProp78 } = SMALL_PLACEABLE_PROPS_EMOJIS;

export default new SeasonalSpirit({
	id: SpiritId.TheCellistsFlourishing,
	seasonId: SeasonId.Duets,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Prop 1",
				cosmetic: Cosmetic.TheCellistsFlourishingProp1,
				cost: { seasonalCandles: 16 },
				emoji: SmallPlaceableProp77,
			},
			{ name: "Blessing 1", cosmetic: Cosmetic.TheCellistsFlourishingBlessing1, emoji: blessing3 },
			{
				name: "Blessing 2",
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing2,
				cost: { seasonalCandles: 18 },
				emoji: blessing3,
			},
			{
				name: "Prop 2",
				cosmetic: Cosmetic.TheCellistsFlourishingProp2,
				emoji: SmallPlaceableProp78,
			},
			{
				name: "Cape",
				cosmetic: Cosmetic.TheCellistsFlourishingCape,
				cost: { seasonalCandles: 22 },
				emoji: capeEmoji,
			},
			{ name: "Blessing 3", cosmetic: Cosmetic.TheCellistsFlourishingBlessing3, emoji: blessing3 },
			{
				name: "Blessing 4",
				cosmetic: Cosmetic.TheCellistsFlourishingBlessing4,
				cost: { seasonalCandles: 24 },
				emoji: blessing3,
			},
			{ name: "Outfit", cosmetic: Cosmetic.TheCellistsFlourishingOutfit, emoji: outfitEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.TheCellistsFlourishingSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.DuetsHeart,
			},
		],
	},
});
