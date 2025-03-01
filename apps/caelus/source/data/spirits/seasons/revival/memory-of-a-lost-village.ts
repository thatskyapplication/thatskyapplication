import { Cosmetic, SeasonId, SeasonalSpirit, SpiritId } from "@thatskyapplication/utility";
import {
	CAPE_EMOJIS,
	HAIR_EMOJIS,
	MISCELLANEOUS_EMOJIS,
	OUTFIT_EMOJIS,
	SEASON_EMOJIS,
} from "../../../../utility/emojis.js";

const blessing3 = MISCELLANEOUS_EMOJIS.Blessing3;
const outfitEmoji = OUTFIT_EMOJIS.Outfit51;
const hairEmoji = HAIR_EMOJIS.Hair131;
const capeEmoji = CAPE_EMOJIS.Cape114;

export default new SeasonalSpirit({
	id: SpiritId.MemoryOfALostVillage,
	seasonId: SeasonId.Revival,
	offer: {
		hasInfographic: false,
		seasonal: [
			{
				name: "Blessing 1",
				cosmetic: Cosmetic.MemoryOfALostVillageBlessing1,
				cost: { seasonalCandles: 20 },
				emoji: blessing3,
			},
			{ name: "Cape", cosmetic: Cosmetic.MemoryOfALostVillageCape, emoji: capeEmoji },
			{
				name: "Outfit",
				cosmetic: Cosmetic.MemoryOfALostVillageOutfit,
				cost: { seasonalCandles: 32 },
				emoji: outfitEmoji,
			},
			{ name: "Blessing 2", cosmetic: Cosmetic.MemoryOfALostVillageBlessing2, emoji: blessing3 },
			{
				name: "Blessing 3",
				cosmetic: Cosmetic.MemoryOfALostVillageBlessing3,
				cost: { seasonalCandles: 38 },
				emoji: blessing3,
			},
			{ name: "Hair", cosmetic: Cosmetic.MemoryOfALostVillageHair, emoji: hairEmoji },
			{
				name: "Seasonal heart",
				cosmetic: Cosmetic.MemoryOfALostVillageSeasonalHeart,
				cost: { seasonalCandles: 3 },
				emoji: SEASON_EMOJIS.RevivalHeart,
			},
		],
	},
});
