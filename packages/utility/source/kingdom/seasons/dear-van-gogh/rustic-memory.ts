import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.RusticMemory,
	seasonId: SeasonId.DearVanGogh,
	area: AreaName.StarryGallery,
	emote: SpiritEmote.Bask,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteBask1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.RusticMemoryBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.RusticMemoryProp,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.RusticMemoryBlessing2,
					cost: { seasonalCandles: 6 },
				},
				{
					cosmetic: Cosmetic.EmoteBask2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBask3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.RusticMemoryShoes,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.RusticMemoryCape,
					seasonPass: true,
				},
			],
			[
				null,
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.RusticMemoryHairAccessory,
					cost: { seasonalCandles: 26 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.RusticMemoryBlessing3,
					cost: { seasonalCandles: 8 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteBask4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.RusticMemorySeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
