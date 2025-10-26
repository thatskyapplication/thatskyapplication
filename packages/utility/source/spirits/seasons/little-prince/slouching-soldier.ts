import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Slouch;

export default new SeasonalSpirit({
	id: SpiritId.SlouchingSoldier,
	seasonId: SeasonId.LittlePrince,
	emote,
	realm: RealmName.VaultOfKnowledge,
	hasMarketingVideo: true,
	offer: {
		hasInfographicSeasonal: false,
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteSlouch1 },
				{ cosmetic: Cosmetic.EmoteSlouch2, level: 2, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SlouchingSoldierBlessing1,
					cost: { seasonalCandles: 10 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SlouchingSoldierHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSlouch3,
					cost: { seasonalCandles: 14 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteSlouch4, level: 4, seasonPass: true },
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SlouchingSoldierBlessing2,
					cost: { seasonalCandles: 18 },
				},
				{ cosmetic: Cosmetic.SlouchingSoldierMusicSheet, seasonPass: true },
			],
			[
				{
					cosmetic: Cosmetic.SlouchingSoldierCape,
					cost: { seasonalCandles: 22 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.SlouchingSoldierBlessing3,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteSlouch1 },
				{
					cosmetic: Cosmetic.EmoteSlouch2,
					cost: { hearts: 4 },
					level: 2,
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.SlouchingSoldierSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.SlouchingSoldierBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.SlouchingSoldierMusicSheet,
					cost: { candles: 15 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.SlouchingSoldierHair,
					cost: { candles: 42 },
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.SlouchingSoldierWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteSlouch3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteSlouch4,
					cost: { hearts: 6 },
					level: 4,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.SlouchingSoldierBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					cosmetic: Cosmetic.SlouchingSoldierCape,
					cost: { candles: 70 },
				},
			],
		],
	},
	visits: {
		travelling: [{ start: skyDate(2023, 2, 16), end: skyDate(2023, 2, 20) }],
		returning: [8],
	},
});
