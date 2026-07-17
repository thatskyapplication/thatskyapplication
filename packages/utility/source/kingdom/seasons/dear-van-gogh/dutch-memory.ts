import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.DutchMemory,
	seasonId: SeasonId.DearVanGogh,
	area: AreaName.StarryGallery,
	emote: SpiritEmote.Frustration,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteFrustration1,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.DutchMemoryBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.DutchMemoryProp,
					cost: { seasonalCandles: 18 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DutchMemoryBlessing2,
					cost: { seasonalCandles: 6 },
				},
				{
					cosmetic: Cosmetic.EmoteFrustration2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteFrustration3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{
					translation: CosmeticCommon.WhiteDye,
					cosmetic: Cosmetic.DutchMemoryWhiteDye,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.DutchMemoryHair,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.DutchMemoryCape,
					cost: { seasonalCandles: 26 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteFrustration4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.DutchMemoryOutfit,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.DutchMemorySeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
