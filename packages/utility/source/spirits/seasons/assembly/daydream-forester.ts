import { Cosmetic, CosmeticCommon } from "../../../cosmetics.js";
import { skyDate } from "../../../dates.js";
import { RealmName } from "../../../kingdom.js";
import { SeasonalSpirit } from "../../../models/spirits.js";
import { SeasonId } from "../../../season.js";
import { SpiritEmote, SpiritId } from "../../../utility/spirits.js";

const emote = SpiritEmote.Bubbles;

export default new SeasonalSpirit({
	id: SpiritId.DaydreamForester,
	seasonId: SeasonId.Assembly,
	emote,
	realm: RealmName.HiddenForest,
	offer: {
		seasonal: [
			[
				{ cosmetic: Cosmetic.EmoteBubbles1 },
				{ cosmetic: Cosmetic.EmoteBubbles2, level: 2, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.DaydreamForesterMask,
					cost: { seasonalCandles: 5 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.DaydreamForesterBlessing1,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBubbles3,
					cost: { seasonalCandles: 10 },
					level: 3,
				},
				{ cosmetic: Cosmetic.EmoteBubbles4, level: 4, seasonPass: true },
			],
			[
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.DaydreamForesterMusicSheet,
					cost: { seasonalCandles: 15 },
				},
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DaydreamForesterBlessing2,
					seasonPass: true,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 3 },
					cosmetic: Cosmetic.DaydreamForesterBlessing3,
					cost: { seasonalCandles: 20 },
				},
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.DaydreamForesterHair,
					seasonPass: true,
				},
			],
			[
				{
					cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
					cost: { seasonalCandles: 3 },
					seasonPass: true,
				},
			],
		],
		current: [
			[
				{ cosmetic: Cosmetic.EmoteBubbles1 },
				{
					cosmetic: Cosmetic.EmoteBubbles2,
					cost: { hearts: 4 },
					level: 2,
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 1 },
					cosmetic: Cosmetic.DaydreamForesterBlessing1,
					cost: { candles: 5 },
				},
				{
					translation: CosmeticCommon.Mask,
					cosmetic: Cosmetic.DaydreamForesterMask,
					cost: { candles: 24 },
				},
				{
					translation: CosmeticCommon.Heart,
					cosmetic: Cosmetic.DaydreamForesterSeasonalHeart,
					cost: { candles: 3 },
					regularHeart: true,
				},
			],
			[
				{
					translation: CosmeticCommon.WingBuff,
					cosmetic: Cosmetic.DaydreamForesterWingBuff,
					cost: { ascendedCandles: 2 },
				},
			],
			[
				{
					cosmetic: Cosmetic.EmoteBubbles3,
					cost: { hearts: 3 },
					level: 3,
				},
				{
					cosmetic: Cosmetic.EmoteBubbles4,
					cost: { hearts: 6 },
					level: 4,
				},
				{
					translation: CosmeticCommon.MusicSheet,
					cosmetic: Cosmetic.DaydreamForesterMusicSheet,
					cost: { candles: 15 },
				},
			],
			[
				{
					translation: { key: CosmeticCommon.BlessingMultiple, number: 2 },
					cosmetic: Cosmetic.DaydreamForesterBlessing2,
					cost: { candles: 5 },
				},
			],
			[
				{
					translation: CosmeticCommon.Hair,
					cosmetic: Cosmetic.DaydreamForesterHair,
					cost: { candles: 44 },
				},
			],
		],
	},
	visits: {
		travelling: [
			{ start: skyDate(2022, 4, 28), end: skyDate(2022, 5, 2) },
			{ start: skyDate(2024, 3, 14), end: skyDate(2024, 3, 18) },
		],
	},
});
