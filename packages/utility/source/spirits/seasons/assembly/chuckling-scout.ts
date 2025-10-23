import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Chuckle;

export default new SeasonalSpirit({
	id: SpiritId.ChucklingScout,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteChuckle1 },
				{ cosmetic: Cosmetic.EmoteChuckle2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ChucklingScoutMask,
					cost: { seasonalCandles: 12 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ChucklingScoutBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteChuckle3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteChuckle4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ChucklingScoutBlessing2,
					cost: { seasonalCandles: 17 },
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ChucklingScoutOutfit,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ChucklingScoutProp,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.ChucklingScoutBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteChuckle1 },
				{
					cosmetic: Cosmetic.EmoteChuckle2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ChucklingScoutBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ChucklingScoutMask,
					cost: { candles: 36 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ChucklingScoutSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ChucklingScoutWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteChuckle3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteChuckle4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.Outfit,
					cosmetic: Cosmetic.ChucklingScoutOutfit,
					cost: { candles: 46 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ChucklingScoutBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Shoes,
					cosmetic: Cosmetic.ChucklingScoutShoes,
					cost: { candles: 32 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ChucklingScoutProp,
					cost: { candles: 45 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2025, 3, 13), end: skyDate(2025, 3, 17) }],
		returning: [1],
	},
});
