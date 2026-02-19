import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Marching;

export default new SeasonalSpirit({
	id: SpiritId.MarchingAdventurer,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteMarching1 },
				{ cosmetic: Cosmetic.EmoteMarching2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MarchingAdventurerHair,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MarchingAdventurerBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteMarching3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteMarching4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MarchingAdventurerBlessing2,
					cost: { seasonalCandles: 16 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.MarchingAdventurerMask,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.MarchingAdventurerBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteMarching1 },
				{
					cosmetic: Cosmetic.EmoteMarching2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.MarchingAdventurerBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.MarchingAdventurerMask,
					cost: { candles: 30 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.MarchingAdventurerSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.MarchingAdventurerWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteMarching3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteMarching4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.MarchingAdventurerHair,
					cost: { candles: 45 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.MarchingAdventurerBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.MarchingAdventurerTikiTorch,
					cost: { candles: 55 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 7, 3), end: skyDate(2025, 7, 7) }],
		returning: [1, 12],
	},
});
