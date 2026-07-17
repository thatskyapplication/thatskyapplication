import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";
import { AreaName } from "../../geography.js";

export default new SeasonalSpirit({
	id: SpiritId.JoyfulMemory,
	seasonId: SeasonId.DearVanGogh,
	area: AreaName.StarryGallery,
	emote: SpiritEmote.SlowWalk,
	offer: {
		hasInfographic: false,
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{
					cosmetic: Cosmetic.EmoteSlowWalk1,
				},
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.JoyfulMemoryProp,
					cost: { seasonalCandles: 12 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.JoyfulMemoryBlessing1,
					cost: { seasonalCandles: 6 },
				},
				null,
				{
					cosmetic: Cosmetic.EmoteSlowWalk2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.JoyfulMemoryHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSlowWalk3,
					cost: { seasonalCandles: 22 },
					level: 3,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.JoyfulMemoryHair,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.JoyfulMemoryBlessing2,
					cost: { seasonalCandles: 8 },
				},
			],
			[
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.JoyfulMemoryCape,
					cost: { seasonalCandles: 26 },
				},
				{
					translation: CosmeticCommon.BlackDye,
					cosmetic: Cosmetic.JoyfulMemoryBlackDye,
					cost: { seasonalCandles: 12 },
				},
				{
					cosmetic: Cosmetic.EmoteSlowWalk4,
					level: 4,
					seasonPass: true,
				},
			],
			[
				null,
				null,
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.JoyfulMemorySeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
	},
});
