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
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.JoyfulMemoryBlessing1,
					cost: { seasonalCandles: 4 },
				},
			],
			[
				{
					translation: CosmeticCommon.Prop,
					cosmetic: Cosmetic.JoyfulMemoryProp,
					cost: { seasonalCandles: 14 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.JoyfulMemoryBlessing2,
					cost: { seasonalCandles: 6 },
				},
				{
					cosmetic: Cosmetic.EmoteSlowWalk2,
					level: 2,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSlowWalk3,
					cost: { seasonalCandles: 20 },
					level: 3,
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.JoyfulMemoryBlessing3,
					cost: { seasonalCandles: 8 },
				},
				{
					translation: CosmeticCommon.HairAccessory,
					cosmetic: Cosmetic.JoyfulMemoryHairAccessory,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.JoyfulMemoryHair,
					cost: { seasonalCandles: 24 },
				},
				{
					translation: CosmeticCommon.Cape,
					cosmetic: Cosmetic.JoyfulMemoryCape,
					cost: { seasonalCandles: 28 },
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
