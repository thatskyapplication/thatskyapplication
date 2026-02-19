import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Eww;

export default new SeasonalSpirit({
	id: SpiritId.ScaredyCadet,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteEww1 },
				{ cosmetic: Cosmetic.EmoteEww2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ScaredyCadetMask,
					cost: { seasonalCandles: 5 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ScaredyCadetBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteEww3,
					cost: { seasonalCandles: 10 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteEww4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ScaredyCadetMusicSheet,
					cost: { seasonalCandles: 15 },
				},
				{ translation: CosmeticCommon.Hair, cosmetic: Cosmetic.ScaredyCadetHair, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.ScaredyCadetHammock,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ScaredyCadetBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: CosmeticCommon.SeasonalHeart,
					cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteEww1 },
				{ cosmetic: Cosmetic.EmoteEww2, cost: { hearts: 4 }, level: 2 },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.ScaredyCadetBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.ScaredyCadetMask,
					cost: { candles: 24 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.ScaredyCadetSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.ScaredyCadetWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{ cosmetic: Cosmetic.EmoteEww3, cost: { hearts: 3 }, level: 3 },
				{ cosmetic: Cosmetic.EmoteEww4, cost: { hearts: 6 }, level: 4 },
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.ScaredyCadetMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.ScaredyCadetBlessing2,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.ScaredyCadetHair,
					cost: { candles: 45 },
				},
			],
			[
				{
					cosmetic: Cosmetic.ScaredyCadetHammock,
					cost: { candles: 55 },
				},
			],
		],
	},
	keywords: ["hammock"],
	visits: {
		travelling: [{ start: skyDate(2025, 8, 28), end: skyDate(2025, 9, 1) }],
		returning: [1, 12],
	},
});
